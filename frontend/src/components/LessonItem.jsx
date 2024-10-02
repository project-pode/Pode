import {useNavigate} from "react-router-native";
import LessonView from "./LessonView";
import Lesson from "./Lesson";
import { Pressable, View } from "react-native";
const LessonItem = ({item}) => {
    const navigate = useNavigate();
    const onPress = () => {
        navigate(`/lessons/${item.id}`);
    };
    return (
        <Pressable onPress={onPress}>
            <View>
               <Lesson item={item}/> 
            </View>
        </Pressable>
    );
};
export default LessonItem;