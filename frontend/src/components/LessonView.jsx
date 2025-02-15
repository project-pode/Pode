import { View, Pressable, Text, Image, ScrollView } from "react-native";
import { useNavigate, useParams } from "react-router-native";
import { useEffect, useState } from "react";
import lessonService from "../services/lessons";
import theme from "../themes/LessonViewTheme";
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // Icon names can be found here: https://oblador.github.io/react-native-vector-icons/#MaterialIcons
import PopUp from "./PopUp";
import mainTheme from '../themes/MainTheme';

const LessonView = () => {
    const [lesson, setLesson] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const { userId, lessonId } = useParams();
    const navigate = useNavigate();

    const handleBackPress = () => {
        setShowPopup(true);
    };

    const handleConfirm = () => {
        setShowPopup(false);
        navigate(`/users/${userId}/lessons`);
    };

    const handleCancel = () => {
        setShowPopup(false);
    };

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

        void fetchLesson();
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
    
    return (
        <View style = {mainTheme.blueContainer}>
            <Pressable style={{alignSelf:"flex-end", color: "rgba(75,113,123,1)"}} onPress={handleBackPress}>
                <MaterialIcons name="close" size={40} color="rgb(69, 100, 108)"></MaterialIcons>
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
                <View style = {theme.podeContainer}>
                    <Image source={require("../../assets/placeHolderPode.png")} style = {theme.podeIcon}/>   
                </View>
                <View style = {theme.letsCodeButtonContainer}>
                    <Pressable style = {mainTheme.greenButton} onPress={moveToExercise}>
                        <Text style = {theme.letsCodeText}>Let&apos;s code!</Text>
                    </Pressable>
                </View> 
            </View>
            <PopUp
                visible={showPopup}
                message="Are you sure you want to end this lesson?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </View>
    );
};

export default LessonView;