import { TextInput as NativeTextInput } from "react-native";
import theme from "../themes/textInputTheme";

interface TextInputProps {
    style: any;
    error?: string;
    placeholder: string;
    secureTextEntry?: boolean;
    value: string;
    // eslint-disable-next-line no-unused-vars
    onChangeText: (text: string) => void;
}

const TextInput = ({style, error, ...props}: TextInputProps) => {
    const textinputStyle = [
        theme.textinput,
        error && theme.errorInput, //if error, then change bordercolor to to errorinput
        style
    ];
    return <NativeTextInput style={textinputStyle} {...props} />;
};

export default TextInput;