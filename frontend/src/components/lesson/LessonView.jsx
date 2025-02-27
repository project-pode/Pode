import { View, Pressable, Text, Image, ScrollView, Animated } from "react-native";
import { useNavigate, useParams } from "react-router-native";
import { useEffect, useState, useRef } from "react";
import lessonService from "../../services/lessons";
import theme from "../../themes/LessonViewTheme";
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // Icon names can be found here: https://oblador.github.io/react-native-vector-icons/#MaterialIcons
import PopUp from "../PopUp";
import LoadingView from "../LoadingView";
import mainTheme from "../../themes/MainTheme";

/**
 * LessonView component
 * 
 * This component renders the details of a lesson, including its title and description.
 * It handles fetching lesson data, navigating to the first exercise, and popup functions when cancelling lesson
 * 
 * @returns {JSX.Element} The rendered component
 */
const LessonView = () => {
    const [lesson, setLesson] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const { userId, lessonId } = useParams();
    const navigate = useNavigate();

    // Animation ref
    const slideAnim = useRef(new Animated.Value(-500)).current; // Start above the screen

    /**
     * Handles the back button press event.
     * Shows a popup to confirm if the user wants to leave the lesson.
     */
    const handleBackPress = () => {
        setShowPopup(true);
    };

    /**
     * Handles the confirmation to leave the lesson.
     * Navigates back to the progress map
     */
    const handleConfirm = () => {
        setShowPopup(false);
        navigate(`/users/${userId}/lessons`);
    };

    /**
     * Handles the cancellation of leaving the lesson.
     * Hides the confirmation popup.
     */
    const handleCancel = () => {
        setShowPopup(false);
    };

    /**
     * Navigates to the first exercise of the lesson.
     * If no exercises are found, logs an error.
     */
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

        // Start the slide animation
        Animated.timing(slideAnim, {
            toValue: 0, // Slide down into view
            duration: 500, // Adjust speed if needed
            useNativeDriver: true,
        }).start();

        void fetchLesson();
    }, [userId, lessonId]);

    if (!lesson) {
        return (
            <LoadingView/>
        ); 
    }

    return (
        <View style={mainTheme.blueContainer}>
            <Pressable style={{ alignSelf: "flex-end", color: "rgba(75,113,123,1)" }} onPress={handleBackPress}>
                <MaterialIcons name="close" size={40} color="rgb(69, 100, 108)"></MaterialIcons>
            </Pressable>
            {/* Animated content that slides down */}
            <Animated.View style={[theme.whiteContainer, { transform: [{ translateY: slideAnim }] }]}>
                <View style={theme.pinkContainerSansBorder}>
                    <Text style={theme.lessonTitle}>{lesson.title}</Text>
                    <ScrollView>
                        <Text style={theme.lessonDescription}>{lesson.description}</Text>
                    </ScrollView>
                </View>
            </Animated.View>
            <View style={theme.podeAndLetsCodeButtonContainer}>
                <View style={theme.podeContainer}>
                    <Image source={require("../../../assets/placeHolderPode.png")} style={theme.podeIcon} />
                </View>
                <View style={theme.letsCodeButtonContainer}>
                    <Pressable style={mainTheme.greenButton} onPress={moveToExercise}>
                        <Text style={theme.letsCodeText}>Let&apos;s code!</Text>
                    </Pressable>
                </View>
            </View>
            <PopUp
                type="confirmation"
                visible={showPopup}
                message="Are you sure you want to end this lesson?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </View>
    );
};

export default LessonView;