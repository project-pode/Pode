import { StyleSheet, View } from 'react-native';
import { Route, Routes, useNavigate } from 'react-router-native';
import { useEffect, useState } from 'react';
import userService from "./services/users";
import SignIn from './components/SignIn';
import theme from './theme';
import UserList from './components/UserList';
import useAuthStorage from './hooks/useAuthStorage';
import loginService from './services/login';
import AppBar from './components/AppBar';
import SignUp from './components/SignUp';
import LessonList from './components/LessonList';
import LessonView from './components/LessonView';
import SingleExerciseView from './components/SingleExerciseView';
import tokenService from './services/tokenService';
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "lightgrey",
    fontFamily: theme.fonts.main
  },
});

const Main = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true); // Add a loading state
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  useEffect(() => {

    const fetchUserFromStorage = async () => {
      try {
      const asyncStorageUser = await authStorage.getUser();
      if (asyncStorageUser) {
        setUser(asyncStorageUser);
        tokenService.setToken(asyncStorageUser.token);
      }
    } catch (error) {
      console.log('Error fetching user from storage', error);
    } finally {
      setLoading(false);
    }

    };
    const fetchUsers = async () => {
      const users = await userService.getAll();
      setUsers(users);

    };
    void fetchUserFromStorage();
    void fetchUsers();
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password
      });
      tokenService.setToken(user.token);
      authStorage.setUser(user);
      setUser(user);
      navigate("/");
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleSignUp = async (username, password) => {
    try {
      const user = await userService.create({
        username, password
      });
      tokenService.setToken(user.token);
      authStorage.setUser(user);
      setUser(user); 
      navigate("/");
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleLogout = () => {
    authStorage.removeUser();
    setUser(null);
  };
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/logIn" element={<SignIn onSignIn={handleLogin} />} />
        <Route path="/" element={<UserList users={users} loggedInUser={user} onLogout={handleLogout} />} />
        <Route path="/users" element={<SignUp onSignUp={handleSignUp}/>}/>
        <Route path="/users/lessons" element={<LessonList user={user}/>}/>
        <Route path="/users/:userId/lessons/:lessonId" element={<LessonView/>}/>
        <Route path="/users/:userId/lessons/:lessonId/exercises/:exerciseId" element={<SingleExerciseView/>}/>
      </Routes>
    </View>
  );
};

export default Main;