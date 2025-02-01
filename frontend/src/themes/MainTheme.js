import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get('window');

const mainTheme = {
    fonts: {
        main: Platform.select({
          android: 'Roboto',
          ios: 'Arial',
          default: 'System'
        })
    },
};

export default mainTheme;
