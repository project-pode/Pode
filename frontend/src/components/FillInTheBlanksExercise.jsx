import { forwardRef, useImperativeHandle } from 'react';
import { View, Text, Animated, Pressable } from 'react-native';
import theme from '../themes/FillInTheBlanksExerciseTheme';
import useFillInTheBlanksAnimations from '../hooks/useFillInTheBlanksAnimations';

const FillInTheBlanksExercise = forwardRef(({ options, question, selectedAnswer, setSelectedAnswer }, ref) => {
    const {
        animations,
        boxRefs,
        blankRefs,
        blanks,
        handlePress,
        resetAnimationsInternal,
    } = useFillInTheBlanksAnimations(options, question, selectedAnswer, setSelectedAnswer);

    useImperativeHandle(ref, () => ({
        resetAnimations: resetAnimationsInternal,
    }));

    const renderQuestionText = () => {
        return question.map((item, index) => {
            if (item === "blank") {
                //insert answer box
                return (
                    <View
                        key={index}
                        style={theme.blankBox}
                        onLayout={() => {}}
                        ref={blankRefs.current[index]}
                    >
                        <Text style={theme.blankBoxText}>{blanks[index] || "[ ]"}</Text>
                    </View>
                );
            }
            if (item === "newLine") {
                //continue on a new line
                return <View key={index} style={{ width: "100%", height: 10 }} />;
            }
            return (
                <Text key={index} style={theme.exerciseDescription}>
                    {item}
                </Text>
            );
        });
    };

    return (
        <View>
            <Text style={theme.exerciseDescription}>Tap the boxes to fill the blanks</Text>
            <View style={theme.pinkContainerBox}>
                <View style={theme.questionContainer}>{renderQuestionText()}</View>
            </View>
            <View style={theme.boxesContainer}>
                {options.map((box, index) => (
                    <Pressable onPress={() => handlePress(box, index)} key={index}>
                        <Animated.View
                            style={[
                                theme.notBlankBox,
                                { transform: animations[index].getTranslateTransform() },
                            ]}
                            onLayout={() => {}}
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