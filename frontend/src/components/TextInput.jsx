import { TextInput as NativeTextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
errorInput: {
    borderColor: "#d73a4a"
},
textinput: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 9,
    borderColor: "lightgrey",
    color: "grey"

},
});

const TextInput = ({style, error, ...props}) => {
    const textinputStyle = [
        styles.textinput,
        error && styles.errorInput, //if error, then change bordercolor to to errorinput
        style
    ];
    return <NativeTextInput style={textinputStyle} {...props} />;
};

export default TextInput;