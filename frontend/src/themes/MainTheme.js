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
    greenButton: {    // Theme used in: LessonView
      margin: 20,
      padding: 10,
      backgroundColor: "#84DC95",
      borderRadius: 33,
      borderWidth: 6,
      borderColor: "#4A8055",
    },
    greenButtonText: {
      color: "#4A8055",
      fontSize: 45,
      textAlign: "center",
      fontFamily: "AlfaSlabOne",
    },
};

export default mainTheme;
