import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigate, useParams } from 'react-router-native';
import exerciseService from '../services/exercises';
import theme from '../theme';
import ExerciseToRender from './ExerciseToRender';
import LessonView from './LessonView';
import lessonService from "../services/lessons";

const SingleExerciseView = () => {
    const [exercise, setExercise] = useState(null);
    const [lesson, setLesson] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState([]);
    const [feedback, setFeedback] = useState('');
    const { userId, lessonId, exerciseId } = useParams();
    const navigate = useNavigate();
    const boxExerciseRef = useRef();
    const [index, setIndex] = useState(0);

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
    }, [userId, lessonId, exerciseId]);

    if (!exercise) {
        return (
            <View style={styles.container}>
                <Text>No exercise found</Text>
            </View>
        );
    }

    const handleCompleteLesson = async () => {
        try {
            await lessonService.completeLesson(userId, lessonId);  // Call the Axios service to mark as completed
            navigate(`/users/${userId}/lessons/${lessonId}/overview`);
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
    
        if (isCorrectAnswerArray) {
            if (
                selectedAnswer.length === correctAnswer.length &&
                selectedAnswer.join(' ') === correctAnswer.join(' ')
            ) {
                try {
                    await exerciseService.completeExercise(userId, lessonId, exerciseId);
                    setFeedback('Correct answer! Exercise completed.');
    
                    // Calculate the next index manually
                    const nextIndex = index + 1;
                    if (nextIndex < lesson.exercises.length) {
                        const nextExerciseID = lesson.exercises[nextIndex].id;
    
                        console.log("Next: ", nextExerciseID);
                        console.log("Current: ", exerciseId);
                        console.log("Index: ", nextIndex);
    
                        // Update the index and navigate
                        setIndex(nextIndex);
                        navigate(`/users/${userId}/lessons/${lessonId}/exercises/${nextExerciseID}`);
                    } else {
                        console.log("No more exercises in the lesson.");
                        handleCompleteLesson();
                    }
                } catch (error) {
                    console.error('Error completing exercise:', error);
                }
            } else {
                setFeedback('Incorrect answer. Please try again.');
                boxExerciseRef.current.resetAnimations();
                setSelectedAnswer([]);
            }
        } else {
            if (selectedAnswer === correctAnswer) {
                try {
                    await exerciseService.completeExercise(userId, lessonId, exerciseId);
                    setFeedback('Correct answer! Exercise completed.');
    
                    // Calculate the next index manually
                    const nextIndex = index + 1;
                    if (nextIndex < lesson.exercises.length) {
                        const nextExerciseID = lesson.exercises[nextIndex].id;
    
                        console.log("Next: ", nextExerciseID);
                        console.log("Current: ", exerciseId);
                        console.log("Index: ", nextIndex);
    
                        // Update the index and navigate
                        setIndex(nextIndex);
                        navigate(`/users/${userId}/lessons/${lessonId}/exercises/${nextExerciseID}`);
                    } else {
                        console.log("No more exercises in the lesson.");
                        handleCompleteLesson();
                    }
                } catch (error) {
                    console.error('Error completing exercise:', error);
                }
            } else {
                setFeedback('Incorrect answer. Please try again.');
            }
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Title: {exercise.title}</Text>
            <Text style={styles.description}>Description: {exercise.description}</Text>
            <ExerciseToRender
                exercise={exercise}
                selectedAnswer={selectedAnswer}
                setSelectedAnswer={setSelectedAnswer}
                boxExerciseRef={boxExerciseRef}
            />
            <Pressable onPress={handleComplete} style={theme.button}>
                <Text style={theme.buttonText}>Complete Exercise</Text>
            </Pressable>
            {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
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
        color: 'red',
    },
});

export default SingleExerciseView;
