import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigate, useParams } from 'react-router-native';
import exerciseService from '../services/exercises';
import theme from '../theme';
import ExerciseToRender from './ExerciseToRender';

const SingleExerciseView = () => {
    const [exercise, setExercise] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState([]);
    const [feedback, setFeedback] = useState('');
    const { userId, lessonId, exerciseId } = useParams();
    const navigate = useNavigate();
    const boxExerciseRef = useRef();

    useEffect(() => {
        const fetchExercise = async () => {
            const exercise = await exerciseService.getOne(userId, lessonId, exerciseId);
            setExercise(exercise);
        };
        fetchExercise();
    }, [userId, lessonId, exerciseId]);

    if (!exercise) {
        return (
            <View style={styles.container}>
                <Text>No exercise found</Text>
            </View>
        );
    }

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
                    navigate(`/users/${userId}/lessons/${lessonId}`);
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
                    navigate(`/users/${userId}/lessons/${lessonId}`);
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
