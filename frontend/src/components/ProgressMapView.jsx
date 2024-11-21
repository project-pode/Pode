import { View, ImageBackground, Pressable, Text, ScrollView, StyleSheet } from "react-native";
import theme from "../theme";
import { useEffect, useState } from "react";
import lessonService from "../services/lessons";
import { useNavigate } from "react-router-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // Icon names can be found here: https://oblador.github.io/react-native-vector-icons/#MaterialIcons

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  profileButton: {
    alignSelf: 'auto',
  },
  settingsButton: {
    alignSelf: 'auto',
  },
});


const ProgressMapView = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const lessons = await lessonService.getLessons(user.id);
        setLessons(lessons);
        console.log('Lessons fetched:', lessons); // Log the lessons
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };
    void fetchLessons();
  }, [user.id]);

  const handleLessonPress = (lesson) => {
    setSelectedLesson(lesson);
    console.log('Lesson selected', lesson);
  };

  const HandleStartPress = () => {
    if (selectedLesson) {
      navigate(`/users/${user.id}/lessons/${selectedLesson.id}`);
      console.log('Navigating to lesson: ', selectedLesson);
    }
  };

  // Works as temporary logout button until profile view is implemented
  const HandleProfilePress = () => {
    onLogout();
    navigate('/');
  };

  const HandleSettingsPress = () => {
    console.log('Settings button has been pressed');
  };

  return (
    <View style={theme.blueContainer}>
      <View style={styles.buttonsContainer}>
        <Pressable onPress={HandleSettingsPress}>
          <MaterialIcons style={styles.settingsButton} name="settings" size={40}></MaterialIcons>
        </Pressable>
        <Pressable onPress={HandleProfilePress}>
          <MaterialIcons style={styles.profileButton} name="account-circle" size={40}></MaterialIcons>
        </Pressable>
      </View>
      <ScrollView inverted>
        <View contentContainerStyle={theme.cloudContainer}>
          {lessons.map((lesson, index) => (
            <Pressable key={lesson.id} onPress={() => handleLessonPress(lesson)}>
              <ImageBackground
                source={selectedLesson?.id === lesson.id
                  ? require('../../assets/cloudSelected.png')
                  : require('../../assets/cloud.png')}
                style={[
                  theme.cloudImage,
                  index % 2 === 0 ? theme.cloudLeft : theme.cloudRight,
                  { justifyContent: 'center', alignItems: 'center' }
                ]}
              >
                <Text style={theme.cloudText}>{lesson.title}</Text>
              </ImageBackground>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <Pressable
        style={[
          selectedLesson ? theme.greenButton : theme.greenButtonDeselected
        ]}
        onPress={HandleStartPress}
        disabled={!selectedLesson}
      >
        <Text style={selectedLesson ? theme.greenButtonText : theme.greenButtonTextDeselected}>Start</Text>
      </Pressable>
    </View>
  );
};

export default ProgressMapView;