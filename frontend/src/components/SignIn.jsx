import { View, Pressable, ImageBackground, Text } from "react-native";
import { Link } from 'react-router-native';
import TextInput from "./TextInput";
import { useFormik } from 'formik';
import theme from "../theme";

import * as yup from "yup";


const background = "../assets/BackgroundBinary.png";



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

const SignIn = ({onSignIn}) => {
    
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async () => {
            if (!formik.isValid) {
                console.log("not valid");
                return;
            }
            try {
                await onSignIn(formik.values.username, formik.values.password);
            } catch (error) {
                console.error(error);
            }
        },
    });

    return (
        <View style={theme.blueContainer}>
            <ImageBackground source = {background} style = {theme.backgroundImage}>
                <View style={theme.pinkContainer}>
                    <View style= {theme.arrowContainer}>
                    <Pressable>
                        <Link to="/">
                        <Text style={theme.arrow}>{"<"}</Text>
                        </Link>
                    </Pressable>
                    </View>

                    <Text style={theme.titlePode}>{"<Pode/>"}</Text>

                    <TextInput
                        style = {theme.inputField}
                        error={formik.errors.username}
                        placeholder="Username"
                        value={formik.values.username}
                        onChangeText={formik.handleChange('username')}
                    />
                    {formik.touched.username && formik.errors.username && (
                        <Text style={theme.errorText}>{formik.errors.username}</Text>
                    )}
                    <TextInput
                        style = {theme.inputField}
                        error={formik.errors.password}
                        secureTextEntry={true}
                        placeholder="Password"
                        value={formik.values.password}
                        onChangeText={formik.handleChange('password')}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <Text style={theme.errorText}>{formik.errors.password}</Text>
                    )}
                    <Pressable style={theme.purpleButton} onPress={formik.handleSubmit}>
                        <Text style={theme.purpleButtonText}>Log In</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    );
};

export default SignIn;