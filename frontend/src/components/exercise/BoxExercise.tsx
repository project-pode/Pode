import { forwardRef, useImperativeHandle } from 'react';
import { View, Text, Animated, Pressable, StyleSheet } from 'react-native';
import theme from '../../themes/boxExerciseTheme';
import useBoxAnimations from '../../hooks/useBoxAnimations';

interface BoxExerciseProps {
    options: string[];
    selectedAnswer: string[] | null;
    // eslint-disable-next-line no-unused-vars
    setSelectedAnswer: (answer: string[]) => void;
}

/**
 * BoxExercise component
 * 
 * This component renders a set of animated boxes that can be pressed. It uses the `useBoxAnimations` hook
 * to manage the animations and layouts of the boxes and the drop zone.
 * 
 * @param {Array} props.options - The boxes themselves
 * @param {any} props.selectedAnswer - The currently selected answer
 * @param {Function} props.setSelectedAnswer - Function to set the selected answer
 * @param {React.Ref} ref - The ref to be forwarded to the component
 * 
 * @returns {JSX.Element} The rendered component
 */
const BoxExercise = forwardRef(({ options, selectedAnswer, setSelectedAnswer }: BoxExerciseProps, ref) => {
    const {
        animations,
        boxLayouts,
        dropZoneLayout,
        handlePress,
        resetAnimationsInternal,
    } = useBoxAnimations({ options, selectedAnswer, setSelectedAnswer });

    // Expose the resetAnimations function to the parent component via the ref
    useImperativeHandle(ref, () => ({
        resetAnimations: resetAnimationsInternal,
    }));

    return (
        <View>
            {/* Drop zone view
                This is the area where the boxes will go when pressed
            */}
            <View
                style={theme.dropZone}
                onLayout={(event) => {
                    dropZoneLayout.current = event.nativeEvent.layout;
                }}
            />

            {/* Container for the boxes that can be pressed */}
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
                        {/* Each box is pressable */}
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