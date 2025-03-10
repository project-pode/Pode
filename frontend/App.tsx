import Main from './src/Main';
import { NativeRouter } from 'react-router-native';
import AuthStorageContext from './src/contexts/AuthStorageContext';
import AuthStorage from './src/utils/authStorage';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import React from 'react';
import LoadingView from './src/components/LoadingView';
const authStorage = new AuthStorage();
export default function App() {
  
  const [fontsLoaded] = useFonts({
    "AlfaSlabOne": require("./assets/fonts/AlfaSlabOne.ttf"),
    "Cousine": require("./assets/fonts/Cousine.ttf")
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    if (!fontsLoaded) {
      return undefined;
    } else {
      SplashScreen.hideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return <LoadingView />;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <NativeRouter>
      <AuthStorageContext.Provider value={authStorage}>
        <Main/>
      </AuthStorageContext.Provider>
    </NativeRouter>
  );
}

