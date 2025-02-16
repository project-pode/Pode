import { Pressable, Text, View, Image, Animated } from "react-native";
import { useNavigate, useParams, useLocation } from "react-router-native";
import lessonService from "../services/lessons";
import { useState, useEffect, useRef } from "react";
import theme from "../themes/LessonOverviewTheme";
import LoadingView from "./LoadingView";

const LessonOverview = () => {
    const [lesson, setLesson] = useState(null);
    const navigate = useNavigate();
    const { userId, lessonId } = useParams();
    const location = useLocation();
    const { completedExercises } = location.state || {};
    const slideAnim = useRef(new Animated.Value(300)).current; //slide animation

    const handlePress = () => {
        navigate(`/users/${userId}/lessons`); //when going back, animation should be different (slide down), will need to be implemented
    };

    useEffect(() => {
        const fetchLesson = async () => {
            const lesson = await lessonService.getLesson(userId, lessonId);
            setLesson(lesson);
        };

        // Slide in animation when first exercise loads
        Animated.timing(slideAnim, {
            toValue: 0, // Slide to the original position
            duration: 300, // Slide duration
            useNativeDriver: true,
        }).start();
        void fetchLesson();
    }, [lessonId, userId]);

    if (!lesson) {
        return (
            <LoadingView/>
        ); 
    }

    return (
        <View style={theme.blueContainer}>
            <Animated.View style={[theme.whiteContainerInLessonOverview, { transform: [{ translateX: slideAnim }] }]}>
                <View style={theme.pinkContainerInLessnOverview}>
                    <Text style={theme.overviewTitle}>
                        Congratulations!
                    </Text>
                    <View>
                        <Text style={theme.lessonOverviewDescription}>
                            You got {completedExercises} out of {lesson.exercises.length} right!
                        </Text>
                        <View style={theme.pillBar}>
                            <View style={[theme.pillBarFill, { width: (completedExercises / lesson.exercises.length) * 100 + '%' }]}>
                            </View>
                        </View>
                    </View>
                    <Text style={theme.lessonOverviewDescription}>
                        Pode is proud of you!
                    </Text>
                </View>
                <View style={theme.podeContainerInLessonView}>
                    <Image source={require("../../assets/placeHolderPode.png")} style={theme.podeIconInLessonView} />
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