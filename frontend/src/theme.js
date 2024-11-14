import { Platform } from "react-native";
const theme = {
    // General themes 


    // Themes used in SignUp, SignIn and WelcomeView

    blueContainer: {
      flexGrow: 1,
      flexShrink: 1,
      backgroundColor: "rgba(127,222,255,1)",
      justifyContent: "center",
    },
    errorText: {
        color: "#d73a4a",
        marginLeft: 10
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
    titlePode: {
        color: "rgba(75,113,123,1)",
        fontSize: 80,
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
    arrowContainer: {
        height: 30,
        width: 30,
        margin: 10,
    },
    arrow: {
        fontSize: 30,
        color: "rgba(75,113,123,1)",
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },


    //TODO: check if old themes are used anywhere
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6',
    },
    fontSizes: {
      body: 14,
      subheading: 16,
    },
    fonts: {
      main: Platform.select({
        android: 'Roboto',
        ios: 'Arial',
        default: 'System'
      })
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
    button: {
      backgroundColor: '#0366d6',
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 10,
      margin: 10,
      borderRadius: 6
    }
  };
  
  export default theme;