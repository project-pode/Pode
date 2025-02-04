import { View, ImageBackground, Pressable, Text, ScrollView, Image } from "react-native";
import theme from "../themes/ProgressMapViewTheme";
import { useEffect, useState } from "react";
import lessonService from "../services/lessons";
import { useNavigate, useParams } from "react-router-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import userService from "../services/users";

const avatars = [
  { name: 'avatar1', source: require('../../assets/avatars/avatar1.png') },
  { name: 'avatar2', source: require('../../assets/avatars/avatar2.png') },
  { name: 'avatar3', source: require('../../assets/avatars/avatar3.jpg') },
  { name: 'avatar4', source: require('../../assets/avatars/avatar4.jpg') },
  { name: 'avatar5', source: require('../../assets/avatars/avatar5.jpg') },
  { name: 'avatar6', source: require('../../assets/avatars/avatar6.jpg') },
];

const ProgressMapView = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const { userId } = useParams();
  const [setSelectedAvatar] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await userService.getOne(userId);
        setUser(fetchedUser);
        setSelectedAvatar(fetchedUser.avatar);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    if (!user) return; // Ensure user is loaded before fetching lessons

    const fetchLessons = async () => {
      try {
        const lessons = await lessonService.getLessons(userId);
        setLessons(lessons);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };

    const fetchCompletedLessons = async () => {
      try {
        const userData = await userService.getOne(userId);
        setCompletedLessons(userData.completedLessons || []);
      } catch (error) {
        console.error('Error fetching completed lessons:', error);
      }
    };

    fetchLessons();
    fetchCompletedLessons();
  }, [user]);

  const handleLessonPress = (lesson) => {
    setSelectedLesson(lesson);
  };

  const handleStartPress = () => {
    if (selectedLesson) {
      navigate(`/users/${userId}/lessons/${selectedLesson.id}`);
    }
  };

  const handleProfilePress = () => {
    navigate(`/users/${userId}/profile`);
  };

  const handleSettingsPress = () => {
    console.log('Settings button has been pressed');
  };

  const isLessonCompleted = (lessonId) => {
    return completedLessons.includes(lessonId);
  };

  const renderAvatar = (avatarName) => {
    const avatar = avatars.find(a => a.name === avatarName);
    return avatar ? <Image source={avatar.source} style={theme.profileImage} testID='avatar'/> : null;
  };

  // Show loading state before rendering
  if (loading || !user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={theme.blueContainer}>
      <View style={theme.buttonsContainer}>
        <Pressable onPress={handleSettingsPress}>
          <MaterialIcons style={theme.settingsButton} name="settings" size={40} />
        </Pressable>
        <Pressable onPress={handleProfilePress}>
          {renderAvatar(user.avatar)}
        </Pressable>
      </View>
      <ScrollView inverted>
        <View contentContainerStyle={theme.cloudContainer}>
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
        </View>
      </ScrollView>

      <Pressable
        style={[
          selectedLesson ? theme.greenButton : theme.greenButtonDeselected
        ]}
        onPress={handleStartPress}
        disabled={!selectedLesson}
      >
        <Text style={selectedLesson ? theme.greenButtonText : theme.greenButtonTextDeselected}>Start</Text>
      </Pressable>
    </View>
  );
};

export default ProgressMapView;