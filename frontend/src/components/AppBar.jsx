import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#24292e",
        paddingBottom: 5,
        paddingLeft: 5
        // ...
    },
    text: {
        color: "white",
        padding: 5
    },
    tabContainer: {
        flexDirection: "row",
    }
    // ...
});


const AppBar = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Temporary</Text>
        </View>
    );
};

export default AppBar;