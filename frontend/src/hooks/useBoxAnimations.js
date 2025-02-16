import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

const useBoxAnimations = (options, selectedAnswer, setSelectedAnswer) => {
    const animations = useRef([]).current;
    const boxLayouts = useRef([]); // Store layouts of boxes
    const dropZoneLayout = useRef(null); // Store layout of the drop zone

    useEffect(() => {
        // Initialize animations array when options change
        animations.length = 0;
        options.forEach(() => {
            animations.push(new Animated.ValueXY({ x: 0, y: 0 }));
        });

        // Reset animations when options change
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
    };

    const handlePress = (box, index) => {
        if (!animations[index]) return; // Ensure animation exists

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
                const dropZoneX = -dropZoneLayout.current.x + 30;
                const dropZoneY = -dropZoneLayout.current.y - 70;
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

    return {
        animations,
        boxLayouts,
        dropZoneLayout,
        handlePress,
        resetAnimationsInternal,
    };
};

export default useBoxAnimations;