import { View, Pressable, Text } from 'react-native';
import { Link } from 'react-router-native';
import theme from '../themes/AppBarTheme';

const AppBar = ({ user }) => {
    return (
        <View style={theme.container}>
            <Text style={theme.text}>Temporary</Text>
            {user &&
                (
                    <Pressable>
                        <Link to="/home">
                            <Text style={theme.text}>Home</Text>
                        </Link>
                    </Pressable>
                )
            }
        </View>
    );
};

export default AppBar;