import { Platform } from "react-native";

const mainTheme = {
    fonts: {
        main: Platform.select({
          android: 'Roboto',
          ios: 'Arial',
          default: 'System'
        })
    },
    blueContainer: {  
      flexGrow: 1,
      flexShrink: 1,
      backgroundColor: "rgba(127,222,255,1)",
      justifyContent: "center",
    },
};

export default mainTheme;
