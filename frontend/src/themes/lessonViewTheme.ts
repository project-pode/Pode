import { Theme } from "./themeTypes";

const LessonViewTheme: Theme = {
  backButton: {
    alignSelf: "flex-end", 
    color: "rgba(75,113,123,1)"
  },
  whiteContainer: {
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
  pinkContainerSansBorder: {
    backgroundColor: "rgba(237,220,249,1)",
    borderRadius: 33,
    alignContent: "center",
    padding: 18,
    flex: 1,
  },
  lessonTitle: {
    color: "rgba(75,113,123,1)",
    fontSize: 30,
    textAlign: "left",
    paddingVertical: 10,
    fontFamily: "AlfaSlabOne",
    lineHeight: 24,
  },
  lessonDescription: {
    color: "rgba(75,113,123,1)",
    fontSize: 18,
    textAlign: "left",
    paddingVertical: 10,
    fontFamily: "AlfaSlabOne",
    lineHeight: 24,
  },
  podeAndLetsCodeButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 5,
  },
  podeContainer: {
    width: 134,
    height: 200,
    margin: 5,
  },
  letsCodeButtonContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },

  letsCodeText: {
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