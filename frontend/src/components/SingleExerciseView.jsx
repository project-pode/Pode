import { View, Pressable, Text } from "react-native";
import { useNavigate, useParams } from "react-router-native";
import { useEffect, useState } from "react";
import exerciseService from "../services/exercises";
import theme from "../theme";
import ExerciseToRender from "./ExerciseToRender";

const SingleExerciseView = () => {
    const [exercise, setExercise] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState([]);
    const [feedback, setFeedback] = useState('');
    const { userId, lessonId, exerciseId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExercise = async () => {
            const exercise = await exerciseService.getOne(userId, lessonId, exerciseId);
            setExercise(exercise);
        };
        void fetchExercise();
    }, [userId, lessonId, exerciseId]);

    if (!exercise) {
        return (
            <View>
                <Text>No exercise found</Text>
            </View>
        );
    }

    const handleComplete = async () => {
        if (selectedAnswer.length === 0) {
            setFeedback("Please select an answer before completing the exercise.");
            return; // Prevent submission if no answer is selected
        }

        // Check if correctAnswer is an array or a string
        const correctAnswer = exercise.correctAnswer;
        const isCorrectAnswerArray = Array.isArray(correctAnswer);

        // Validate against the correct answer
        if (isCorrectAnswerArray) {
            // Handle array case
            if (selectedAnswer.length === correctAnswer.length &&
                selectedAnswer.join(' ') === correctAnswer.join(' ')) {
                try {
                    await exerciseService.completeExercise(userId, lessonId, exerciseId);
                    setFeedback("Correct answer! Exercise completed.");
                    navigate(`/users/${userId}/lessons/${lessonId}`);
                } catch (error) {
                    console.error('Error completing exercise:', error);
                }
            } else {
                setFeedback("Incorrect answer. Please try again.");
            }
        } else {
            // Handle string case
            if (selectedAnswer === correctAnswer) {
                try {
                    await exerciseService.completeExercise(userId, lessonId, exerciseId);
                    setFeedback("Correct answer! Exercise completed.");
                    navigate(`/users/${userId}/lessons/${lessonId}`);
                } catch (error) {
                    console.error('Error completing exercise:', error);
                }
            } else {
                setFeedback("Incorrect answer. Please try again.");
            }
        }
    };

    return (
        <View>
            <Text>Title: {exercise.title}</Text>
            <Text>Description: {exercise.description}</Text>
            <Text>ID: {exercise.id}</Text>
            <Text>Difficulty: {exercise.difficulty}</Text>
            <Text>Correct Answer: {exercise.correctAnswer}</Text>
            <Text>From Lesson: {exercise.lesson}</Text>
            <ExerciseToRender
                exercise={exercise}
                selectedAnswer={selectedAnswer}
                setSelectedAnswer={setSelectedAnswer} // Pass down the state setter
            />
            <Pressable onPress={handleComplete} style={theme.button}>
                <Text>Complete Exercise</Text>
            </Pressable>
            {feedback ? <Text>{feedback}</Text> : null}
        </View>
    );
};

export default SingleExerciseView;
