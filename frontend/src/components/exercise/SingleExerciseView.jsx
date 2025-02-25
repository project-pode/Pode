import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
import { useNavigate, useParams } from 'react-router-native';
import { Audio } from 'expo-av';
import exerciseService from '../../services/exercises';
import theme from '../../themes/SingleExerciseViewTheme';
import ExerciseToRender from './ExerciseToRender';
import lessonService from "../../services/lessons";
import PopUp from "../PopUp";
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // Icon names can be found here: https://oblador.github.io/react-native-vector-icons/#MaterialIcons
import LoadingView from "../LoadingView";
/**
 * SingleExerciseView component
 * 
 * This component renders a single exercise depending on the exercise type from ExerciseToRender.
 * It handles fetching exercise data, managing exercise and lesson completion, and providing feedback.
 * This component is used for every type of exercise
 * 
 * @returns {JSX.Element} The rendered component
 */
const SingleExerciseView = () => {
    const slideAnim = useRef(new Animated.Value(0)).current; // Slide animation
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
    const correctSound = useRef(new Audio.Sound()); // Create a ref for the correct sound
    const incorrectSound = useRef(new Audio.Sound()); // Create a ref for the incorrect sound
    const [showCloseExercisePopup, setShowCloseExercisePopup] = useState(false);
    const slideAnimFirst = useRef(new Animated.Value(300)).current; // Slide animation

    /**
     * Handles the back button press event.
     * Shows a popup to confirm if the user wants to leave the exercise.
     */
    const handleBackPress = () => {
        setShowCloseExercisePopup(true);
    };

    /**
     * Handles the confirmation to leave the exercise.
     * Navigates back to the progress map
     */
    const handleConfirm = () => {
        setShowCloseExercisePopup(false);
        navigate(`/users/${userId}/lessons`);
    };

    /**
     * Handles the cancellation of leaving the exercise.
     * Hides the confirmation popup.
     */
    const handleCancel = () => {
        setShowCloseExercisePopup(false);
    };

    /**
     * Animates the slide transition for navigating between exercises.
     * 
     * @param {Function} callback - The callback function to execute after the slide animation completes
     */
    const animateSlide = (callback) => {
        // Execute callback when sliding out completes (40% through animation)
        setTimeout(() => {
            callback();
        }, 200); // 40% of 500ms
    
        Animated.timing(slideAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            slideAnim.setValue(0);
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

        // Load the sound files
        const loadSounds = async () => {
            try {
                await correctSound.current.loadAsync(require('../../../assets/sounds/correct.mp3'));
                await incorrectSound.current.loadAsync(require('../../../assets/sounds/incorrect.mp3'));
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
            // Unload the sound files when the component unmounts
            correctSound.current.unloadAsync();
            incorrectSound.current.unloadAsync();
        };
    }, [userId, lessonId, exerciseId]);

    if (!exercise) {
        return (
            <LoadingView/>
        );
    }

    /**
     * Closes the feedback popup.
     */
    const closePopUp = () => {
        setShowPopup(false);
    };

    /**
     * Handles the completion of the lesson.
     * 
     * @param {number} completedExercises - The number of completed exercises
     */
    const handleCompleteLesson = async (completedExercises) => {
        try {
            await lessonService.completeLesson(userId, lessonId);
            navigate(`/users/${userId}/lessons/${lessonId}/overview`, { state: { completedExercises } });
        } catch (error) {
            console.error('Error completing lesson:', error);
        }
    };

    /**
     * Handles the completion of the current exercise.
     */
    const handleComplete = async () => {
        if (selectedAnswer.length === 0) {
            setFeedback('Please select an answer before completing the exercise.');
            return;
        }

        const correctAnswer = exercise.correctAnswer;
        const isCorrectAnswerArray = Array.isArray(correctAnswer);
        // Checks whether answer is correct depending on if answer is an array (boxes or blanks) or just a string (dropdown)
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
                await correctSound.current.replayAsync(); // Play the correct sound
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

    /**
     * Handles the navigation to the next exercise.
     */
    const handleNextExercise = () => {
        const nextIndex = index + 1;
        if (lesson && nextIndex < lesson.exercises.length) {
            const nextExerciseID = lesson.exercises[nextIndex].id;
            animateSlide(() => { // Slide to the next
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
        <View style={theme.blueContainer}>
            <Pressable style={{ alignSelf: "flex-end", color: "rgba(75,113,123,1)" }} onPress={handleBackPress}>
                <MaterialIcons name="close" size={40} color="rgb(69, 100, 108)" />
            </Pressable>
            <Animated.View style={[theme.whiteContainerExercises, { transform: [{ translateX: Animated.add(slideAnim.interpolate({
                            inputRange: [0, 0.4, 0.4001, 1],
                            outputRange: [0, -300, 300, 0]}), slideAnimFirst) }] }]}>
                <Text style={theme.exerciseDescription}>{exercise.title}</Text>
                <Text style={theme.exerciseDescription}>{exercise.description}</Text>
                <ExerciseToRender
                    exercise={exercise}
                    selectedAnswer={selectedAnswer}
                    setSelectedAnswer={setSelectedAnswer}
                    boxExerciseRef={boxExerciseRef}
                />
            </Animated.View>
            <PopUp
                type="feedback"
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
                type='confirmation'
                visible={showCloseExercisePopup}
                message="Progress will be lost. Are you sure you want to end this lesson?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </View>
    );
};

export default SingleExerciseView;