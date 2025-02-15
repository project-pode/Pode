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
    greenButton: { 
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
    greenButtonDeselected: {
      margin: 20,
      padding: 10,
      backgroundColor: "#C2D6C6",
      borderRadius: 33,
      borderWidth: 6,
      borderColor: "#A2B1A5",
    },
    greenButtonTextDeselected: {
      color: "#A2B1A5",
      fontSize: 45,
      textAlign: "center",
      fontFamily: "AlfaSlabOne",
    },
    titlePode: {
      color: "rgba(75,113,123,1)",
      fontSize: 70,
      textAlign: "center",
      paddingVertical: 10,
      fontFamily: "AlfaSlabOne",
    },
    inputField: {
      paddingVertical: 10,
      backgroundColor: "rgba(255,255,255,1)",
      borderColor: "rgba(100,152,166,1)",
      borderRadius: 10,
      borderWidth: 2,
      color: "rgba(100,152,166,1)",
      fontSize: 25,
    },
    errorText: {
      color: "#d73a4a",
      marginLeft: 10
    },
    arrowContainer: {
      height: 30,
      width: 30,
      margin: 10,
    },
    arrow: {
      fontSize: 30,
      color: "rgba(75,113,123,1)",
    },
    pinkContainer: {
      marginHorizontal: 18,
      backgroundColor: "rgba(237,220,249,1)",
      borderColor: "rgba(187,144,214,1)",
      borderRadius: 48,
      borderWidth: 7,
      alignContent: "center",
      padding: 10,
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    purpleButton: {
      margin: 20,
      padding: 10,
      backgroundColor: "rgba(187,144,214,1)",
      borderRadius: 33,
      borderWidth: 6,
      borderColor: "rgba(135,105,155,1)",
      color: "BB90D6",
    },
    purpleButtonText: {
      color: "rgba(135,105,155,1)",
      fontSize: 45,
      textAlign: "center",
      fontFamily: "AlfaSlabOne",
    },
    exerciseDescription: { 
      color: "rgba(75,113,123,1)",
      fontSize: 18,
      textAlign: "left",
      paddingVertical: 10,
      paddingHorizontal: 10,
      fontFamily: "AlfaSlabOne",
      lineHeight: 24,
    },
    exerciseFont: {
      color: "rgba(187,144,214,1)",
      fontSize: 28,
      fontWeight: "bold",
      fontFamily: "AlfaSlabOne",
      padding: 10,
    },
    boxExerciseBoxText: {
      color: "rgba(187,144,214,1)",
      fontSize: 16,
      textAlign: "center",
      fontFamily: "AlfaSlabOne",
    },
    
  };

export default mainTheme;
