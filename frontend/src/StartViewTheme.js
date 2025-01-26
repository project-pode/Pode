import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get('window');

const theme = {
    blueContainer: {  // Theme used in: LessonView
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: "rgba(127,222,255,1)",
        justifyContent: "center",
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
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
      },
      purpleButtonText: {
        color: "rgba(135,105,155,1)",
        fontSize: 45,
        textAlign: "center",
        fontFamily: "AlfaSlabOne",
      },
};

export default theme;