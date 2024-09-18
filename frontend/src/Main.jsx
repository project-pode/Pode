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
  const [user, setUser] = useState();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  useEffect(() => {

    const fetchUserFromStorage = async () => {
      const asyncStorageUser = await authStorage.getUser();
      if (asyncStorageUser) {
        const user = asyncStorageUser;
        setUser(user);
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
      authStorage.setUser(user, JSON.stringify(user));
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
      </Routes>
    </View>
  );
};

export default Main;