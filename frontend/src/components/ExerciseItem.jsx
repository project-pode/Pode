import { Pressable, View, StyleSheet } from "react-native";
import Text from "./Text";
import { useNavigate } from "react-router-native";
const ExerciseItem = ({ item, userId, isCompleted }) => {
    const navigate = useNavigate();
    const onPress = () => {
        navigate(`/users/${userId}/lessons/${item.lesson}/exercises/${item.id}`);
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
                <Text>{item.title} {isCompleted && <Text>COMPLETED!!!!!</Text>}</Text>
            </View>
        </Pressable>
    );
};
export default ExerciseItem;