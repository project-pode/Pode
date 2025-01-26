import { View, Text } from "react-native";
import DropdownForm from "./DropdownForm";
import BoxExercise from "./BoxExercise";
import FillInTheBlanksExercise from "./FillInTheBlanksExercise";
import theme from '../themes/ExerciseToRenderTheme';
const ExerciseToRender = ({ exercise, selectedAnswer, setSelectedAnswer, boxExerciseRef }) => {
    const renderExerciseType = () => {
        // Check if exercise is defined and has a type
        if (!exercise || !exercise.type) {
            return <Text>No exercise provided!</Text>; // Handle case where exercise is missing
        }

        switch (exercise.type) {
            case "simple":
                return (
                    <View>
                        <View style={theme.pinkContainerInDropdownView}>
                            <Text style = {theme.exerciseFont}>
                                {exercise.question}
                            </Text>
                        </View>
                            <View>
                            <DropdownForm
                                options={exercise.options || []} // Default to an empty array if options are undefined
                                selectedAnswer={selectedAnswer}
                                setSelectedAnswer={setSelectedAnswer}
                            />
                        </View>
                    </View>
                );
            case "box":
                return (
                    <View>
                        <BoxExercise options={exercise.options || []}
                            selectedAnswer={selectedAnswer}
                            setSelectedAnswer={setSelectedAnswer}
                            ref={boxExerciseRef}
                        />
                    </View>
                );
            case "blanks":
                return (
                    <View>
                        
                        <FillInTheBlanksExercise options={exercise.options || []}
                            selectedAnswer={selectedAnswer}
                            setSelectedAnswer={setSelectedAnswer}
                            ref={boxExerciseRef}
                            question={exercise.question}/>
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
