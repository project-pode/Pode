import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigate, useParams } from 'react-router-native';
import exerciseService from '../services/exercises';
import theme from '../theme';
import ExerciseToRender from './ExerciseToRender';
import lessonService from "../services/lessons";

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
            await lessonService.completeLesson(userId, lessonId);
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
        const isAnswerCorrect = isCorrectAnswerArray
            ? selectedAnswer.length === correctAnswer.length &&
              selectedAnswer.every((val, index) => val === correctAnswer[index])
            : selectedAnswer === correctAnswer;
    
        if (isAnswerCorrect) {
            try {
                await exerciseService.completeExercise(userId, lessonId, exerciseId);
                setFeedback('Correct answer! Exercise completed.');
                setIsExerciseComplete(true);
            } catch (error) {
                console.error('Error completing exercise:', error);
                setFeedback('An error occurred while completing the exercise.');
            }
        } else {
            setFeedback('Incorrect answer. Please try again.');
            boxExerciseRef.current?.resetAnimations();
            setSelectedAnswer([]);
        }
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
            handleCompleteLesson();
        }
    };

    return (
        <View style={theme.blueContainer}>
            <View style={theme.whiteContainerExercises}>
            {/*<Text style={styles.title}>Title: {exercise.title}</Text> */}
            <Text style={theme.exerciseDescription}>{exercise.description}</Text>
                <ExerciseToRender
                    exercise={exercise}
                    selectedAnswer={selectedAnswer}
                    setSelectedAnswer={setSelectedAnswer}
                    boxExerciseRef={boxExerciseRef}
                />
            </View>
            
                <Pressable
                    onPress={isExerciseComplete ? handleNextExercise : handleComplete}
                    style={theme.greenButton}
                >
                    <Text style={theme.greenButtonText}>
                        {isExerciseComplete ? 'Next Exercise' : 'Check'}
                    </Text>
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
        marginBottom: 15,
        alignSelf: "center",
        color: 'red',
    },
});

export default SingleExerciseView;