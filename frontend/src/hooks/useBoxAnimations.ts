import { useRef, useEffect, useState } from 'react';
import { Animated, Dimensions } from 'react-native';

interface BoxAnimationsProps {
    options: string[];
    selectedAnswer: string[] | null;
    setSelectedAnswer: (answer: string[]) => void;
}

/**
 * Custom hook to manage box animations.
 * @param {Array} options - List of options for the boxes.
 * @param {Array} selectedAnswer - List of selected answers.
 * @param {Function} setSelectedAnswer - Function to update the selected answers.
 * @returns {Object} - Contains animations, boxLayouts, dropZoneLayout, handlePress, and resetAnimationsInternal.
 */
const useBoxAnimations = ({ options, selectedAnswer, setSelectedAnswer }: BoxAnimationsProps) => {

    // Ref to store animation values for each box
    const animations: Animated.ValueXY[] = useRef([]).current;
    // Ref to store layouts of boxes
    const boxLayouts: any = useRef([]);
    // Ref to store layout of the drop zone
    const dropZoneLayout: any = useRef(null);
    const windowWidth = Dimensions.get('window').width;

    const [dropZoneHeight, setDropZoneHeight] = useState(100); // Default height

    useEffect(() => {
        // Initialize animations array when options change
        animations.length = 0;
        options.forEach(() => {
            animations.push(new Animated.ValueXY({ x: 0, y: 0 }));
        });
        // Reset animations when options change
        resetAnimationsInternal();
    }, [options]);

    /**
      * Resets the animations of all boxes to their initial positions.
      */
    const resetAnimationsInternal = () => {
        animations.forEach((anim) => {
            Animated.timing(anim, {
                toValue: { x: 0, y: 0 },
                duration: 300,
                useNativeDriver: true,
            }).start();
        });
        setSelectedAnswer([]); // Reset selected answer
        setDropZoneHeight(100); // Reset drop zone height
    };

    /**
   * Handles the press event on a box.
   * @param {string} box - The box to press.
   * @param {number} index - The index of the box.
   */
    const handlePress = (box: string, index: number) => {
        if (!animations[index]) return; // Ensure animation exists

        if (selectedAnswer != null) {


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
            }

            // Update positions of boxes in the drop zone
            let accumulatedWidth = 0;
            let currentRowY = 0;
            let rowCount = 1;
            const dropZoneRightEdge = windowWidth - 2 * (-dropZoneLayout.current?.x + (windowWidth * 0.05) + 28);

            newOrder.forEach((item) => {
                const itemIndex = options.indexOf(item);
                const boxWidth = boxLayouts.current[itemIndex]?.width || 0;

                if (boxLayouts.current[itemIndex] && dropZoneLayout.current) {
                    if (accumulatedWidth + boxWidth > dropZoneRightEdge) {
                        currentRowY += 50;
                        accumulatedWidth = 0;
                        rowCount += 1; // Increase row count
                    }

                    const boxX = boxLayouts.current[itemIndex].x;
                    const boxY = boxLayouts.current[itemIndex].y;
                    const dropZoneX = -dropZoneLayout.current.x + (windowWidth * 0.05);
                    const dropZoneY = -dropZoneLayout.current.y - 100 + currentRowY;

                    const targetX = dropZoneX + accumulatedWidth;
                    const targetY = dropZoneY;
                    accumulatedWidth += boxWidth + 10;

                    const deltaX = targetX - boxX;
                    const deltaY = targetY - boxY;

                    Animated.timing(animations[itemIndex], {
                        toValue: { x: deltaX, y: deltaY },
                        duration: 500,
                        useNativeDriver: true,
                    }).start();
                }
            });

            // Ensure state update triggers a re-render
            setDropZoneHeight((prevHeight) => {
                const newHeight = 100 + (rowCount - 1) * 60;
                return newHeight !== prevHeight ? newHeight : prevHeight;
            });
        }
    };

    return {
        animations,
        boxLayouts,
        dropZoneLayout,
        handlePress,
        resetAnimationsInternal,
        dropZoneHeight,
    };
};

export default useBoxAnimations;
