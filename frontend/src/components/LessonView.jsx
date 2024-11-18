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
        navigate("/users/lessons");
    }


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
                <Text>X</Text>
            </Pressable>
            <View style = {theme.whiteContainer}>
            <View style = {theme.pinkContainerSansBorder}> 
                <ScrollView>
                <Text style = {theme.lessonTitle}>
                    {lesson.title}
                </Text>
                <Text style = {theme.lessonDescription}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec tortor ac lectus viverra laoreet sit amet sit amet magna. Nunc sit amet libero ut est finibus finibus sed id mauris. Aliquam dictum elementum nunc vitae sollicitudin. Proin in lacus ipsum. Sed at tristique metus. Vivamus consectetur ultricies elit, eu vehicula lorem fringilla nec. Vivamus nec orci aliquet, cursus nisl finibus, convallis tellus. Fusce sed pulvinar sem, ut porttitor massa. Phasellus aliquet volutpat nulla id auctor. Suspendisse ligula arcu, mattis ac luctus ac, ullamcorper sit amet nunc.

In hac habitasse platea dictumst. Maecenas ut pharetra risus. Proin eu erat eget neque ullamcorper mattis vel quis ex. Morbi at mauris metus. Nulla sollicitudin turpis ac rutrum maximus. Fusce ultricies commodo ipsum, accumsan dapibus lorem vestibulum vel. Nullam vitae efficitur tellus. Quisque in orci nec magna finibus vestibulum. Mauris est lectus, luctus in auctor at, tempus quis nisi. Suspendisse et condimentum ex. Duis egestas, tortor eu lobortis porttitor, dui turpis sodales diam, ut ultricies nulla orci ut ligula. Donec non dictum ligula. Nam tempus ligula id odio porta, ac laoreet erat elementum. 
                </Text>
                </ScrollView>
                </View>
            </View>
            <View style = {theme.podeAndLetsGoButtonContainer}> 
            <Image source={require("../../assets/placeHolderPode.png")} style = {theme.podeIcon}/>     
            <Pressable style = {theme.greenButton}>
                <Text style = {theme.letsCodeText}>Let's code!</Text>
            </Pressable>
            </View>
        </View>
    );
};

export default LessonView;