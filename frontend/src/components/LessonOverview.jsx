import { Pressable, Text, View } from "react-native"
import { useNavigate, useParams } from "react-router-native"
import lessonService from "../services/lessons";
import { useState, useEffect } from "react";
const LessonOverview = () => {
    const [lesson, setLesson] = useState(null);

    const navigate = useNavigate();
    const { userId, lessonId } = useParams();


    const handlePress = () => {
        navigate("/users/lessons");
    }

    useEffect(() => {
        const fetchLesson = async () => {
            const lesson = await lessonService.getLesson(userId, lessonId);
            setLesson(lesson);
        };

        void fetchLesson();
    }, [lessonId]);
    if (!lesson) {
        return (
            <View>
                <Text>
                    No lessons found
                </Text>
            </View>
        ); // Or any other message you want to display
    }

    const status = () => {
        //lesson.c
    }

    return (
        <View>
            <Text>
                lesson Overview
            </Text>
            <Pressable onPress={handlePress}>
                <Text>Return to progress map</Text>
            </Pressable>
        </View>
    )
}
export default LessonOverview