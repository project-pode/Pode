import { Dimensions} from "react-native";

const { width, height } = Dimensions.get('window');

const theme = {
    blueContainer: {  // Theme used in: LessonView
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
      greenButton: {    // Theme used in: LessonView
        margin: 20,
        padding: 10,
        backgroundColor: "#84DC95",
        borderRadius: 33,
        borderWidth: 6,
        borderColor: "#4A8055",
      },
      greenButtonDeselected: {
        margin: 20,
        padding: 10,
        backgroundColor: "#C2D6C6",
        borderRadius: 33,
        borderWidth: 6,
        borderColor: "#A2B1A5",
      },
      greenButtonText: {
        color: "#4A8055",
        fontSize: 45,
        textAlign: "center",
        fontFamily: "AlfaSlabOne",
      },
      greenButtonTextDeselected: {
        color: "#A2B1A5",
        fontSize: 45,
        textAlign: "center",
        fontFamily: "AlfaSlabOne",
      },
    
};

export default theme;