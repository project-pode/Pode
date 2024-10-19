import { View, FlatList, Pressable } from "react-native";
import Text from "./Text";
import { useNavigate, useParams } from "react-router-native";
import { useEffect, useState } from "react";
import lessonService from "../services/lessons";
import userService from "../services/users"
import ExerciseItem from "./ExerciseItem";
import theme from "../theme";
const LessonView = () => {
    const [lesson, setLesson] = useState(null);
    const { userId, lessonId } = useParams();
    const navigate = useNavigate();
    const handleCompleteLesson = async () => {
        try {
          await userService.completeLesson(userId, lessonId);  // Call the Axios service to mark as completed
          navigate("/users/lessons")
        } catch (error) {
          console.error('Error completing lesson:', error);
        }
      };


    useEffect(() => {
        const fetchLesson = async () => {
            const lesson = await userService.getLesson(userId, lessonId);
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
            <Text>Exercises for this lesson:</Text>
            <FlatList data={lesson.exercises}
          renderItem={({item})=> 
          <ExerciseItem item={item}/>}/>
        <Pressable style={theme.button} onPress={handleCompleteLesson}>
            <Text>complete lesson</Text>
        </Pressable>
        </View>
    );
};

export default LessonView;