import { StyleSheet, View, Pressable } from "react-native";
import TextInput from "./TextInput";
import { useFormik } from 'formik';
import theme from "../theme";
import Text from "./Text";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import useAuthStorage from "../hooks/useAuthStorage";
import loginService from "../services/login";
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

export const SignInForm = ({ onSubmit }) => {
    const authStorage = useAuthStorage();

    
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
          const user = await loginService.login(
            formik.values.username, formik.values.password
            
        );
          /* window.localStorage.setItem(
            'user', JSON.stringify(user)
          ) */
          authStorage.setUser(user, JSON.stringify(user));
        } catch (exception) {
          console.log(exception);
        }
      };

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
                <Pressable style={theme.button} onPress={handleLogin}>
                    <Text style={{ color: "white" }}>Sign in</Text>
                </Pressable>
            </View>
        </View>
    );
};


const SignIn = () => {
    const navigate = useNavigate();

    const onSubmit = async (values) => {
      const { username, password } = values;
  
      try {
        navigate("/");
      } catch (e) {
        console.log(e);
      }
    };

    return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;