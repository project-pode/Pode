import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { View, Text, Animated, StyleSheet, Pressable } from 'react-native';
import theme from '../theme';

const BoxExercise = forwardRef(({ options, selectedAnswer, setSelectedAnswer }, ref) => {
    const animations = useRef(options.map(() => new Animated.ValueXY({ x: 0, y: 0 }))).current;
    const boxLayouts = useRef([]); // Store layouts of boxes
    const dropZoneLayout = useRef(null); // Store layout of the drop zone

    const handlePress = (box, index) => {
        const isBoxInDropZone = selectedAnswer.includes(box);
        let newOrder = [];

        if (isBoxInDropZone) {
            // Remove the box from the drop zone
            newOrder = selectedAnswer.filter(item => item !== box);
            setSelectedAnswer(newOrder);

            // Move the box back to its initial position
            Animated.timing(animations[index], {
                toValue: { x: 0, y: 0 },
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            // Add the box to the drop zone
            newOrder = [...selectedAnswer, box];
            setSelectedAnswer(newOrder);

            const targetIndex = newOrder.length - 1;
            if (dropZoneLayout.current && boxLayouts.current[index]) {
                const dropZoneX = -dropZoneLayout.current.x;
                const dropZoneY = -dropZoneLayout.current.y;
                const boxX = boxLayouts.current[index].x;
                const boxY = boxLayouts.current[index].y;
                const boxWidth = boxLayouts.current[index].width;

                const targetX = Math.min(dropZoneX + targetIndex * (boxWidth + 10), dropZoneLayout.current.width - boxWidth);

                const targetY = dropZoneY;

                const deltaX = targetX - boxX;
                const deltaY = targetY - boxY;

                Animated.timing(animations[index], {
                    toValue: { x: deltaX, y: deltaY },
                    duration: 500,
                    useNativeDriver: true,
                }).start();
            }
        }

        // Update positions of boxes in the drop zone
        newOrder.forEach((item, idx) => {
            const itemIndex = options.indexOf(item);
            if (boxLayouts.current[itemIndex] && dropZoneLayout.current) {
                const boxX = boxLayouts.current[itemIndex].x;
                const boxY = boxLayouts.current[itemIndex].y;
                const dropZoneX = -dropZoneLayout.current.x +30;
                const dropZoneY = -dropZoneLayout.current.y -70;
                const boxWidth = boxLayouts.current[itemIndex].width;

                const targetX = dropZoneX + idx * (boxWidth + 10);
                const targetY = dropZoneY;

                const deltaX = targetX - boxX;
                const deltaY = targetY - boxY;

                Animated.timing(animations[itemIndex], {
                    toValue: { x: deltaX, y: deltaY },
                    duration: 500,
                    useNativeDriver: true,
                }).start();
            }
        });
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
        <View>
            

            <View
                style={styles.dropZone}
                onLayout={(event) => {
                    dropZoneLayout.current = event.nativeEvent.layout;
                }}
            />

            <View style={styles.boxesContainer}>
                {options.map((box, index) => (
                    <Animated.View
                        key={index}
                        style={[
                            theme.boxExerciseBox,
                            { transform: animations[index].getTranslateTransform() },
                        ]}
                        onLayout={(event) => (boxLayouts.current[index] = event.nativeEvent.layout)}
                    >
                        <Pressable
                            onPress={() => handlePress(box, index)}
                            style={StyleSheet.absoluteFill} // Covers the entire box
                        >
                            <View style={styles.centeredContent}>
                                <Text style={theme.boxExerciseBoxText}>{box}</Text>
                            </View>
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
    dropZone: {
        
        height: 100,
        marginVertical: 20,
        backgroundColor: "rgba(237,220,249,1)",
        borderColor: "rgba(187,144,214,1)",
        borderRadius: 48,
        borderWidth: 7,
        justifyContent: 'space-around'
        
    },
    boxesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        
  
    },
    box: {
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 8,
        width: 80, // Fixed width
        height: 40, // Fixed height
        backgroundColor: '#f9f9f9',
        overflow: 'hidden', // Ensures no content overflows the box
    },
    centeredContent: {
        flex: 1, // Fills the parent Pressable
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
    },
    boxText: {
        fontSize: 16,
        color: '#333',
    },
});

BoxExercise.displayName = 'BoxExercise';
export default BoxExercise;
