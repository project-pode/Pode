import { ImageStyle, TextStyle, ViewStyle } from "react-native";

export interface Theme {
    [key:string]: ViewStyle | TextStyle | ImageStyle;
}