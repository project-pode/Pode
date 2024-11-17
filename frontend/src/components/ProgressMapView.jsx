import { View, ImageBackground, Pressable, Text, ScrollView, StyleSheet } from "react-native";
import theme from "../theme";
import { useEffect, useState } from "react";
import lessonService from "../services/lessons";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  
  button: {
    alignSelf: 'flex-end',
      marginHorizontal: 12, 
      marginVertical: 12,
      padding: 10,
      backgroundColor: "lightblue",
  },
  buttonText: {
      color: "black",
      fontSize: 15,
      textAlign: "center",
      fontFamily: "AlfaSlabOne"
  }
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

  const HandleLogoutPress = () => {
    onLogout();
    navigate('/');
  };
  
  return (
    <View style={theme.blueContainer}>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText} onPress={HandleLogoutPress}>logout</Text>
      </Pressable>
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