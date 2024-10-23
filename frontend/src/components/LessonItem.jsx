import { useNavigate } from "react-router-native";
import { Pressable, View, StyleSheet } from "react-native";
import Text from "./Text";
const LessonItem = ({ item, user }) => {
    const navigate = useNavigate();
    const onPress = () => {
        navigate(`/users/${user.id}/lessons/${item.id}`);
    };
    const styles = StyleSheet.create({
        container: {
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 5,
            padding: 10,
            alignSelf: 'center'
        }
    });

    return (
        <Pressable onPress={onPress}>
            <View style={styles.container}>
                <Text>{item.title}</Text>
            </View>
        </Pressable>
    );
};
export default LessonItem;