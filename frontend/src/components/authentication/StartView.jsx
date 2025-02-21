import { Pressable, View, Text, ImageBackground } from "react-native";
import { useNavigate } from "react-router-native";
import { useEffect } from "react";
import theme from "../../themes/StartViewTheme";

/**
 * StartView component
 * 
 * This component renders the start view of the application, providing options to log in or register.
 * If the user is already logged in, it redirects to the progress map.
 * 
 * @param {Object} props - The component props
 * @param {Object} props.user - The current user object
 * 
 * @returns {JSX.Element} The rendered component
 */
const StartView = ({ user }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate(`/users/${user.id}/lessons`); // Redirect to the home page (progress map) if the user is logged in
        }
    }, [user, navigate]); 

    /**
     * Handles the press event for the log in button.
     * Navigates to the login page.
     */
    const onPress = () => {
        navigate("/login");
    };

    /**
     * Handles the press event for the sign up button.
     * Navigates to the sign up page.
     */
    const onPressSignUp = () => {
        navigate("/signUp");
    };

    return (
        <View style={theme.blueContainer}>
            <ImageBackground source={require('../../../assets/BackgroundBinary.png')} style={theme.backgroundImage}>
                <Text style={theme.titlePode}>{"<Pode/>"}</Text>
                <Pressable style={theme.purpleButton} onPress={onPress}>
                    <Text style={theme.purpleButtonText}>Log In</Text>
                </Pressable>
                <Pressable style={theme.purpleButton} onPress={onPressSignUp}>
                    <Text style={theme.purpleButtonText}>Register</Text>
                </Pressable>
            </ImageBackground>
        </View>
    );
};

export default StartView;