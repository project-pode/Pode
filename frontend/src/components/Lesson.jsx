import { View, StyleSheet } from "react-native";
import Text from "./Text";

const Lesson = ({item}) => {
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
        <View style={styles.container}>
            <Text>{item.title}</Text>
        </View>
    );
};
export default Lesson;