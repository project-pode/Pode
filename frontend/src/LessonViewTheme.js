import { Dimensions} from "react-native";

const {} = Dimensions.get('window');

const LessonViewTheme = {

    blueContainer: {  // Theme used in: LessonView
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: "rgba(127,222,255,1)",
        justifyContent: "center",
      },
      whiteContainer: {     // Theme used in: LessonView
        marginVertical: 0,
        marginHorizontal: 18,
        backgroundColor: "rgba(255,255,255,1)",
        borderColor: "rgba(75,113,123,1)",
        borderRadius: 48,
        borderWidth: 7,
        alignContent: "center",
        padding: 10,
        flex: 1,
      },
      pinkContainerSansBorder: {      // Theme used in: LessonView
        backgroundColor: "rgba(237,220,249,1)",
        borderRadius: 33,
        alignContent: "center",
        padding: 18,
        flex: 1,
      },
      lessonTitle: {    // Theme used in: LessonView
        color: "rgba(75,113,123,1)",
        fontSize: 30,
        textAlign: "left",
        paddingVertical: 10,
        fontFamily: "AlfaSlabOne",
        lineHeight: 24,
      },
      lessonDescription: {    // Theme used in: LessonView
        color: "rgba(75,113,123,1)",
        fontSize: 18,
        textAlign: "left",
        paddingVertical: 10,
        fontFamily: "AlfaSlabOne",
        lineHeight: 24,
      },
      podeAndLetsCodeButtonContainer: {   // Theme used in: LessonView
        flexDirection: "row",
        justifyContent: "center",
        padding: 5,
      },
      podeContainer: {
        width: 134,
        height: 200,
        margin: 5,
      },
      letsCodeButtonContainer: {    // Theme used in: LessonView
        flexDirection: "column",
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
      letsCodeText: {   // Theme used in: LessonView
        fontFamily: "AlfaSlabOne",
        color: "rgba(74,128,85,1)",
        textAlign: "center",
        fontSize: 28,
        padding: 10,
      },
      podeIcon: {
        height: 200,
        width: 134,
        borderRadius: 98,
        marginHorizontal: 20,
      },
};

export default LessonViewTheme;