import { Pressable, View, StyleSheet } from "react-native";
import Text from "./Text";
import { useNavigate } from "react-router-native";
const ExerciseItem = ({ item }) => {
    const navigate = useNavigate();
    const onPress = () => {
        navigate(`/lessons/${item.lesson}/exercises/${item.id}`);
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
export default ExerciseItem;