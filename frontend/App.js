import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useAuthStorage from './src/hooks/useAuthStorage';
import SignIn from './src/components/SignIn';
import loginService from './src/services/login';
import Main from './src/Main';
import { NativeRouter } from 'react-router-native';
import AuthStorageContext from './src/contexts/AuthStorageContext';
import AuthStorage from './src/utils/authStorage';

const authStorage = new AuthStorage();
export default function App() {
  const [user, setUser] = useState(null);

  /* useEffect(() => {
    const authStorage = useAuthStorage();
    const loggedUserJSON = authStorage.getUser();
    //const loggedUserJSON = window.localStorage.getItem('user');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []); */
  return (
    <NativeRouter>
      <AuthStorageContext.Provider value={authStorage}>
        <Main/>
      </AuthStorageContext.Provider>
    </NativeRouter>
  );
}

