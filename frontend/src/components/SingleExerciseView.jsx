import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, Text, Pressable, ScrollView, Animated } from 'react-native';
import { useNavigate, useParams } from 'react-router-native';
import { Audio } from 'expo-av';
import exerciseService from '../services/exercises';
import theme from '../themes/SingleExerciseViewTheme';
import ExerciseToRender from './ExerciseToRender';
import lessonService from "../services/lessons";
import FeedbackPopUp from "./FeedbackPopUp";
import PopUp from "./PopUp";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const SingleExerciseView = () => {
    const slideAnim = useRef(new Animated.Value(0)).current; //slide animation
    const [exercise, setExercise] = useState(null);
    const [lesson, setLesson] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [isExerciseComplete, setIsExerciseComplete] = useState(false);
    const { userId, lessonId, exerciseId } = useParams();
    const navigate = useNavigate();
    const boxExerciseRef = useRef();
    const [index, setIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [isCorrectPopup, setIsCorrectPopup] = useState(false);
    const correctSound = useRef(new Audio.Sound());
    const incorrectSound = useRef(new Audio.Sound());
    const [showCloseExercisePopup, setShowCloseExercisePopup] = useState(false);
    const slideAnimFirst = useRef(new Animated.Value(300)).current; //slide animation

    const handleBackPress = () => {
        setShowCloseExercisePopup(true);
    };

    const handleConfirm = () => {
        setShowCloseExercisePopup(false);
        navigate(`/users/${userId}/lessons`);
    };

    const handleCancel = () => {
        setShowCloseExercisePopup(false);
    };

    const animateSlide = (callback) => {
        Animated.timing(slideAnim, {
            toValue: -300, // Slide left (adjust the value for different speeds)
            duration: 300, // Adjust duration for smoothness
            useNativeDriver: true,
        }).start(() => {
            slideAnim.setValue(300); // Reset position for new exercise
            callback();
            Animated.timing(slideAnim, {
                toValue: 0, // Slide back to original position
                duration: 300,
                useNativeDriver: true,
            }).start();
        });
    };

    useEffect(() => {
        const fetchExercise = async () => {
            const exercise = await exerciseService.getOne(userId, lessonId, exerciseId);
            setExercise(exercise);
        };
        const fetchLesson = async () => {
            const lesson = await lessonService.getLesson(userId, lessonId);
            setLesson(lesson);
        };

        fetchLesson();
        fetchExercise();

        const loadSounds = async () => {
            try {
                await correctSound.current.loadAsync(require('../../assets/sounds/correct.mp3'));
                await incorrectSound.current.loadAsync(require('../../assets/sounds/incorrect.mp3'));
            } catch (error) {
                console.error('Error loading sound files:', error);
            }
        };

        loadSounds();

        // Slide in animation when first exercise loads
        Animated.timing(slideAnimFirst, {
            toValue: 0, // Slide to the original position
            duration: 500, // Slide duration
            useNativeDriver: true,
        }).start();

        return () => {
            correctSound.current.unloadAsync();
            incorrectSound.current.unloadAsync();
        };
    }, [userId, lessonId, exerciseId]);

    if (!exercise) {
        return (
            <SafeAreaView style={theme.blueContainer}>
                <Text>No exercise found</Text>
            </SafeAreaView>
        );
    }

    const closePopUp = () => {
        setShowPopup(false);
    };

    const handleCompleteLesson = async (completedExercises) => {
        try {
            await lessonService.completeLesson(userId, lessonId);
            navigate(`/users/${userId}/lessons/${lessonId}/overview`, { state: { completedExercises } });
        } catch (error) {
            console.error('Error completing lesson:', error);
        }
    };

    const handleComplete = async () => {
        if (selectedAnswer.length === 0) {
            setFeedback('Please select an answer before completing the exercise.');
            return;
        }

        const correctAnswer = exercise.correctAnswer;
        const isCorrectAnswerArray = Array.isArray(correctAnswer);
        const isAnswerCorrect = isCorrectAnswerArray
            ? selectedAnswer.length === correctAnswer.length &&
              selectedAnswer.every((val, index) => val === correctAnswer[index])
            : selectedAnswer === correctAnswer;

        if (isAnswerCorrect) {
            try {
                await exerciseService.completeExercise(userId, lessonId, exerciseId);
                setFeedback('Correct answer!\nExercise completed.');
                setIsCorrectPopup(true);
                setShowPopup(true);
                setIsExerciseComplete(true);
                await correctSound.current.replayAsync();
            } catch (error) {
                console.error('Error completing exercise:', error);
                setFeedback('An error occurred while completing the exercise.');
            }
        } else {
            setFeedback('Incorrect answer.\nPlease try again.');
            setIsCorrectPopup(false);
            setShowPopup(true);
            boxExerciseRef.current?.resetAnimations();
            setSelectedAnswer([]);

            await incorrectSound.current.replayAsync(); // Play the incorrect sound
        }
    };

    const handleNextExercise = () => {
        const nextIndex = index + 1;
        if (lesson && nextIndex < lesson.exercises.length) {
            const nextExerciseID = lesson.exercises[nextIndex].id;
            animateSlide(() => { //slide to the next
                navigate(`/users/${userId}/lessons/${lessonId}/exercises/${nextExerciseID}`);
                setIndex(nextIndex);
                setSelectedAnswer([]);
                setIsExerciseComplete(false);
                setFeedback(null);
            });
        } else {
            handleCompleteLesson(index + 1);
        }
    };

    return (
        <SafeAreaView style={theme.blueContainer}>
              <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Pressable style={{alignSelf:"flex-end", color: "rgba(75,113,123,1)"}} onPress={handleBackPress}>
                    <MaterialIcons name="close" size={40} color="rgb(69, 100, 108)"></MaterialIcons>
                </Pressable>
                <Animated.View style={[theme.whiteContainerExercises, { transform: [{ translateX: Animated.add(slideAnim, slideAnimFirst) }] }]}>                
                    <Text style={theme.exerciseDescription}> {exercise.title}</Text>
                    <Text style={theme.exerciseDescription}>{exercise.description}</Text>
                    <ExerciseToRender
                        exercise={exercise}
                        selectedAnswer={selectedAnswer}
                        setSelectedAnswer={setSelectedAnswer}
                        boxExerciseRef={boxExerciseRef}
                    />
                </Animated.View>
                <FeedbackPopUp
                    isAnswerCorrect={isCorrectPopup}
                    visible={showPopup}
                    message={feedback}
                    onClose={closePopUp}
                />
                <Pressable
                    onPress={isExerciseComplete ? handleNextExercise : handleComplete}
                    style={selectedAnswer.length >>> 0 ? theme.greenButton : theme.greenButtonDeselected}
                >
                    <Text style={selectedAnswer.length >>> 0 ? theme.greenButtonText : theme.greenButtonTextDeselected}>
                        {isExerciseComplete ? 'Next' : 'Check'}
                    </Text>
                </Pressable>
                <PopUp
                    visible={showCloseExercisePopup}
                    message="Progress will be lost. Are you sure you want to end this lesson?"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            </ScrollView>
          </SafeAreaView>
    );
};

export default SingleExerciseView;
