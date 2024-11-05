import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { View, Text, Animated, StyleSheet, Pressable } from 'react-native';

const BoxExercise = forwardRef(({ options, selectedAnswer, setSelectedAnswer }, ref) => {
    const animations = useRef(options.map(() => new Animated.Value(0))).current;

    const handlePress = (block, index) => {
        const targetHeight = -100;
        Animated.timing(animations[index], {
            toValue: targetHeight,
            duration: 300,
            useNativeDriver: true,
        }).start();

        const newOrder = [...selectedAnswer, block];
        setSelectedAnswer(newOrder);
    };

    // Expose resetAnimations to the parent
    useImperativeHandle(ref, () => ({
        resetAnimations: () => {
            animations.forEach((anim) => {
                Animated.timing(anim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            });
        },
    }));

    return (
        <View style={styles.container}>
            <Text style={styles.instructionText}>Tap blocks in the correct order:</Text>
            <View style={styles.blocksContainer}>
                {options.map((block, index) => (
                    <Animated.View
                        key={index}
                        style={[
                            styles.block,
                            { transform: [{ translateY: animations[index] }] },
                        ]}
                    >
                        <Pressable onPress={() => handlePress(block, index)}>
                            <Text style={styles.blockText}>{block}</Text>
                        </Pressable>
                    </Animated.View>
                ))}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    instructionText: {
        fontSize: 16,
        marginBottom: 10,
    },
    blocksContainer: {
        position: 'absolute',
        bottom: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    block: {
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 8,
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#f0f0f0',
    },
    blockText: {
        fontSize: 16,
        color: '#333',
    },
});

export default BoxExercise;
