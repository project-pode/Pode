import { View, FlatList, Pressable, Text, Image, ScrollView } from "react-native";
import { useNavigate, useParams } from "react-router-native";
import { useEffect, useState } from "react";
import lessonService from "../services/lessons";
import userService from "../services/users";
import ExerciseItem from "./ExerciseItem";
import theme from "../theme";
const LessonView = () => {
    const [lesson, setLesson] = useState(null);
    const [completedExercises, setCompletedExercises] = useState([]);
    const { userId, lessonId } = useParams();
    const navigate = useNavigate();

    const handleCompleteLesson = async () => {
        try {
            await lessonService.completeLesson(userId, lessonId);  // Call the Axios service to mark as completed
            navigate(`/users/${userId}/lessons/${lessonId}/overview`);
        } catch (error) {
            console.error('Error completing lesson:', error);
        }
    };

    const handleBackPress = () => {
        navigate('/users/${userId}/lessons');
    }

    const moveToExercise = () => {
        if (lesson && lesson.exercises && lesson.exercises.length > 0) {
            const firstExerciseId = lesson.exercises[0].id; // Get the first exercise's ID
            navigate(`/users/${userId}/lessons/${lessonId}/exercises/${firstExerciseId}`);
        } else {
            console.error("No exercises found in the lesson."); // Handle edge case
        }
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
    }, [userId, lessonId]);
    if (!lesson) {
        return (
            <View>
                <Text>
                    No lessons found
                </Text>
            </View>
        ); // Or any other message you want to display
    }

    const isExerciseCompleted = (exerciseId) => {
        return completedExercises.includes(exerciseId);  // Check if the exercise is in the user's completed list
    };

    return (
        <View style = {theme.blueContainer}>
            <Pressable style={{borderWidth:1, alignSelf:"flex-end"}} onPress={handleBackPress}>
                <Text style = {{fontSize: 27}}>X</Text>
            </Pressable>
            <View style = {theme.whiteContainer} >
                <View style = {theme.pinkContainerSansBorder}> 
                <Text style = {theme.lessonTitle}>
                        {lesson.title}
                    </Text>
                    <ScrollView>

                    <Text style = {theme.lessonDescription}>
                        {lesson.description}
                    </Text>
                    
                    </ScrollView>
                </View>
            </View>
            <View style = {theme.podeAndLetsCodeButtonContainer}> 
            <Image source={require("../../assets/placeHolderPode.png")} style = {theme.podeIcon}/>   
                <View style = {theme.letsCodeButtonContainer}>
                    <Pressable style = {theme.greenButton} onPress={moveToExercise}>
                        <Text style = {theme.letsCodeText}>Let's code!</Text>
                    </Pressable>
                </View> 
            </View>
        </View>
    );
};

export default LessonView;