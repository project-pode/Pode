import Main from './src/Main';
import { NativeRouter } from 'react-router-native';
import AuthStorageContext from './src/contexts/AuthStorageContext';
import AuthStorage from './src/utils/authStorage';

const authStorage = new AuthStorage();
export default function App() {

  return (
    <NativeRouter>
      <AuthStorageContext.Provider value={authStorage}>
        <Main/>
      </AuthStorageContext.Provider>
    </NativeRouter>
  );
}

