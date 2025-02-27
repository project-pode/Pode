import { View, Pressable, ImageBackground, Text } from "react-native";
import { useState } from "react";
import { Link } from 'react-router-native';
import TextInput from "../TextInput";
import { useFormik } from 'formik';
import theme from "../../themes/signInAndSingUpTheme";
import mainTheme from "../../themes/mainTheme";
import * as yup from "yup";

const initialValues = {
    username: '',
    password: '',
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .required('Password is required'),
});

/**
 * SignIn component
 * 
 * This component renders the sign-in view, allowing users to log in by providing a username and password.
 * It handles form validation, submission, and error handling.
 * 
 * @param {function} props.onSignIn - Function to call when the user submits the sign-in form
 * 
 * @returns {JSX.Element} The rendered component
 */
const SignIn = ({ onSignIn }) => {
    const [errorMessage, setErrorMessage] = useState(null);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async () => {
            if (!formik.isValid) {
                console.log("not valid");
                return;
            }
            try {
                const error = await onSignIn(formik.values.username.toLowerCase(), formik.values.password);
                if (error) {
                    setErrorMessage(error); // Set error message from Main.jsx
                } else {
                    setErrorMessage(null); // Clear any previous error if successful
                }
            } catch (error) {
                console.error("An unexpected error occurred:", error);
                setErrorMessage("An unexpected error occurred."); // Generic fallback message
            }
        },
    });

    return (
        <View style={mainTheme.blueContainer}>
            <ImageBackground source={require('../../../assets/BackgroundBinary.png')} style={mainTheme.backgroundImage}>
                <View style={theme.pinkContainer}>
                    <View style={theme.arrowContainer}>
                        <Pressable>
                            <Link to="/">
                                <Text style={theme.arrow}>{"<"}</Text>
                            </Link>
                        </Pressable>
                    </View>

                    <Text style={mainTheme.titlePode}>{"<Pode/>"}</Text>

                    {errorMessage && (
                        <Text style={theme.errorText}>{errorMessage}</Text>
                    )}

                    <TextInput
                        style={theme.inputField}
                        error={formik.errors.username}
                        placeholder="Username"
                        value={formik.values.username}
                        onChangeText={formik.handleChange('username')}
                    />
                    {formik.touched.username && formik.errors.username && (
                        <Text style={theme.errorText}>{formik.errors.username}</Text>
                    )}
                    <TextInput
                        style={theme.inputField}
                        error={formik.errors.password}
                        secureTextEntry={true}
                        placeholder="Password"
                        value={formik.values.password}
                        onChangeText={formik.handleChange('password')}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <Text style={theme.errorText}>{formik.errors.password}</Text>
                    )}
                    <Pressable style={mainTheme.purpleButton} onPress={formik.handleSubmit}>
                        <Text style={mainTheme.purpleButtonText}>Log In</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    );
};

export default SignIn;