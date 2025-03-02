import { useState, useEffect, useRef } from 'react';
import { View, Text, Image, Pressable, Modal, ScrollView, Animated } from 'react-native';
import { useParams, useNavigate } from "react-router-native";
import userService from '../services/users';
import theme from '../themes/ProfileViewTheme.js';
import LoadingView from './LoadingView.jsx';

const avatars = [
    { name: 'avatar1', source: require('../../assets/avatars/avatar1.png') },
    { name: 'avatar2', source: require('../../assets/avatars/avatar2.png') },
    { name: 'avatar3', source: require('../../assets/avatars/avatar3.png') },
    { name: 'avatar4', source: require('../../assets/avatars/avatar4.png') },
    { name: 'avatar5', source: require('../../assets/avatars/avatar5.png') },
    { name: 'avatar6', source: require('../../assets/avatars/avatar6.png') },
    { name: 'avatar7', source: require('../../assets/avatars/avatar7.png') },
    { name: 'avatar8', source: require('../../assets/avatars/avatar8.png') },
    { name: 'avatar9', source: require('../../assets/avatars/avatar9.png') },
    { name: 'avatar10', source: require('../../assets/avatars/avatar10.png') },
    { name: 'avatar11', source: require('../../assets/avatars/avatar11.png') },
    { name: 'avatar12', source: require('../../assets/avatars/avatar12.png') },
    { name: 'avatar13', source: require('../../assets/avatars/avatar13.png') },
    { name: 'avatar14', source: require('../../assets/avatars/avatar14.png') },
    { name: 'avatar15', source: require('../../assets/avatars/avatar15.png') },
  ];

/**
 * ProfileView component
 * 
 * This component renders the user's profile view, allowing them to view and change their avatar,
 * view achievements, and log out. It handles fetching user data, updating the avatar, and animations.
 * 
 * @param {Object} props - The component props
 * @param {function} props.onLogout - Function to call when the user logs out
 * 
 * @returns {JSX.Element} The rendered component
 */
const ProfileView = ({ onLogout }) => {
    const [user, setUser] = useState(null);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const { userId } = useParams();
    const navigate = useNavigate();

    // Animation ref
    const slideAnim = useRef(new Animated.Value(300)).current;

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
        // Start the slide animation
        Animated.timing(slideAnim, {
            toValue: 0, // Slide into view
            duration: 300, // Adjust speed if needed
            useNativeDriver: true,
        }).start();

        fetchUser();
    }, [userId]);

    /**
     * Handles avatar selection.
     * Updates the user's avatar and closes the modal.
     * 
     * @param {Object} avatar - The selected avatar object
     */
    const handleAvatarSelect = async (avatar) => {
        try {
            await userService.updateAvatar(userId, avatar.name);

            setSelectedAvatar(avatar.name);
            setUser({ ...user, avatar: avatar.name });

            setModalVisible(false);
        } catch (error) {
            console.error('Failed to update avatar:', error);
            alert('Failed to update avatar');
        }
    };

    /**
     * Handles the logout button press event.
     * Calls the onLogout function passed as a prop.
     */
    const handleLogoutPress = () => {
        onLogout();
    };

    /**
     * Handles the back button press event.
     * Navigates back to the progress map
     */
    const handleBackPress = () => {
        navigate(`/users/${user.id}/lessons`);
    };

    /**
     * Renders the user's avatar.
     * 
     * @param {string} avatarName - The name of the avatar to render
     * @returns {JSX.Element|null} The rendered avatar image or null if not found
     */
    const renderAvatar = (avatarName) => {
        const avatar = avatars.find(a => a.name === avatarName);
        return avatar ? <Image source={avatar.source} style={theme.profileImage} testID='avatar' /> : null;
    };

    if (!user) {
        return <LoadingView />;
    }

    return (
        <View style={theme.blueContainer}>
            <Animated.View style={[theme.whiteContainer, { transform: [{ translateX: slideAnim }] }]}>
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
            </Animated.View>

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
                            testID="modal-close-button"
                        >
                            <Text style={theme.closeButtonText}>X</Text>
                        </Pressable>

                        <ScrollView vertical={true} style={{ flex: 1 }}>
                            <View style={theme.avatarContainer}>
                                {avatars.map((avatar, index) => (
                                    <Pressable
                                        key={index}
                                        onPress={() => handleAvatarSelect(avatar)}
                                        testID={`avatar-${avatar.name}`}
                                    >
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