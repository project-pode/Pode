import { StyleSheet, View, Pressable } from "react-native";
import TextInput from "./TextInput";
import { useFormik } from 'formik';
import theme from "../theme";
import Text from "./Text";
import * as yup from "yup";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: "lightgrey"
    },
    errorText: {
        color: "#d73a4a",
        marginLeft: 10
    }
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
            <View style={{ backgroundColor: "white" }}>
                <TextInput
                    error={formik.errors.username}
                    placeholder="Username"
                    value={formik.values.username}
                    onChangeText={formik.handleChange('username')}
                />
                {formik.touched.username && formik.errors.username && (
                    <Text style={styles.errorText}>{formik.errors.username}</Text>
                )}
                <TextInput
                    error={formik.errors.password}
                    secureTextEntry={true}
                    placeholder="Password"
                    value={formik.values.password}
                    onChangeText={formik.handleChange('password')}
                />
                {formik.touched.password && formik.errors.password && (
                    <Text style={styles.errorText}>{formik.errors.password}</Text>
                )}
                <Pressable style={theme.button} onPress={formik.handleSubmit}>
                    <Text style={{ color: "white" }}>Sign in</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default SignIn;