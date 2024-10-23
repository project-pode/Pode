import { View, Pressable } from "react-native";
import Text from "./Text";
import { useNavigate, useParams } from "react-router-native";
import { useEffect, useState } from "react";
import exerciseService from "../services/exercises";
import theme from "../theme";
const SingleExerciseView = () => {
    const [exercise, setExercise] = useState(null);
    const { userId, lessonId, exerciseId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExercise = async () => {
            const exercise = await exerciseService.getOne(userId, lessonId, exerciseId);
            setExercise(exercise);
        };
        void fetchExercise();
    }, []);
    if (!exercise) {
        return (
            <View>
                <Text>
                    No exercise found
                </Text>
            </View>
        ); // Or any other message you want to display
    }

    const handleComplete = async () => {
        try {
          await exerciseService.completeExercise(userId, lessonId, exerciseId);  // Call the Axios service to mark as completed
          navigate(`/users/${userId}/lessons/${lessonId}`);
        } catch (error) {
          console.error('Error completing lesson:', error);
        }
      };


    return (
        <View>
            <Text>
                title: {exercise.title}
            </Text>
            <Text>description: {exercise.description}</Text>
            <Text>id: {exercise.id}</Text>
            <Text>difficulty: {exercise.difficulty}</Text>
            <Text>correct answer: {exercise.correctAnswer}</Text>

            <Text>from lesson: {exercise.lesson}</Text>
            <Pressable onPress={handleComplete} style={theme.button}>
                <Text>complete exercise</Text>
            </Pressable>
        </View>
    );
};

export default SingleExerciseView;