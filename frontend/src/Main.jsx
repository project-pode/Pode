import { StyleSheet, View, Text } from 'react-native';
import { Route, Routes, useNavigate } from 'react-router-native';
import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import userService from "./services/users";
import SignIn from './components/authentication/SignIn';
import mainTheme from './themes/mainTheme';
import useAuthStorage from './hooks/useAuthStorage';
import loginService from './services/login';
import SignUp from './components/authentication/SignUp';
import LessonView from './components/lesson/LessonView';
import SingleExerciseView from './components/exercise/SingleExerciseView';
import tokenService from './services/tokenService';
import ProgressMapView from './components/ProgressMapView';
import LessonOverview from './components/lesson/LessonOverview';
import StartView from './components/authentication/StartView';
import ProfileView from './components/ProfileView';
import demoData from './demo/demoData.json';
import LoadingView from './components/LoadingView';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "lightgrey",
    fontFamily: mainTheme.fonts.main
  },
});

/**
 * Main component
 * 
 * This component serves as the main entry point for the application.
 * It handles user authentication, routing, and rendering the appropriate views based on the user's state.
 * 
 * @returns {JSX.Element} The rendered component
 */
const Main = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserFromStorage = async () => {
      try {
        const useDemoService = Constants.expoConfig.extra.USE_DEMO_SERVICE;
        if (useDemoService) {
          const demoUser = demoData.users[0];
          setUser(demoUser);
          tokenService.setToken('demo-token');
        } else {
          const asyncStorageUser = await authStorage.getUser();
          if (asyncStorageUser) {
            setUser(asyncStorageUser);
            tokenService.setToken(asyncStorageUser.token);
          }
        }
      } catch (error) {
        console.log('Error fetching user from storage', error);
      } finally {
        setLoading(false);
      }
    };

    void fetchUserFromStorage();
  }, []);

  /**
   * Handles user login.
   * 
   * @param {string} username - The username provided by the user
   * @param {string} password - The password provided by the user
   * @returns {string|null} The error message if login fails, otherwise null
   */
  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      tokenService.setToken(user.token);
      await authStorage.setUser(user);
      setUser(user);
      navigate(`/users/${user.id}/lessons`);
    } catch (exception) {
      const errorMessage = exception.response?.data?.error || 'An unexpected error occurred.';
      return errorMessage; // Return the error message
    }
  };

  /**
   * Handles user sign-up.
   * 
   * @param {string} username - The username provided by the user
   * @param {string} password - The password provided by the user
   * @returns {string|null} The error message if sign-up fails, otherwise null
   */
  const handleSignUp = async (username, password) => {
    try {
      const user = await userService.create({ username, password });
      tokenService.setToken(user.token);
      await authStorage.setUser(user);
      setUser(user);
      navigate(`/users/${user.id}/lessons?showPopUp=true`);
    } catch (exception) {
      const errorMessage = exception.response?.data?.error || 'An unexpected error occurred.';
      return errorMessage; // Return the error message
    }
  };

  /**
   * Handles user logout.
   */
  const handleLogout = () => {
    authStorage.removeUser();
    setUser(null);
    navigate("/");
  };

  if (loading) {
    return <LoadingView/>;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ backgroundColor: "rgba(127,222,255,1)", padding: 10 }}></Text>
      </View>
      <Routes>
        <Route path="/logIn" element={<SignIn onSignIn={handleLogin} />} />
        <Route path="/" element={<StartView user={user} />} />
        <Route path="/signUp" element={<SignUp onSignUp={handleSignUp} />} />
        <Route path="/users/:userId/profile" element={<ProfileView onLogout={handleLogout} />} />
        <Route path="/users/:userId/lessons" element={<ProgressMapView />} />
        <Route path="/users/:userId/lessons/:lessonId" element={<LessonView />} />
        <Route path="/users/:userId/lessons/:lessonId/exercises/:exerciseId" element={<SingleExerciseView />} />
        <Route path="/users/:userId/lessons/:lessonId/overview" element={<LessonOverview user={user} />} />
      </Routes>
    </View>
  );
};

export default Main;