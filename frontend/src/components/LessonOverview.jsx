import { Pressable, Text, View } from "react-native";
import { useNavigate, useParams } from "react-router-native";
import lessonService from "../services/lessons";
import { useState, useEffect } from "react";
import userService from "../services/users";
const LessonOverview = () => {
    const [lesson, setLesson] = useState(null);
    const [completedExercises, setCompletedExercises] = useState([]);
    const navigate = useNavigate();
    const { userId, lessonId } = useParams();


    const handlePress = () => {
        navigate(`/users/${userId}/lessons`);
    };

    useEffect(() => {
        const fetchLesson = async () => {
            const lesson = await lessonService.getLesson(userId, lessonId);
            setLesson(lesson);
        };

        const fetchCompletedExercises = async () => {
            const user = await userService.getOne(userId);
            setCompletedExercises(user.completedExercises || []);
        };

        void fetchLesson();
        void fetchCompletedExercises();
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

    /* const status = () => {
        //lesson.c
    }; */

    return (
        <View>
            <Text>
            correct exercises: {completedExercises.length} out of {lesson.exercises.length}
            </Text>
            <Pressable onPress={handlePress}>
                <Text>Return to progress map</Text>
            </Pressable>
        </View>
    );
};
export default LessonOverview;