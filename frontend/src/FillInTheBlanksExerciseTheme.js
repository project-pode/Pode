import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get('window');

const theme = {
    blankBox: {
        backgroundColor: 'rgba(161,161,161,255)',
        borderRadius: 20,
        padding: 12,
        margin: 5,
        minWidth: 50,
        alignItems: 'center',
        justifyContent: 'center',
      },
      blankBoxText: {
        color: 'rgba(161,161,161,255)',
        fontSize: 16,
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
      pinkContainerBox: {
        marginHorizontal: 10, 
        backgroundColor: "rgba(237,220,249,1)",
        borderColor: "rgba(187,144,214,1)",
        borderRadius: 48,
        borderWidth: 7,
        alignContent: "left",
        padding: 10,
      },
      notBlankBox: {
        backgroundColor: "rgba(230,230,230,255)",
        borderRadius: 20,
        padding: 12,
        margin: 5,
        minWidth: 50,
        alignItems: 'center',
        justifyContent: 'center',
      },
      notBlankBox: {
        backgroundColor: "rgba(230,230,230,255)",
        borderRadius: 20,
        padding: 12,
        margin: 5,
        minWidth: 50,
        alignItems: 'center',
        justifyContent: 'center',
      },
      boxExerciseBoxText: {
        color: "rgba(187,144,214,1)",
        fontSize: 16,
        textAlign: "center",
        fontFamily: "AlfaSlabOne",
      },
};

export default theme;