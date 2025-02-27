import { Dimensions} from "react-native";

const { width, height } = Dimensions.get('window');

const theme = {
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
        borderWidth: 5,
        borderColor: 'rgba(75,113,123,1)',
        alignSelf: 'auto',
        padding: 10
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
    
};

export default theme;