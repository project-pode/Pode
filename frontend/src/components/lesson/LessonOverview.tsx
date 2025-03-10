import { Pressable, Text, View, Image, Animated, ImageStyle } from "react-native";
import { useNavigate, useParams, useLocation } from "react-router-native";
import lessonService from "../../services/lessons";
import { useState, useEffect, useRef } from "react";
import theme from "../../themes/lessonOverviewTheme";
import LoadingView from "../LoadingView";
import mainTheme from "../../themes/mainTheme";
import { Lesson } from "../../types";

/**
 * LessonOverview component
 * 
 * This component renders an overview of a completed lesson, showing the user's progress and a congratulatory message.
 * It handles fetching lesson data and displaying the number of completed exercises.
 * 
 * @returns {JSX.Element} The rendered component
 */
const LessonOverview = () => {
    const [lesson, setLesson] = useState<Lesson|null>(null);
    const navigate = useNavigate();
    const { lessonId } = useParams();
    const location = useLocation();
    const { completedExercises } = location.state || {};
    const slideAnim = useRef(new Animated.Value(300)).current; // Slide animation

    /**
     * Handles the press event for the exit button.
     * Navigates back to the lessons overview page.
     */
    const handlePress = () => {
        navigate(`/lessons`);
    };

    useEffect(() => {
        const fetchLesson = async () => {
            const lesson = await lessonService.getLesson(lessonId);
            setLesson(lesson);
        };

        // Slide in animation when the component loads
        Animated.timing(slideAnim, {
            toValue: 0, // Slide to the original position
            duration: 300, // Slide duration
            useNativeDriver: true,
        }).start();
        void fetchLesson();
    }, [lessonId]);

    if (!lesson) {
        return (
            <LoadingView/>
        ); 
    }

    const percentage: number = (completedExercises / lesson.exercises.length) * 100;

    return (
        <View style={mainTheme.blueContainer}>
            <Animated.View style={[theme.whiteContainerInLessonOverview, { transform: [{ translateX: slideAnim }] }]}>
                <View style={theme.pinkContainerInLessonOverview}>
                    <Text style={theme.overviewTitle}>
                        Congratulations!
                    </Text>
                    <View>
                        <Text style={theme.lessonOverviewDescription}>
                            You got {completedExercises} out of {lesson.exercises.length} right!
                        </Text>
                        <View style={theme.pillBar}>
                            <View style={[theme.pillBarFill, { width: `${percentage}%` }]}>
                                <Text style={theme.LessonOverviewPercentage}>{percentage}%</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={theme.lessonOverviewDescription}>
                        Pode is proud of you!
                    </Text>
                </View>
                <View style={theme.podeContainerInLessonView}>
                    <Image source={require("../../../assets/placeHolderPode.png")} style={theme.podeIconInLessonView as ImageStyle} />
                </View>
            </Animated.View>
            <View style={theme.exitButtonContainerInLessonView}>
                <View style={theme.emptySpaceFiller}>
                    <View style={theme.greenButtonInLessonOverview}>
                        <Pressable onPress={handlePress}>
                            <Text style={theme.exitButtonText}>Exit</Text>
                        </Pressable>
                    </View>
                    <View style={theme.emptySpaceFiller}>
                    </View>
                </View>
            </View>
            <View style={{ margin: 12 }}>

            </View>
        </View>
    );
};

export default LessonOverview;