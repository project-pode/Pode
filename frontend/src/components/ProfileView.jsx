import { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, Modal, ScrollView } from 'react-native';
import { useParams, useNavigate } from "react-router-native";
import userService from '../services/users';
import theme from '../themes/ProfileViewTheme.js';

const avatars = [
    { name: 'avatar1', source: require('../../assets/avatars/avatar1.png') },
    { name: 'avatar2', source: require('../../assets/avatars/avatar2.png') },
    { name: 'avatar3', source: require('../../assets/avatars/avatar3.jpg') },
    { name: 'avatar4', source: require('../../assets/avatars/avatar4.jpg') },
    { name: 'avatar5', source: require('../../assets/avatars/avatar5.jpg') },
    { name: 'avatar6', source: require('../../assets/avatars/avatar6.jpg') },
];

const ProfileView = ({ onLogout }) => {
    const [user, setUser] = useState(null);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [modalVisible, setModalVisible] = useState(false); 
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

    const handleAvatarSelect = async (avatar) => {
        try {
            // Update avatar on the backend
            await userService.updateAvatar(userId, avatar.name);

            // Update state with the new avatar
            setSelectedAvatar(avatar.name);
            setUser({ ...user, avatar: avatar.name });

            // Close the modal
            setModalVisible(false);
        } catch (error) {
            console.error('Failed to update avatar:', error);
            alert('Failed to update avatar');
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
        return avatar ? <Image source={avatar.source} style={theme.profileImage} /> : null;
    };


    if (!user) {
        return <Text>Loading...</Text>;
    }


    return (
        <View style={theme.blueContainer}>
            <View style={theme.whiteContainer}>
                <Pressable onPress={handleBackPress} style={theme.arrowContainer}>
                    <Text style={theme.arrow}>{"<"}</Text>
                </Pressable>
                
                <View style={{ alignItems: 'center' }}>
                    {renderAvatar(user.avatar)}
                    <Text style={theme.name}>{user.username}</Text>
                </View>
                
                <Pressable style={theme.profileViewButton}>
                    <Text style={theme.profileViewButtonText}>Achievements</Text>
                </Pressable>
                
                <Pressable
                    onPress={() => setModalVisible(true)}
                    style={theme.profileViewButton}
                >
                    <Text style={theme.profileViewButtonText}>Change profile picture</Text>
                </Pressable>

                <Pressable style={theme.profileViewButton} onPress={handleLogoutPress}>
                    <Text style={theme.profileViewButtonText}>Log out</Text>
                </Pressable>
            </View>

            {/* Modal for avatar options */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)} 
            >
                <View style={theme.modalContainer}>
                    <View style={theme.modalContent}>
                    <Pressable
                        onPress={() => setModalVisible(false)}
                        style={theme.closeButtonContainer} 
                    >
                        <Text style={theme.closeButtonText}>X</Text>
                    </Pressable>

                        
                        <ScrollView vertical={true} style={{flex: 1}}>
                            <View style={theme.avatarContainer}>
                                {avatars.map((avatar, index) => (
                                    <Pressable key={index} onPress={() => handleAvatarSelect(avatar)}>
                                        <Image
                                            source={avatar.source}
                                            style={[
                                                theme.avatar,
                                                selectedAvatar === avatar.name && theme.selectedAvatar
                                            ]}
                                        />
                                    </Pressable>
                                ))}
                            </View>
                            </ScrollView>
                        
                    </View>
                </View>
            </Modal>
        </View>
    );
};


export default ProfileView;