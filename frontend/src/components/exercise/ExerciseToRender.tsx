import { View, Text } from "react-native";
import DropdownForm from "./DropdownForm";
import BoxExercise from "./BoxExercise";
import FillInTheBlanksExercise from "./FillInTheBlanksExercise";
import theme from "../../themes/exerciseToRenderTheme";
import { Exercise } from "../../types";
import React from "react";
interface ExerciseToRenderProps {
    exercise: Exercise;
    selectedAnswer: string | string[] | null;
    // eslint-disable-next-line no-unused-vars
    setSelectedAnswer: (answer: string | string[]) => void;
    boxExerciseRef: React.RefObject<{ resetAnimations: () => void }>
}
/**
 * ExerciseToRender component
 * 
 * This component renders different types of exercises based on the provided exercise type.
 * It supports "simple", "box", and "blanks" exercise types.
 * 
 * @param {Object} props.exercise - The exercise data containing type, question, and options
 * @param {string} props.selectedAnswer - The currently selected answer
 * @param {Function} props.setSelectedAnswer - Function to set the selected answer
 * @param {React.Ref} props.boxExerciseRef - The ref to be forwarded to the BoxExercise component
 * 
 * @returns {JSX.Element} The rendered component
 */
const ExerciseToRender = ({ exercise, selectedAnswer, setSelectedAnswer, boxExerciseRef } : ExerciseToRenderProps) => {
    /**
     * Renders the appropriate exercise component based on the exercise type.
     * 
     * @returns {JSX.Element} The rendered exercise component
     */
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
                            <Text style={theme.exerciseFont}>
                                {exercise.question}
                            </Text>
                        </View>
                        <View>
                            <DropdownForm
                                options={exercise.options || []} // Default to an empty array if options are undefined
                                setSelectedAnswer={setSelectedAnswer}
                            />
                        </View>
                    </View>
                );
            case "box":
                return (
                    <View>
                        <BoxExercise
                            options={exercise.options || []}
                            selectedAnswer={Array.isArray(selectedAnswer) ? selectedAnswer : []}
                            setSelectedAnswer={setSelectedAnswer}
                            ref={boxExerciseRef}
                        />
                    </View>
                );
            case "blanks":
                return (
                    <View>
                        <FillInTheBlanksExercise
                            options={exercise.options || []}
                            selectedAnswer={Array.isArray(selectedAnswer) ? selectedAnswer : []}
                            setSelectedAnswer={setSelectedAnswer}
                            ref={boxExerciseRef}
                            question={exercise.question}
                        />
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