import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import theme from '../themes/TextInputTheme'

const TextInput = ({style, error, ...props}) => {
    const textinputStyle = [
        theme.textinput,
        error && theme.errorInput, //if error, then change bordercolor to to errorinput
        style
    ];
    return <NativeTextInput style={textinputStyle} {...props} />;
};

export default TextInput;