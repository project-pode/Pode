import { View, ImageBackground, Pressable, Text, Image, Animated, ImageStyle } from "react-native";
import theme from "../themes/progressMapViewTheme";
import { useEffect, useState, useRef } from "react";
import lessonService from "../services/lessons";
import { useNavigate, useLocation } from "react-router-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import userService from "../services/users";
import LoadingView from "./LoadingView";
import PopUp from "./PopUp";
import queryString from "query-string";
import mainTheme from "../themes/mainTheme";
import useAuthStorage from "../hooks/useAuthStorage";
import { Lesson, User } from "../types";
import AuthStorage from "../utils/authStorage";
import demoData from '../demo/demoData.json';

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
 * ProgressMapView component
 * 
 * This component renders the progress map view, showing the user's lessons and their completion status.
 * It handles fetching lessons and user data, navigating to lessons, profile and settings.
 * 
 * @returns {JSX.Element} The rendered component
 */
const ProgressMapView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]); // completed lesson-ids array
  const [selectedLesson, setSelectedLesson] = useState<Lesson|null>(null);
  const authStorage: AuthStorage = useAuthStorage();
  const [avatar, setSelectedAvatar] = useState<string|null>(null);
  const [user, setUser] = useState<User|null>(null);
  const [loading, setLoading] = useState(true); // Track loading state

  // Animation ref
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storageUser = await authStorage.getUser();
        if (storageUser) {
          const fetchedUser = await userService.getOne(storageUser.id);
          setUser(fetchedUser);
          setSelectedAvatar(fetchedUser.avatar);
          setCompletedLessons(fetchedUser.completedLessons || []);
        }
        else { // If no user is found in storage, use demo data
          const demoUser: User = demoData.users[0];
          setUser(demoUser);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchLessons = async () => {
      try {
        const lessons = await lessonService.getLessons();
        lessons.reverse(); // Reverse the order of lessons
        setLessons(lessons);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };

    fetchLessons();
    fetchUser();

    // Start the slide animation
    Animated.timing(slideAnim, {
      toValue: 0, // Slide into view
      duration: 300, // Adjust speed if needed
      useNativeDriver: true,
    }).start();
    
    // Parse query parameters
    const queryParams = queryString.parse(location.search);
    if (queryParams.showPopUp === 'true') {
      console.log('Setting showPopUp to true');
      setShowPopUp(true);
    } else {
      console.log('showPopUp is not set in query parameters');
    }
  }, [location.search]);

  /**
   * Handles lesson press event.
   * Sets the selected lesson.
   * 
   * @param {Object} lesson - The selected lesson object
   */
  const handleLessonPress = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  /**
   * Handles start button press event.
   * Navigates to the selected lesson.
   */
  const handleStartPress = () => {
    if (selectedLesson) {
      navigate(`/lessons/${selectedLesson.id}`);
    }
  };

  /**
   * Handles profile button press event.
   * Navigates to the user's profile.
   */
  const handleProfilePress = () => {
    if (user) {
      navigate(`/users/${user.id}/profile`);
    }
  };

  /**
   * Handles settings button press event.
   * Shows the settings popup.
   */
  const handleSettingsPress = () => {
    console.log('Settings button has been pressed');
    setShowPopUp(true);
  };

  /**
   * Handles popup confirm button press event.
   * Hides the popup.
   */
  const handlePopUpConfirm = () => {
    setShowPopUp(false);
  };

  /**
   * Checks if a lesson is completed.
   * 
   * @param {string} lessonId - The ID of the lesson to check
   * @returns {boolean} True if the lesson is completed, false otherwise
   */
  const isLessonCompleted = (lessonId:string) => {
    return completedLessons.includes(lessonId);
  };

  /**
   * Renders the user's avatar.
   * 
   * @param {string} avatarName - The name of the avatar to render
   * @returns {JSX.Element|null} The rendered avatar image or null if not found
   */
  const renderAvatar = (avatarName: string) => {
    const avatar = avatars.find(a => a.name === avatarName);
    return avatar ? <Image source={avatar.source} style={theme.profileImage as ImageStyle} testID='avatar' />
      : <MaterialIcons style={theme.profileButton} name="account-circle" size={40}></MaterialIcons>;
  };

  // Show loading state before rendering
  if (loading || !user) {
    return <LoadingView />;
  }

  const welcomeMessage = `
    Welcome to Pode! This is a guide to help you navigate through the various features and functionalities available in this app.
    Here you can track your progress through completed lessons, and access new exercises. Make sure to explore all the options and customize your experience.
    If you have any questions or need further assistance, feel free to reach out to our support team. Enjoy your learning journey!
  `;

  return (
    
    <View style={mainTheme.blueContainer}>
      <ImageBackground source={require('../../assets/border.png')} style={theme.topBorder}/>
    
      <Animated.View style={[theme.buttonsContainer, { transform: [{ translateX: slideAnim }] }]}>
          <Pressable onPress={handleSettingsPress} testID='settings-button'>
            <MaterialIcons style={theme.settingsButton} name="info" size={40} />
          </Pressable>
          <Pressable onPress={handleProfilePress}>
            {renderAvatar(avatar!)}
          </Pressable>
      </Animated.View>

      <Animated.ScrollView contentContainerStyle={theme.cloudContainer} style={[ { transform: [{ translateX: slideAnim }] }]}>
          {lessons.map((lesson, index) => (
            <Pressable key={lesson.id} onPress={() => handleLessonPress(lesson)}>
              <ImageBackground
                source={
                  isLessonCompleted(lesson.id) && selectedLesson?.id === lesson.id
                    ? require('../../assets/cloudCompletedSelected.png')
                    : isLessonCompleted(lesson.id)
                      ? require('../../assets/cloudCompleted.png')
                      : selectedLesson?.id === lesson.id
                        ? require('../../assets/cloudSelected.png')
                        : require('../../assets/cloud.png')
                }
                style={[
                  theme.cloudImage,
                  index % 2 === 0 ? theme.cloudLeft : theme.cloudRight,
                  { justifyContent: 'center', alignItems: 'center' }
                ]}
              >
                <Text style={theme.cloudText}>
                  {lesson.title}
                </Text>
              </ImageBackground>
            </Pressable>
          ))}
      </Animated.ScrollView>

      <Pressable
        style={[
          selectedLesson ? mainTheme.greenButton : mainTheme.greenButtonDeselected
        ]}
        onPress={handleStartPress}
        disabled={!selectedLesson}
      >
          <Text style={selectedLesson ? mainTheme.greenButtonText : mainTheme.greenButtonTextDeselected}>Start</Text>
      </Pressable>
      <PopUp
        type="confirmation"
        visible={showPopUp}
        message={welcomeMessage}
        onConfirm={handlePopUpConfirm}
        confirmText="Continue"
      />

      <ImageBackground source={require('../../assets/border.png')} style={theme.bottomBorder} />

    </View>
  );
};

export default ProgressMapView;