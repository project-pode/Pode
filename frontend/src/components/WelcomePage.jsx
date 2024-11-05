import { Button, FlatList, Linking, Pressable, View, ImageBackground, StyleSheet } from "react-native";
import Text from "./Text";
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
    errorText: {
        color: "#d73a4a",
        marginLeft: 10
    },
    container2: {
        marginHorizontal: 18, 
        backgroundColor: "rgba(237,220,249,1)",
        borderColor: "rgba(187,144,214,1)",
        borderRadius: 48,
        borderWidth: 7,
        alignContent: "center",
        padding: 10,
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
    },
    pode: {
        color: "rgba(75,113,123,1)",
        fontSize: 80,
        textAlign: "center",
        paddingVertical: 50,
        
       
    },
    inputField: {
        paddingVertical: 10,
        backgroundColor: "rgba(255,255,255,1)",
        borderColor: "rgba(100,152,166,1)",
        borderRadius: 10,
        borderWidth: 2,
        color: "rgba(100,152,166,1)",
        fontSize: 25,

    },
    inputText: {

    },
    arrowContainer: {
        height: 30,
        width: 30,
        margin: 10,
    },
    backArrow: {
        fontSize: 30,
        color: "rgba(75,113,123,1)",
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },

});

const WelcomePage = ({ users, loggedInUser, onLogout }) => {
    const navigate = useNavigate();
    // Check if users is undefined or null, and render a message or return null
   /*  if (!users) {
        return (
            <View>
                <Text>
                    No users found
                </Text>
            </View>
        ); // Or any other message you want to display
    }
    */


    const onPress = () => {
        navigate("/login");
    };

    const onPressSignUp = () => {
        navigate("/users");
    };




    return (
        <View style={styles.container}>
            <ImageBackground source = {background} style = {styles.image}>
                
                    <Text style={styles.pode}> {"<Pode/>"}</Text>
                    {loggedInUser ?
                        (
                            //TODO: if user is logged in they should be routed to progressmap
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

export default WelcomePage;