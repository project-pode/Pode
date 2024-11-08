import {Pressable, View, Image, Text, ImageBackground, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import theme from "../theme";



const background = "../assets/BackgroundBinary.png"

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: "rgba(127,222,255,1)",
        justifyContent: "center",
    },
    button: {
        marginHorizontal: 50, 
        marginVertical: 20,
        padding: 10,
        backgroundColor: "rgba(187,144,214,1)",
        borderRadius: 33,
        borderWidth: 6,
        borderColor: "rgba(135,105,155,1)",
        color: "BB90D6",
    },
    buttonText: {
        color: "rgba(135,105,155,1)",
        fontSize: 45,
        textAlign: "center",
        fontFamily: "AlfaSlabOne"
    },
    pode: {
        fontFamily: "AlfaSlabOne",
        color: "rgba(75,113,123,1)",
        fontSize: 80,
        textAlign: "center",
        paddingVertical: 50,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },

});

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
        <View style={styles.container}>
            <ImageBackground source = {background} style = {styles.image}>
                
            <Text style={styles.pode}>{"<Pode/>"}</Text>
                    {loggedInUser ?
                        (
                            <>
                            <Pressable style={theme.button} onPress={onPressLogout}><Text>logout</Text></Pressable>
                            <Pressable style={theme.button} onPress={onPressLessons}><Text>lessons</Text></Pressable>
                            </>
                        )
                        : (
                            <>
                                <Pressable style={styles.button} onPress={onPress}><Text style = {styles.buttonText}>Log In</Text></Pressable>
                                <Pressable style={styles.button} onPress={onPressSignUp}><Text style = {styles.buttonText}>Register</Text></Pressable>
                            </>
                        )
                    }
                    
            </ImageBackground>
        </View>
    );
};

export default WelcomeView;