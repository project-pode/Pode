import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigate, useParams } from 'react-router-native';
import { Audio } from 'expo-av';
import exerciseService from '../services/exercises';
import theme from '../themes/SingleExerciseViewTheme';
import ExerciseToRender from './ExerciseToRender';
import lessonService from "../services/lessons";
import FeedbackPopUp from "./FeedbackPopUp";

const SingleExerciseView = () => {
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
    const [isEmpty, setIsEmpty] = useState(true);
    const correctSound = useRef(new Audio.Sound()); // Create a ref for the correct sound
    const incorrectSound = useRef(new Audio.Sound()); // Create a ref for the incorrect sound


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
                await correctSound.current.loadAsync(require('../../assets/sounds/correct.mp3'));
                await incorrectSound.current.loadAsync(require('../../assets/sounds/incorrect.mp3'));
            } catch (error) {
                console.error('Error loading sound files:', error);
            }
        };

        loadSounds();

        return () => {
            // Unload the sound files when the component unmounts
            correctSound.current.unloadAsync();
            incorrectSound.current.unloadAsync();
        };
    }, [userId, lessonId, exerciseId]);

    if (!exercise) {
        return (
            <View style={styles.container}>
                <Text>No exercise found</Text>
            </View>
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
                await correctSound.current.replayAsync(); // Play the correct sound
            } catch (error) {
                console.error('Error completing exercise:', error);
                setFeedback('An error occurred while completing the exercise.');
            }
        } else {
            setFeedback('Incorrect answer.\nPlease try again.');
            setIsCorrectPopup(false);
            setShowPopup(true);
            await incorrectSound.current.replayAsync(); // Play the incorrect sound
        }
        boxExerciseRef.current?.resetAnimations();
        setSelectedAnswer([]);
    };

    const handleNextExercise = () => {
        const nextIndex = index + 1;
        if (lesson && nextIndex < lesson.exercises.length) {
            const nextExerciseID = lesson.exercises[nextIndex].id;
            navigate(`/users/${userId}/lessons/${lessonId}/exercises/${nextExerciseID}`);
            setIndex(nextIndex);
            setSelectedAnswer([]);
            setIsExerciseComplete(false);
            setFeedback(null);
        } else {
            handleCompleteLesson(index + 1);
        }
    };

    return (
        <View style={theme.blueContainer}>
            <View style={theme.whiteContainerExercises}>
                <Text style={theme.exerciseDescription}> {exercise.title}</Text>
                <Text style={theme.exerciseDescription}>{exercise.description}</Text>
                <ExerciseToRender
                    exercise={exercise}
                    selectedAnswer={selectedAnswer}
                    setSelectedAnswer={setSelectedAnswer}
                    boxExerciseRef={boxExerciseRef}
                />
            </View>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
    },
    feedback: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 15,
        alignSelf: "center",
        color: 'red',
    },
});

export default SingleExerciseView;