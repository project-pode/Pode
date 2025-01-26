import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get('window');

const theme = {
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
