import { Button, FlatList, Linking, Pressable, View } from "react-native";
import Text from "./Text";
import { useNavigate } from "react-router-native";
import theme from "../theme";

const UserList = ({ users, loggedInUser, onLogout }) => {
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

    const onPressLogout = () => {
        onLogout();
        navigate("/");
    };


    return (
        <View>
            <Text>Users:</Text>
            {users.map((user, index) => {
                return <Text key={index}> {user.username}</Text>;
            })}
            <Text>Conditional render depending on user</Text>
            {loggedInUser ?
                (
                    <Pressable style={theme.button} onPress={onPressLogout}><Text>logout</Text></Pressable>
                )
                : (
                    <>
                        <Pressable style={theme.button} onPress={onPressSignUp}><Text>Sign up</Text></Pressable>
                        <Pressable style={theme.button} onPress={onPress}><Text>login</Text></Pressable>
                    </>
                )
            }

        </View>
    );
};

export default UserList;