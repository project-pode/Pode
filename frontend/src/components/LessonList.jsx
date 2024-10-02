import { View, FlatList, Pressable } from "react-native";
import Text from "./Text";
import { useEffect, useState } from "react";
import lessonService from "../services/lessons";
import LessonView from "./LessonView";
import LessonItem from "./LessonItem";


const LessonList = () => {
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        const fetchLessons = async () => {
          const lessons = await lessonService.getAll();
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
          <LessonItem item={item}/>}/>
        </View>
      );
};
export default LessonList;