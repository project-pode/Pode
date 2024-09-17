import { FlatList, View } from "react-native";
import Text from "./Text";
const UserList = ({ users }) => {
    // Check if users is undefined or null, and render a message or return null
    if (!users) {
        return (
            <View>
                <Text>
                    No users found
                </Text>
            </View>
        ) // Or any other message you want to display
    }

    const UserView = ({ user }) => {
        return (
            <View>
                <Text>{user.id}</Text>
            </View>
        )
    }


    return (
        <View>
            <Text>test</Text>
            {users.map((user, index) => {
                return <Text key={index}> {user.username}</Text>
            })}
        </View>
    );
};

export default UserList;