import { forwardRef, useImperativeHandle } from 'react';
import { View, Text, Animated, StyleSheet, Pressable } from 'react-native';
import theme from '../themes/BoxExerciseTheme';
import useBoxAnimations from '../hooks/useBoxAnimations';

const BoxExercise = forwardRef(({ options, selectedAnswer, setSelectedAnswer }, ref) => {
    const {
        animations,
        boxLayouts,
        dropZoneLayout,
        handlePress,
        resetAnimationsInternal,
    } = useBoxAnimations(options, selectedAnswer, setSelectedAnswer);

    useImperativeHandle(ref, () => ({
        resetAnimations: resetAnimationsInternal,
    }));

    return (
        <View>
            <View
                style={theme.dropZone}
                onLayout={(event) => {
                    dropZoneLayout.current = event.nativeEvent.layout;
                }}
            />

            <View style={theme.boxesContainer}>
                {options.map((box, index) => (
                    <Animated.View
                        key={index}
                        style={[
                            theme.boxExerciseBox,
                            { transform: animations[index]?.getTranslateTransform() || [] },
                        ]}
                        onLayout={(event) => (boxLayouts.current[index] = event.nativeEvent.layout)}
                    >
                        <Pressable
                            onPress={() => handlePress(box, index)}
                            style={StyleSheet.absoluteFill} // Covers the entire box
                        >
                            <View style={theme.centeredContent}>
                                <Text style={theme.boxExerciseBoxText}>{box}</Text>
                            </View>
                        </Pressable>
                    </Animated.View>
                ))}
            </View>
        </View>
    );
});

BoxExercise.displayName = 'BoxExercise';
export default BoxExercise;