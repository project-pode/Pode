import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { View, Text, Animated, StyleSheet, Pressable } from 'react-native';

const BoxExercise = forwardRef(({ options, selectedAnswer, setSelectedAnswer }, ref) => {
    const animations = useRef(options.map(() => new Animated.ValueXY({ x: 0, y: 0 }))).current;
    const boxLayouts = useRef([]); // Store layouts of boxs
    const dropZoneLayout = useRef(null); // Store layout of the drop zone

    const handlePress = (box, index) => {
        if (selectedAnswer.includes(box)) {
            return;
        }

        const newOrder = [...selectedAnswer, box];
        setSelectedAnswer(newOrder);

        const targetIndex = newOrder.length - 1;

        if (dropZoneLayout.current && boxLayouts.current[index]) {
            const dropZoneX = -dropZoneLayout.current.x;
            const dropZoneY = -dropZoneLayout.current.y;
            const boxX = boxLayouts.current[index].x;
            const boxY = boxLayouts.current[index].y;
            const boxWidth = boxLayouts.current[index].width;

            const targetX = dropZoneX + targetIndex * (boxWidth + 10);
            const targetY = dropZoneY;

            const deltaX = targetX - boxX;
            const deltaY = targetY - boxY;

            Animated.timing(animations[index], {
                toValue: { x: deltaX, y: deltaY },
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    };

    useImperativeHandle(ref, () => ({
        resetAnimations: () => {
            animations.forEach((anim) => {
                Animated.timing(anim, {
                    toValue: { x: 0, y: 0 },
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            });
            setSelectedAnswer([]);
        },
    }));

    return (
        <View style={styles.container}>
            <Text style={styles.instructionText}>Tap the boxes to create your answer</Text>

            <View style={styles.dropZone} onLayout={(event) => (dropZoneLayout.current = event.nativeEvent.layout)}>
                <Text style={styles.dropZoneText}>Drop Zone</Text>
            </View>

            <View style={styles.boxesContainer}>
                {options.map((box, index) => (
                    <Animated.View
                        key={index}
                        style={[
                            styles.box,
                            { transform: animations[index].getTranslateTransform() },
                        ]}
                        onLayout={(event) => (boxLayouts.current[index] = event.nativeEvent.layout)}
                    >
                        <Pressable onPress={() => handlePress(box, index)}>
                            <Text style={styles.boxText}>{box}</Text>
                        </Pressable>
                    </Animated.View>
                ))}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    instructionText: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    selectedAnswer: {
        fontSize: 16,
        marginVertical: 10,
        textAlign: 'center',
        color: '#555',
    },
    dropZone: {
        visibility: "hidden",
        height: 60,
        marginVertical: 20,
        borderWidth: 2,
        borderColor: '#007bff',
        borderRadius: 8,
        backgroundColor: '#e7f3ff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropZoneText: {
        fontSize: 16,
        color: '#007bff',
    },
    boxesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    box: {
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#f9f9f9',
    },
    boxText: {
        fontSize: 16,
        color: '#333',
    },
});

export default BoxExercise;
