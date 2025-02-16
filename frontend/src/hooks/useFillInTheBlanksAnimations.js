import { useRef, useEffect, useState, createRef } from 'react';
import { Animated } from 'react-native';

const useFillInTheBlanksAnimations = (options, question, selectedAnswer, setSelectedAnswer) => {
    const animations = useRef(options.map(() => new Animated.ValueXY({ x: 0, y: 0 }))).current;
    const boxLayouts = useRef([]); // Store layouts of boxes
    const blankLayouts = useRef([]); // Store layouts of blanks
    const boxRefs = useRef(options.map(() => createRef())); // Store refs of boxes
    const blankRefs = useRef(question.map(() => createRef())); // Store refs of blanks
    const [blanks, setBlanks] = useState(question.map((item) => (item === "blank" ? null : item))); // Track blanks

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
        measureAllLayouts();
    }, [blanks, selectedAnswer]);

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
        }, 800); // Delay is used to prevent wonky layout calculations. Adjust as needed
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