import { forwardRef, useImperativeHandle } from 'react';
import { View, Text, Animated, Pressable, ViewStyle, TextStyle } from 'react-native';
import theme from '../../themes/fillInTheBlanksExerciseTheme';
import useFillInTheBlanksAnimations from '../../hooks/useFillInTheBlanksAnimations';
import mainTheme from "../../themes/mainTheme";

interface FillInTheBlanksExerciseProps {
    options: string[];
    question: (string | "blank" | "newLine")[];
    selectedAnswer: string[] | null;
    // eslint-disable-next-line no-unused-vars
    setSelectedAnswer: (answer: string[]) => void;
}

/**
 * FillInTheBlanksExercise component
 * 
 * This component renders a fill-in-the-blanks exercise where users can tap on boxes to fill in the blanks in a question.
 * It uses the `useFillInTheBlanksAnimations` hook to manage the animations and layouts of the boxes and blanks.
 * 
 * @param {Array} props.options - The boxes themselves that can be tapped to fill in the blanks
 * @param {Array} props.question - The question text in the purple container. Includes the blanks
 * @param {any} props.selectedAnswer - The currently selected answer
 * @param {Function} props.setSelectedAnswer - Function to set the selected answer
 * @param {React.Ref} ref - The ref to be forwarded to the component
 * 
 * @returns {JSX.Element} The rendered component
 */
const FillInTheBlanksExercise = forwardRef(({ options, question, selectedAnswer, setSelectedAnswer }: FillInTheBlanksExerciseProps, ref) => {
    const {
        animations,
        boxRefs,
        blankRefs,
        blanks,
        handlePress,
        resetAnimationsInternal,
    } = useFillInTheBlanksAnimations({options, question, selectedAnswer, setSelectedAnswer});

    useImperativeHandle(ref, () => ({
        resetAnimations: resetAnimationsInternal,
    }));

    const longestString = options.reduce((longest, current) => {
        return current.length > longest.length ? current : longest;
    }, '');

    const getBlankBoxStyle = (isFilled: boolean): ViewStyle => ({
        backgroundColor: isFilled ? 'rgba(237,220,249,1)' : 'rgba(161,161,161,255)',
        borderRadius: 20,
        padding: 12,
        margin: 5,
        minWidth: 50,
        alignItems: 'center',
        justifyContent: 'center',
    });
    const getBlankBoxTextStyle = (isFilled: boolean): TextStyle => ({
        color: isFilled ? 'rgba(237,220,249,1)' : 'rgba(161,161,161,255)',
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
        fontFamily: "Cousine",
    });

    /**
         * Renders the question text with blanks.
         * 
         * @returns {JSX.Element} The rendered question text
         */
    const renderQuestionText = () => {
        return question.map((item, index) => {
            if (item === "blank") {
                // Insert blank box
                const isFilled = blanks[index] !== null;
                return (
                    <View
                        key={index}
                        style={getBlankBoxStyle(isFilled)}
                        onLayout={() => { }}
                        ref={blankRefs.current[index]}
                    >
                        <Text style={getBlankBoxTextStyle(isFilled)}>{longestString || '[ ]'}</Text>
                    </View>
                );
            }
            if (item === "newLine") {
                // Continue on a new line
                return <View key={index} style={{ width: "100%", height: 0 }} />;
            }
            // Normal case
            return (
                <Text key={index} style={mainTheme.exerciseDescription}>
                    {item}
                </Text>
            );
        });
    };

    return (
        <View>
            <View style={theme.pinkContainerBox}>
                <View style={theme.questionContainer}>{renderQuestionText()}</View>
            </View>
            <View style={theme.boxesContainer}>
                {options.map((box, index) => (
                    <Pressable onPress={() => handlePress(box, index)} key={index}>
                        <Animated.View
                            style={[
                                theme.notBlankBox,
                                { transform: animations[index]?.getTranslateTransform() || [] },]}
                            onLayout={() => { }}
                            ref={boxRefs.current[index]}
                        >
                            <Text style={theme.boxExerciseBoxText}>{box}</Text>
                        </Animated.View>
                    </Pressable>
                ))}
            </View>
        </View>
    );
});

FillInTheBlanksExercise.displayName = 'FillInTheBlanksExercise';
export default FillInTheBlanksExercise;