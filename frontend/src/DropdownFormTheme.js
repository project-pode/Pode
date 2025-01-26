import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get('window');

const theme = {
    exerciseFont: {
        color: "rgba(187,144,214,1)",
        fontSize: 28,
        fontWeight: "bold",
        fontFamily: "AlfaSlabOne",
        padding: 10,
      },
};

export default theme;
