import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get('window');

const theme = {
  // General themes 


  // Themes used in SignUp, SignIn and WelcomeView

  blueContainer: {  // Theme used in: LessonView
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
  letsCodeText: {   // Theme used in: LessonView
    fontFamily: "AlfaSlabOne",
    color: "rgba(74,128,85,1)",
    textAlign: "center",
    fontSize: 28,
    padding: 10,
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
  /*greenButton: {    // Theme used in: LessonView
    padding: 20,
    backgroundColor: "rgba(132,220,149,1)",
    borderRadius: 33,
    borderWidth: 6,
    borderColor: "rgba(74,128,85,1)",
    margin: 5,
  }, */
  podeAndLetsCodeButtonContainer: {   // Theme used in: LessonView
    flexDirection: "row",
    justifyContent: "center",
    padding: 5,
  },
  letsCodeButtonContainer: {    // Theme used in: LessonView
    flexDirection: "column",
    justifyContent: "center",
  },


  podeIcon: {
    height: 200,
    width: 134,
    borderRadius: 98,
    marginHorizontal: 20,
  },
  podeContainer: {
    width: 134,
    height: 200,
    margin: 5,
  },

  // Progress Map View

  cloudContainer: {
    padding: 1,
    alignItems: 'center',
  },
  cloudImage: {
    width: width * 0.6,
    height: height * 0.15,
    resizeMode: 'cover',
    marginVertical: 1,
  },
  cloudLeft: {
    alignSelf: 'flex-start',
    marginLeft: width * 0.05,
  },
  cloudRight: {
    alignSelf: 'flex-end',
    marginRight: width * 0.05,
  },

  selectedCloud: {
    borderWidth: 2,
    borderColor: 'yellow'
  },

  cloudText: {
    color: "#BB90D6",
    fontSize: 20,
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

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  profileButton: {
    alignSelf: 'auto',
    padding: 10
  },
  settingsButton: {
    alignSelf: 'auto',
    padding: 10
  },

  greenButton: {    // Theme used in: LessonView
    margin: 20,
    padding: 10,
    backgroundColor: "#84DC95",
    borderRadius: 33,
    borderWidth: 6,
    borderColor: "#4A8055",
  },

  greenButtonTextDeselected: {
    color: "#A2B1A5",
    fontSize: 45,
    textAlign: "center",
    fontFamily: "AlfaSlabOne",
  },

  greenButtonText: {
    color: "#4A8055",
    fontSize: 45,
    textAlign: "center",
    fontFamily: "AlfaSlabOne",
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
  },
  pinkContainerSansBorder: {      // Theme used in: LessonView
    backgroundColor: "rgba(237,220,249,1)",
    borderRadius: 33,
    alignContent: "center",
    padding: 18,
    flex: 1,
  },
  whiteContainerWIP: {
    marginHorizontal: 18,
    backgroundColor: "rgba(237,220,249,1)",
    borderColor: "rgba(187,144,214,1)",
    borderRadius: 48,
    borderWidth: 7,
    alignContent: "center",
    padding: 10,
  },
  greenButtonInLessonOverview: {
    margin: 20,
    padding: 10,
    backgroundColor: "#84DC95",
    borderRadius: 33,
    borderWidth: 6,
    borderColor: "#4A8055",
  },
  whiteContainerInLessonOverview: {
    marginVertical: 20,
    marginHorizontal: 18,
    backgroundColor: "rgba(255,255,255,1)",
    borderColor: "rgba(75,113,123,1)",
    borderRadius: 48,
    borderWidth: 7,
    alignContent: "center",
    padding: 10,
    flex: 1,
  },
  pinkContainerInLessnOverview: {
    backgroundColor: "rgba(237,220,249,1)",
    borderColor: "rgba(187,144,214,1)",
    borderRadius: 48,
    borderWidth: 7,
    alignContent: "center",
    padding: 10,
    flex: 1,
  },
  exitButtonText: {
    fontFamily: "AlfaSlabOne",
    color: "rgba(74,128,85,1)",
    textAlign: "center",
    fontSize: 45,
    padding: 10,
  },
  overviewTitle: {
    color: "rgba(75,113,123,1)",
    fontSize: 30,
    textAlign: "center",
    paddingVertical: 30,
    fontFamily: "AlfaSlabOne",
    lineHeight: 24,
  },
  lessonOverviewDescription: {
    color: "rgba(75,113,123,1)",
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 10,
    fontFamily: "AlfaSlabOne",
    lineHeight: 24,
  },
  podeContainerInLessonView: {
    width: 134,
    height: 200,
    margin: 5,

  },
  pillBarFill: {
    height: '100%',
    borderRadius: 25, // Matches the parent for consistent pill shape
    backgroundColor: '#84DC95', // Fill color
  },
  pillBar: {
    borderWidth: 3,
    borderRadius: 25,
    height: 50,
    borderColor: 'rgba(75,113,123,1)',
    justifyContent: 'center',
    alignItems: 'flex-start', // Align the fill to start from the left
    overflow: 'hidden', // Ensure the fill stays within the pill container
    width: '100%',
    backgroundColor: 'white', // Optional: background color for the pill
  },
  exitButtonContainerInLessonView: {
    flexDirection: "column",
    justifyContent: "center",

  },
  emptySpaceFiller: {
    marginHorizontal: 50,
  },
  podeIconInLessonView: {
    height: 200,
    width: 134,
    borderRadius: 98,
    marginHorizontal: 20,
    transform: [{ rotate: '-75deg' }]
  },
  // themes for exercises

  whiteContainerExercises: {
    marginVertical: 18, 
    marginHorizontal: 18, 
    backgroundColor: "rgba(255,255,255,1)",
    borderColor: "rgba(75,113,123,1)",
    borderRadius: 48,
    borderWidth: 7,
    alignContent: "center",
    padding: 10,
    flex: 1,
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
  boxExerciseBox: {
    width: 80, 
    height: 40, 
    overflow: 'hidden', 
    margin: 20, 
    padding: 10,
    backgroundColor: "rgba(230,230,230,255)",
    borderRadius: 33,
    borderColor: "rgba(161,161,161,255)",
    borderWidth: 2
  },
  boxExerciseBoxText: {
    color: "rgba(187,144,214,1)",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "AlfaSlabOne",
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
  pinkContainerBox: {
    marginHorizontal: 10, 
    backgroundColor: "rgba(237,220,249,1)",
    borderColor: "rgba(187,144,214,1)",
    borderRadius: 48,
    borderWidth: 7,
    alignContent: "left",
    padding: 10,
  },
  pinkContainerInDropdownView: {
    marginHorizontal: 18, 
    marginVertical: 10, 
    backgroundColor: "rgba(237,220,249,1)",
    borderColor: "rgba(187,144,214,1)",
    borderRadius: 48,
    borderWidth: 7,
    alignContent: "center",
    padding: 10,
  },
  exerciseFont: {
    color: "rgba(187,144,214,1)",
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "AlfaSlabOne",
    padding: 10,
  },

};

export default theme;
