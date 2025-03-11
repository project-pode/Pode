import { Theme } from "./themeTypes";

const mainTheme : Theme = {
    
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
      zIndex: 20,  

    },
    greenButtonText: {
      color: "#4A8055",
      fontSize: 45,
      textAlign: "center",
      fontFamily: "AlfaSlabOne",
      zIndex: 25,  

    },
    greenButtonDeselected: {
      margin: 20,
      padding: 10,
      backgroundColor: "#C2D6C6",
      borderRadius: 33,
      borderWidth: 6,
      borderColor: "#A2B1A5",
      zIndex: 20,  

    },    
    greenButtonTextDeselected: {
      color: "#A2B1A5",
      fontSize: 45,
      textAlign: "center",
      fontFamily: "AlfaSlabOne",
      zIndex: 25,  

    },
    titlePode: {
      color: "rgba(75,113,123,1)",
      fontSize: 70,
      textAlign: "center",
      paddingVertical: 10,
      fontFamily: "AlfaSlabOne",
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
      fontWeight: "bold",
      fontFamily: "Cousine",
      lineHeight: 24,
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
};

export default mainTheme;
