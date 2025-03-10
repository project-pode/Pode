import { Theme } from "./themeTypes";

const theme: Theme = {

  whiteContainerExercises: {
    marginVertical: 18,
    marginHorizontal: 18,
    backgroundColor: "rgba(255,255,255,1)",
    borderColor: "rgba(75,113,123,1)",
    borderRadius: 48,
    borderWidth: 7,
    alignContent: "center",
    padding: 10,
    flexGrow: 1,
    flexShrink: 1,
  },
  exerciseTitle: {
    color: "rgba(75,113,123,1)",
    fontSize: 18,
    textAlign: "left",
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontFamily: "AlfaSlabOne",
    lineHeight: 24,
  },

  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  feedback: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 15,
    alignSelf: "center",
    color: 'red',
  },
  backButton: {
    alignSelf: "flex-end",
    color: "rgba(75,113,123,1)"
  }

};

export default theme;