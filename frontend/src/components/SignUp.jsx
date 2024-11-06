import { StyleSheet, View, Pressable, ImageBackground, Text } from "react-native";
import { Link } from 'react-router-native';
import TextInput from "./TextInput";
import { useFormik } from 'formik';
import theme from "../theme";


import * as yup from "yup";
import { useNavigate } from "react-router-native";

const background = "../assets/BackgroundBinary.png"

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: "rgba(127,222,255,1)",
        justifyContent: "center",
    },
    errorText: {
        color: "#d73a4a",
        marginLeft: 10
    },
    container2: {
        marginHorizontal: 18, 
        backgroundColor: "rgba(237,220,249,1)",
        borderColor: "rgba(187,144,214,1)",
        borderRadius: 48,
        borderWidth: 7,
        alignContent: "center",
        padding: 10,
    },
    button: {
        margin: 20, 
        padding: 10,
        backgroundColor: "rgba(187,144,214,1)",
        borderRadius: 33,
        borderWidth: 6,
        borderColor: "rgba(135,105,155,1)",
        color: "BB90D6",
    },
    buttonText: {
        color: "rgba(135,105,155,1)",
        fontSize: 45,
        textAlign: "center",
        fontFamily: "AlfaSlabOne",
    },
    pode: {
        color: "rgba(75,113,123,1)",
        fontSize: 80,
        textAlign: "center",
        paddingVertical: 10,
        fontFamily: "AlfaSlabOne",
    },
    inputField: {
        paddingVertical: 10,
        backgroundColor: "rgba(255,255,255,1)",
        borderColor: "rgba(100,152,166,1)",
        borderRadius: 10,
        borderWidth: 2,
        color: "rgba(100,152,166,1)",
        fontSize: 25,

    },
    arrowContainer: {
        height: 30,
        width: 30,
        margin: 10,
    },
    backArrow: {
        fontSize: 30,
        color: "rgba(75,113,123,1)",
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },

});

const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .required('Password is required'),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], "Password and password confirmation don't match") //check that the value matches reference to password
        .required('Password confirmation is required')
});

const SignUp = ({ onSignUp }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async () => {
            if (!formik.isValid) {
                console.log("not valid");
                return;
            }
            try {
                await onSignUp(formik.values.username, formik.values.password);
            } catch (error) {
                console.error(error);
            }
        },
    });

    return (
        <View style={styles.container}>
            <ImageBackground source= {background} style={styles.image} >
                <View style={styles.container2}>
                    <View style= {styles.arrowContainer}>
                    <Pressable>
                        <Link to="/">
                        <Text style={styles.backArrow}>{"<"}</Text>
                        </Link>
                    </Pressable>
                    </View>
                    
                    <Text style={styles.pode}>{"<Pode/>"}</Text>

                    <TextInput
                        style = {styles.inputField}
                        error={formik.errors.username}
                        placeholder="Username"
                        value={formik.values.username}
                        onChangeText={formik.handleChange('username')}
                    />
                    {formik.touched.username && formik.errors.username && (
                        <Text style={styles.errorText}>{formik.errors.username}</Text>
                    )}
                    <TextInput
                        style = {styles.inputField}
                        error={formik.errors.password}
                        secureTextEntry={true}
                        placeholder="Password"
                        value={formik.values.password}
                        onChangeText={formik.handleChange('password')}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <Text style={styles.errorText}>{formik.errors.password}</Text>
                    )}
                    <TextInput
                        style = {styles.inputField}
                        error={formik.errors.passwordConfirmation}
                        secureTextEntry={true}
                        placeholder="Password confirmation"
                        value={formik.values.passwordConfirmation}
                        onChangeText={formik.handleChange('passwordConfirmation')}
                    />
                    {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
                        <Text style={styles.errorText}>{formik.errors.passwordConfirmation}</Text>
                    )}
                    <Pressable style={styles.button} onPress={formik.handleSubmit}>
                        <Text style={styles.buttonText}>Register</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    );
};

export default SignUp;