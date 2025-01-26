import { Pressable, View, Text, ImageBackground } from "react-native";
import { useNavigate } from "react-router-native";
import theme from "../WelcomeViewTheme";

const WelcomeView = ({ user, onLogout }) => {
    const navigate = useNavigate();

    const onPressLessons = () => {
        navigate(`/users/${user.id}/lessons`);
    };

    const onPressLogout = () => {
        onLogout();
        navigate("/");
    };

    return (
        <View style={theme.blueContainer}>
            <ImageBackground source={require('../../assets/BackgroundBinary.png')} style={theme.backgroundImage}>
                <Text style={theme.titlePode}>{"<Pode/>"}</Text>
                <Pressable style={theme.button} onPress={onPressLogout}><Text>logout</Text></Pressable>
                <Pressable style={theme.button} onPress={onPressLessons}><Text>lessons</Text></Pressable>
            </ImageBackground>
        </View>
    );
};

export default WelcomeView;