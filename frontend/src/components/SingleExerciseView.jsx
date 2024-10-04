import { View, FlatList } from "react-native";
import Text from "./Text";
import { useParams } from "react-router-native";
import { useEffect, useState } from "react";
import exerciseService from "../services/exercises";
import ExerciseItem from "./ExerciseItem";
const SingleExerciseView = () => {
    const [exercise, setExercise] = useState(null);
    const { id, id2 } = useParams();

    useEffect(() => {
        const fetchExercise = async () => {
            const exercise = await exerciseService.getOne(id, id2);
            console.log(exercise);
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

        </View>
    );
};

export default SingleExerciseView;