import React, { useRef, forwardRef, useImperativeHandle, useState } from 'react';
import { View, Text, Animated, StyleSheet, Pressable } from 'react-native';

const FillInTheBlanksExercise = forwardRef(({ options, question, selectedAnswer, setSelectedAnswer }, ref) => {
    const animations = useRef(options.map(() => new Animated.ValueXY({ x: 0, y: 0 }))).current;
    const boxLayouts = useRef([]); // Store layouts of boxes
    const blankLayouts = useRef([]); // Store layouts of blanks
    const [blanks, setBlanks] = useState(question.map((item) => (item === "blank" ? null : item))); // Track blanks

    const measureLayoutWithDelay = (ref, index, layoutStore) => {
        setTimeout(() => {
            ref.measure((x, y, width, height, pageX, pageY) => {
                layoutStore.current[index] = { x: pageX, y: pageY, width, height };
                console.log(`Measured position for index ${index}:`, layoutStore.current[index]);
            });
        }, 100); // This is so that the layouts wont be wonky when loading up. Adjust delay as needed 
    };

    const handlePress = (box, index) => {
        const blankIndex = blanks.findIndex((item) => item === box);
        let newOrder = [];

        if (blankIndex !== -1) {
            const newBlanks = [...blanks];
            newBlanks[blankIndex] = null; // Clear the blank
            setBlanks(newBlanks);

            newOrder = selectedAnswer.filter(item => item !== box);
            setSelectedAnswer(newOrder);

            Animated.timing(animations[index], {
                toValue: { x: 0, y: 0 },
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            newOrder = [...selectedAnswer, box];
            setSelectedAnswer(newOrder);

            const emptyBlankIndex = blanks.indexOf(null);
            if (
                emptyBlankIndex !== -1 &&
                boxLayouts.current[index] &&
                blankLayouts.current[emptyBlankIndex]
            ) {
                const boxPosition = boxLayouts.current[index];
                const blankPosition = blankLayouts.current[emptyBlankIndex];

                // Calculate the offset for the animation
                const deltaX = blankPosition.x - boxPosition.x;
                const deltaY = blankPosition.y - boxPosition.y;

                // Log values for debugging
                console.log('Box Position:', boxPosition);
                console.log('Blank Position:', blankPosition);
                console.log('deltaX:', deltaX);
                console.log('deltaY:', deltaY);

                // Update the blanks state
                const newBlanks = [...blanks];
                newBlanks[emptyBlankIndex] = box;
                setBlanks(newBlanks);

                // Animate the box to the blank position
                Animated.timing(animations[index], {
                    toValue: { x: deltaX, y: deltaY },
                    duration: 500,
                    useNativeDriver: true,
                }).start();
            }
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
            setBlanks(question.map((item) => (item === "blank" ? null : item)));
        },
    }));

    const renderQuestionText = () => {
        return question.map((item, index) => {
            if (item === "blank") {
                return (
                    <View
                        key={index}
                        style={styles.blankBox}
                        onLayout={() => {}}
                        ref={(ref) => {
                            if (ref) {
                                measureLayoutWithDelay(ref, index, blankLayouts);
                            }
                        }}
                    >
                        <Text style={styles.blankText}>{blanks[index] || "[ ]"}</Text>
                    </View>
                );
            }
            return (
                <Text key={index} style={styles.questionText}>
                    {item}
                </Text>
            );
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.instructionText}>Tap the boxes to fill the blanks</Text>

            <View style={styles.questionContainer}>{renderQuestionText()}</View>

            <View style={styles.boxesContainer}>
                {options.map((box, index) => (
                    <Pressable onPress={() => handlePress(box, index)} key={index}>
                        <Animated.View
                            style={[
                                styles.box,
                                { transform: animations[index].getTranslateTransform() },
                            ]}
                            onLayout={() => {}}
                            ref={(ref) => {
                                if (ref) {
                                    measureLayoutWithDelay(ref, index, boxLayouts);
                                }
                            }}
                        >
                            <Text style={styles.boxText}>{box}</Text>
                        </Animated.View>
                    </Pressable>
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
    questionContainer: {
        marginVertical: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    questionText: {
        fontSize: 16,
        marginHorizontal: 5,
    },
    blankBox: {
        borderWidth: 1,
        borderColor: '#007bff',
        borderRadius: 8,
        padding: 12,
        margin: 5,
        minWidth: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    blankText: {
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
        minWidth: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxText: {
        fontSize: 16,
        color: '#333',
    },
});

FillInTheBlanksExercise.displayName = 'FillInTheBlanksExercise';
export default FillInTheBlanksExercise;
