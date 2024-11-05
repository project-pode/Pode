import { StyleSheet, View, Pressable, ImageBackground } from "react-native";
import { Link } from 'react-router-native';
import TextInput from "./TextInput";
import { useFormik } from 'formik';
import theme from "../theme";
import Text from "./Text";
import * as yup from "yup";


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
    },
    pode: {
        color: "rgba(75,113,123,1)",
        fontSize: 80,
        textAlign: "center",
        paddingVertical: 10,
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
    inputText: {

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
        <View style={styles.container}>
            <ImageBackground source = {background} style = {styles.image}>
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
                    <Pressable style={styles.button} onPress={formik.handleSubmit}>
                        <Text style={styles.buttonText}>Log In</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    );
};

export default SignIn;