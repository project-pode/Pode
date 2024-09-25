import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate, useParams, useNavigate } from 'react-router-native';
import { useEffect, useState } from 'react';
import userService from "./services/users";
import SignIn from './components/SignIn';
import theme from './theme';
import UserList from './components/UserList';
import useAuthStorage from './hooks/useAuthStorage';
import loginService from './services/login';
import AppBar from './components/AppBar';
import SignUp from './components/SignUp';
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
  const [loading, setLoading] = useState(true); // Add a loading state
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  useEffect(() => {

    const fetchUserFromStorage = async () => {
      try {
      const asyncStorageUser = await authStorage.getUser();
      console.log(asyncStorageUser);
      console.log(user);
      if (asyncStorageUser) {

        setUser(asyncStorageUser);
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
    console.log(authStorage.getUser());
  };
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/logIn" element={<SignIn onSignIn={handleLogin} />} />
        <Route path="/" element={<UserList users={users} loggedInUser={user} onLogout={handleLogout} />} />
        <Route path="/users" element={<SignUp onSignUp={handleSignUp}/>}/>
      </Routes>
    </View>
  );
};

export default Main;