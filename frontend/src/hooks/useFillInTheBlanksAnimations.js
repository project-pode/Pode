import { useRef, useEffect, useState, createRef } from 'react';
import { Animated } from 'react-native';

/**
 * Custom hook for managing animations in a fill-in-the-blanks exercise.
 * 
 * @param {Array} options - The list of options to fill in the blanks.
 * @param {Array} question - The question array with blanks.
 * @param {Array} selectedAnswer - The currently selected answers.
 * @param {Function} setSelectedAnswer - Function to update the selected answers.
 * @returns {Object} The hook's return values and functions.
 */
const useFillInTheBlanksAnimations = (options, question, selectedAnswer, setSelectedAnswer) => {
    const animations = useRef([]).current;
    const boxLayouts = useRef([]); // Store layouts of boxes
    const blankLayouts = useRef([]); // Store layouts of blanks
    const boxRefs = useRef([]); // Store refs of boxes
    const blankRefs = useRef([]); // Store refs of blanks
    const [blanks, setBlanks] = useState(question.map((item) => (item === "blank" ? null : item))); // Track blanks

    /**
     * Measures the layout of a given element with a delay.
     * 
     * @param {Object} layoutRef - The reference to the layout element.
     * @param {number} index - The index of the element.
     * @param {Object} layoutStore - The store for the layout data.
     */
    const measureLayoutWithDelay = (layoutRef, index, layoutStore) => {
        setTimeout(() => {
            if (layoutRef[index]?.current?.measure) {
                layoutRef[index].current.measure((x, y, width, height, pageX, pageY) => {
                    layoutStore.current[index] = { x: pageX, y: pageY, width, height };
                    console.log(`Measured position for index ${index}:`, layoutStore.current[index]);
                });
            }
        }, 100); // Delay is used to prevent wonky layout calculations. Adjust as needed
    };

    /**
     * Measures all layouts for boxes and blanks.
     */
    const measureAllLayouts = () => {
        options.forEach((_, index) => {
            measureLayoutWithDelay(boxRefs.current, index, boxLayouts);
        });
        question.forEach((_, index) => {
            if (question[index] === 'blank') {
                measureLayoutWithDelay(blankRefs.current, index, blankLayouts);
            }
        });
    };

    useEffect(() => {
        // Initialize refs and animations array when options change
        // This is the same as going from fill in the blanks to another fill in the blanks in which option amount has changed
        boxRefs.current = options.map(() => createRef());
        blankRefs.current = question.map(() => createRef());
        animations.length = 0;
        options.forEach(() => {
            animations.push(new Animated.ValueXY({ x: 0, y: 0 }));
        });

        // Reset animations and measure layouts when options change
        resetAnimationsInternal();
    }, [options]);

    /**
     * Handles the press event on a box.
     * 
     * @param {string} box - The box content.
     * @param {number} index - The index of the box.
     */
    const handlePress = (box, index) => {
        const blankIndex = blanks.findIndex((item) => item === box);
        let newOrder = [];
    
        if (blankIndex !== -1) {
            // Remove the selected box from the blanks
            const newBlanks = [...blanks];
            newBlanks[blankIndex] = null;
            setBlanks(newBlanks);
    
            newOrder = selectedAnswer.filter(item => item !== box);
            setSelectedAnswer(newOrder);
    
            // Reset the animation for the box
            Animated.timing(animations[index], {
                toValue: { x: 0, y: 0 },
                duration: 500,
                useNativeDriver: true,
            }).start();
    
        } else {
            newOrder = [...selectedAnswer, box];
            setSelectedAnswer(newOrder);
    
            const emptyBlankIndex = blanks.indexOf(null);
            if (emptyBlankIndex !== -1) {
                const newBlanks = [...blanks];
                newBlanks[emptyBlankIndex] = box;
                setBlanks(newBlanks);
    
                // Wait for the re-render before measuring and animating
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        // Re-measure layouts AFTER React re-renders
                        measureAllLayouts();
    
                        setTimeout(() => {
                            if (boxLayouts.current[index] && blankLayouts.current[emptyBlankIndex]) {
                                const boxPosition = boxLayouts.current[index];
                                const updatedBlankPosition = blankLayouts.current[emptyBlankIndex];
    
                                if (!updatedBlankPosition) return;
    
                                const deltaX = updatedBlankPosition.x - boxPosition.x;
                                const deltaY = updatedBlankPosition.y - boxPosition.y;
    
                                // Move the box to the correct position
                                Animated.timing(animations[index], {
                                    toValue: { x: deltaX, y: deltaY },
                                    duration: 500,
                                    useNativeDriver: true,
                                }).start();
                            }
                        }, 250); // Small delay ensures new measurements are available
                    }, 100);
                });
            }
        }
    };
    
    

    /**
     * Resets all animations and measures layouts.
     */
    const resetAnimationsInternal = () => {
        animations.forEach((anim) => {
            Animated.timing(anim, {
                toValue: { x: 0, y: 0 },
                duration: 300,
                useNativeDriver: true,
            }).start();
        });

        // Reset blanks and measure layouts after animations are reset
        setBlanks(question.map((item) => (item === "blank" ? null : item)));

        setTimeout(() => {
            measureAllLayouts();
        }, 600); // Delay is used to prevent wonky layout calculations. Adjust as needed
    };

    return {
        animations,
        boxLayouts,
        blankLayouts,
        boxRefs,
        blankRefs,
        blanks,
        handlePress,
        resetAnimationsInternal,
    };
};

export default useFillInTheBlanksAnimations;