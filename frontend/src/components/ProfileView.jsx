import { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useParams, useNavigate } from "react-router-native";
import userService from '../services/users';

const avatars = [
    { name: 'avatar1', source: require('../../assets/avatars/avatar1.png') },
    { name: 'avatar2', source: require('../../assets/avatars/avatar2.png') },
    { name: 'avatar3', source: require('../../assets/avatars/avatar3.jpg') },
    { name: 'avatar4', source: require('../../assets/avatars/avatar4.jpg') },
    { name: 'avatar5', source: require('../../assets/avatars/avatar5.jpg') }
];

const ProfileView = ({ onLogout }) => {
    const [user, setUser] = useState(null);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await userService.getOne(userId);
                setUser(fetchedUser);
                setSelectedAvatar(fetchedUser.avatar);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [userId]);

    const handleAvatarSelect = (avatar) => {
        setSelectedAvatar(avatar.name);
    };

    const handleUpdateAvatar = async () => {
        if (selectedAvatar) {
            try {
                await userService.updateAvatar(userId, selectedAvatar);
                setUser({ ...user, avatar: selectedAvatar }); // Update the user state with the new avatar
            } catch (error) {
                console.error('Failed to update avatar:', error);
                alert('Failed to update avatar');
            }
        } else {
            alert('Please select an avatar');
        }
    };

    const handleLogoutPress = () => {
        onLogout();
    };

    const handleBackPress = () => {
        navigate(`/users/${user.id}/lessons`);
    };

    const renderAvatar = (avatarName) => {
        const avatar = avatars.find(a => a.name === avatarName);
        return avatar ? <Image source={avatar.source} style={styles.profileImage} /> : null;
    };

    if (!user) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={handleBackPress} style={styles.logoutButton}><Text style={styles.logoutButtonText}>Go back</Text></Pressable>

            <Text style={styles.name}>{user.username}</Text>
            {renderAvatar(user.avatar)}

            <View style={styles.avatarContainer}>
                {avatars.map((avatar, index) => (
                    <Pressable key={index} onPress={() => handleAvatarSelect(avatar)}>
                        <Image
                            source={avatar.source}
                            style={[
                                styles.avatar,
                                selectedAvatar === avatar.name && styles.selectedAvatar
                            ]}
                        />
                    </Pressable>
                ))}
            </View>
            <Pressable onPress={handleUpdateAvatar} style={styles.logoutButton}><Text style={styles.logoutButtonText}>Update avatar</Text></Pressable>

            <Pressable style={styles.logoutButton} onPress={handleLogoutPress}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    logoutButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 16,
    },
    avatarContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    avatar: {
        width: 100,
        height: 100,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedAvatar: {
        borderColor: 'blue',
    },
});

export default ProfileView;