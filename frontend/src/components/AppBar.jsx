import { View, StyleSheet, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

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


const AppBar = ({ user }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Temporary</Text>
            {user &&
                (
                    <Pressable>
                        <Link to="/home">
                            <Text style={styles.text}>Home</Text>
                        </Link>
                    </Pressable>
                )
            }
        </View>
    );
};

export default AppBar;