import { Theme } from "./themeTypes";

const theme: Theme = {
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
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Cousine",
  },
  pinkContainerBox: {
    marginHorizontal: 10,
    backgroundColor: "rgba(237,220,249,1)",
    borderColor: "rgba(187,144,214,1)",
    borderRadius: 48,
    borderWidth: 7,
    //alignContent: "left",
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
  boxExerciseBoxText: {
    color: "rgba(187,144,214,1)",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Cousine",
  },
  questionContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  questionText: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  blankText: {
    fontSize: 16,
    color: '#007bff',
  },
  boxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
};

export default theme;