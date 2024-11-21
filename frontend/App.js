import Main from './src/Main';
import { NativeRouter } from 'react-router-native';
import AuthStorageContext from './src/contexts/AuthStorageContext';
import AuthStorage from './src/utils/authStorage';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
const authStorage = new AuthStorage();
export default function App() {
  
  const [fontsLoaded] = useFonts({
    "AlfaSlabOne": require("./assets/fonts/AlfaSlabOne.ttf")
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
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

