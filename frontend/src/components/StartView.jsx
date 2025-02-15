import { Pressable, View, Text, ImageBackground } from "react-native";
import { useNavigate } from "react-router-native";
import { useEffect } from "react";
import mainTheme from "../themes/MainTheme";


const StartView = ({user}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate(`/users/${user.id}/lessons`); // Redirect to the home page if the user is logged in
        }
    }, [user, navigate]); 

    const onPress = () => {
        navigate("/login");
    };

    const onPressSignUp = () => {
        navigate("/signUp");
    };

    return (
        <View style={mainTheme.blueContainer}>
            <ImageBackground source = {require('../../assets/BackgroundBinary.png')} style = {mainTheme.backgroundImage}>
            <Text style={mainTheme.titlePode}>{"<Pode/>"}</Text>
                <Pressable style={mainTheme.purpleButton} onPress={onPress}><Text style={mainTheme.purpleButtonText}>Log In</Text></Pressable>
                <Pressable style={mainTheme.purpleButton} onPress={onPressSignUp}><Text style={mainTheme.purpleButtonText}>Register</Text></Pressable>
            </ImageBackground>
        </View>
    );
};

export default StartView;