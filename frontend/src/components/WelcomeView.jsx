import {Pressable, View, Image, Text, ImageBackground, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import theme from "../theme";

const background = "../assets/BackgroundBinary.png"

const WelcomeView = ({ users, loggedInUser, onLogout }) => {
    const navigate = useNavigate();
    // Check if users is undefined or null, and render a message or return null
    if (!users) {
        return (
            <View>
                <Text>
                    No users found
                </Text>
            </View>
        ); // Or any other message you want to display
    }


    const onPress = () => {
        navigate("/login");
    };

    const onPressSignUp = () => {
        navigate("/users");
    };

    const onPressLessons = () => {
        navigate("/users/lessons");
    };

    const onPressLogout = () => {
        onLogout();
        navigate("/");
    };


    return (
        <View style={theme.blueContainer}>
            <ImageBackground source = {background} style = {theme.backgroundImage}>
                
            <Text style={theme.titlePode}>{"<Pode/>"}</Text>
                    {loggedInUser ?
                        (
                            <>
                            <Pressable style={theme.button} onPress={onPressLogout}><Text>logout</Text></Pressable>
                            <Pressable style={theme.button} onPress={onPressLessons}><Text>lessons</Text></Pressable>
                            </>
                        )
                        : (
                            <>
                                <Pressable style={theme.purpleButton} onPress={onPress}><Text style = {theme.purpleButtonText}>Log In</Text></Pressable>
                                <Pressable style={theme.purpleButton} onPress={onPressSignUp}><Text style = {theme.purpleButtonText}>Register</Text></Pressable>
                            </>
                        )
                    } 
                    
            </ImageBackground>
        </View>
    );
};

export default WelcomeView;