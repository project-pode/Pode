import { View, Text } from "react-native";
import DropdownForm from "./DropdownForm";

const ExerciseToRender = ({ exercise, selectedAnswer, setSelectedAnswer }) => {
    const renderExerciseType = () => {
        // Check if exercise is defined and has a type
        if (!exercise || !exercise.type) {
            return <Text>No exercise provided!</Text>; // Handle case where exercise is missing
        }

        switch (exercise.type) {
            case "simple":
                return (
                    <View>
                        <Text>{exercise.question}</Text>
                        <DropdownForm
                            options={exercise.options || []} // Default to an empty array if options are undefined
                            selectedAnswer={selectedAnswer}
                            setSelectedAnswer={setSelectedAnswer}
                        />
                    </View>
                );
            case "box":
                return (
                <View>
                <Text>Box exercise</Text>
                </View>
                );
            default:
                return (
                <View>
                <Text>No valid exercise type!</Text>
                </View>
                );
        }
    };

    return (
        <View>
            {renderExerciseType()}
        </View>
    );
};

export default ExerciseToRender;
