import { useRef, useEffect, useState } from 'react';
import { Animated, Dimensions } from 'react-native';

const useBoxAnimations = (options, selectedAnswer, setSelectedAnswer) => {
    const animations = useRef([]).current;
    const boxLayouts = useRef([]);
    const dropZoneLayout = useRef(null);
    const windowWidth = Dimensions.get('window').width;

    const [dropZoneHeight, setDropZoneHeight] = useState(100); // Default height

    useEffect(() => {
        animations.length = 0;
        options.forEach(() => {
            animations.push(new Animated.ValueXY({ x: 0, y: 0 }));
        });

        resetAnimationsInternal();
    }, [options]);

    const resetAnimationsInternal = () => {
        animations.forEach((anim) => {
            Animated.timing(anim, {
                toValue: { x: 0, y: 0 },
                duration: 300,
                useNativeDriver: true,
            }).start();
        });
        setSelectedAnswer([]);
        setDropZoneHeight(100); // Reset drop zone height
    };

    const handlePress = (box, index) => {
        if (!animations[index]) return;

        const isBoxInDropZone = selectedAnswer.includes(box);
        let newOrder = [];

        if (isBoxInDropZone) {
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
        }

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
                const dropZoneY = -dropZoneLayout.current.y - 70 + currentRowY;

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
