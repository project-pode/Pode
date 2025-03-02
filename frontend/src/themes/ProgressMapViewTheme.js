import { Dimensions} from "react-native";

const { width, height } = Dimensions.get('window');

const theme = {

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


    
    blueContainer: {  
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: "rgba(127,222,255,1)",
        justifyContent: "center",
    },
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
      greenButton: {    
        margin: 10,
        padding: 10,
        backgroundColor: "#84DC95",
        borderRadius: 33,
        borderWidth: 6,
        borderColor: "#4A8055",
        zIndex: 11, 
      },
      greenButtonDeselected: {
        margin: 10,
        padding: 10,
        backgroundColor: "#C2D6C6",
        borderRadius: 33,
        borderWidth: 6,
        borderColor: "#A2B1A5",
        zIndex: 11,  

      },
      greenButtonText: {
        color: "#4A8055",
        fontSize: 45,
        textAlign: "center",
        fontFamily: "AlfaSlabOne",
        zIndex: 12,  

      },
      greenButtonTextDeselected: {
        color: "#A2B1A5",
        fontSize: 45,
        textAlign: "center",
        fontFamily: "AlfaSlabOne",
        zIndex: 12, 

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
      paddingHorizontal: 20, 
      position: 'absolute',
      top: 0,  
      height: '75%', 
    },
    profileButton: {
      alignSelf: 'auto',
      padding: 30
    },
    settingsButton: {
      alignSelf: 'auto',
      padding: 30
    },
    
};

export default theme;