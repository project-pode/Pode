import { View } from "react-native-web";
import Text from "./Text";
import { useParams } from "react-router-native";
import { useEffect, useState } from "react";
import lessonService from "../services/lessons";
const LessonView = () => {
    const [lesson, setLesson] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchLesson = async () => {
            const lesson = await lessonService.getOne(id);
            setLesson(lesson);
        };
        void fetchLesson();
    }, []);
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
        <View>
            <Text>
                title: {lesson.title}
            </Text>
            <Text>description: {lesson.description}</Text>
            <Text>id: {lesson.id}</Text>

        </View>
    );
};

export default LessonView;