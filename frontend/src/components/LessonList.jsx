import { View, FlatList } from "react-native";
import Text from "./Text";
import { useEffect, useState } from "react";
import lessonService from "../services/lessons";
import LessonItem from "./LessonItem";


const LessonList = ({user}) => {
    const [lessons, setLessons] = useState([]);
    
    useEffect(() => {
        const fetchLessons = async () => {
          const lessons = await lessonService.getLessons(user.id);
          setLessons(lessons);
    
        };
        void fetchLessons();
      }, []);
      if (lessons.length===0) {
        return (
            <View>
                <Text>
                    No lessons found
                </Text>
            </View>
        ); // Or any other message you want to display
    }

      return (
        <View>
           <FlatList data={lessons}
          renderItem={({item})=> 
          <LessonItem item={item} user={user}/>}/>
        </View>
      );
};
export default LessonList;