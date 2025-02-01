import { Platform } from "react-native";

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
