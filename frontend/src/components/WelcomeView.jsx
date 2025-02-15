import { Pressable, View, Text, ImageBackground } from "react-native";
import { useNavigate } from "react-router-native";
import theme from "../themes/WelcomeViewTheme";
import mainTheme from "../themes/MainTheme";


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
        <View style={mainTheme.blueContainer}>
            <ImageBackground source={require('../../assets/BackgroundBinary.png')} style={mainTheme.backgroundImage}>
                <Text style={mainTheme.titlePode}>{"<Pode/>"}</Text>
                <Pressable style={theme.button} onPress={onPressLogout}><Text>logout</Text></Pressable>
                <Pressable style={theme.button} onPress={onPressLessons}><Text>lessons</Text></Pressable>
            </ImageBackground>
        </View>
    );
};

export default WelcomeView;