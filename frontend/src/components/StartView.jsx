import { Pressable, View, Text, ImageBackground } from "react-native";
import { useNavigate } from "react-router-native";
import { useEffect } from "react";
import theme from "../theme";
const background = "../assets/BackgroundBinary.png";

const StartView = ({user}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/home"); // Redirect to the home page if the user is logged in
        }
    }, [user, navigate]); 

    const onPress = () => {
        navigate("/login");
    };

    const onPressSignUp = () => {
        navigate("/signUp");
    };

    return (
        <View style={theme.blueContainer}>
            <ImageBackground source = {background} style = {theme.backgroundImage}>
            <Text style={theme.titlePode}>{"<Pode/>"}</Text>
                <Pressable style={theme.purpleButton} onPress={onPress}><Text style={theme.purpleButtonText}>Log In</Text></Pressable>
                <Pressable style={theme.purpleButton} onPress={onPressSignUp}><Text style={theme.purpleButtonText}>Register</Text></Pressable>
            </ImageBackground>
        </View>
    );
};

export default StartView;