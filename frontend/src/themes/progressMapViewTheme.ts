import { Dimensions } from "react-native";
import { Theme } from "./themeTypes";

const { width, height } = Dimensions.get('window');

const theme: Theme = {
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
    marginLeft: width * 0.35,
  },
  cloudRight: {
    alignSelf: 'flex-end',
    marginRight: width * 0.35,
  },
  cloudText: {
    color: "#BB90D6",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "AlfaSlabOne",
  },


  profileImage: {
    width: 45,
    height: 45,
    marginHorizontal: 15,
    marginVertical: 18,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 4,
    backgroundColor: "white",
    borderColor: 'rgba(75,113,123,1)',
    alignSelf: 'auto',
    padding: 10
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    position: 'absolute',
    top: 0,
    height: '10%',
    zIndex: 500
  },
  profileButton: {
    alignSelf: 'auto',
    padding: 30,
  },

  settingsButton: {
    alignSelf: 'auto',
    padding: 30,
    color: 'rgba(75,113,123,1)'
  },

  topBorder: {
    position: 'absolute',
    top: -100,
    left: 0,
    width: '100%',
    height: '48%',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
    pointerEvents: 'none'
  },

  bottomBorder: {
    transform: [{ rotate: '-180deg' }],
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '50%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    pointerEvents: 'none'
  },

};

export default theme;