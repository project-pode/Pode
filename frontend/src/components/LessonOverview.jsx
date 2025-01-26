import { Pressable, Text, View, Image } from "react-native";
import { useNavigate, useParams, useLocation } from "react-router-native";
import lessonService from "../services/lessons";
import { useState, useEffect } from "react";
import theme from "../themes/LessonOverviewTheme";

const LessonOverview = () => {
    const [lesson, setLesson] = useState(null);
    const navigate = useNavigate();
    const { userId, lessonId } = useParams();
    const location = useLocation();
    const { completedExercises } = location.state || {};

    const handlePress = () => {
        navigate(`/users/${userId}/lessons`);
    };

    useEffect(() => {
        const fetchLesson = async () => {
            const lesson = await lessonService.getLesson(userId, lessonId);
            setLesson(lesson);
        };
        void fetchLesson();
    }, [lessonId, userId]);

    if (!lesson) {
        return (
            <View>
                <Text>
                    No lessons found
                </Text>
            </View>
        ); // Or any other message you want to display
    }

    return (
        <View style={theme.blueContainer}>
            <View style={theme.whiteContainerInLessonOverview}>
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
            </View>
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