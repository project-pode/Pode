import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate, useParams } from 'react-router-native';
import { useEffect, useState } from 'react';
import userService from "./services/users"
import SignIn from './components/SignIn';
import theme from './theme';
import UserList from './components/UserList';
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "lightgrey",
    fontFamily: theme.fonts.main
  },
});

const Main = () => {
    const [users, setUsers] = useState([])

    useEffect(()=> {
    
    const fetchUsers = async () => {
        const users = await userService.getAll();
        setUsers(users);
      
      };
    void fetchUsers();
}, [])
  return (
    <View style={styles.container}>
      <Routes>
        <Route path="/logIn" element={<SignIn />} />
        <Route path="/" element={<UserList users={users}/>}/>
      </Routes>
    </View>
  );
};

export default Main;