import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';

/**
 * Custom hook to access the AuthStorage context.
 * @returns {Object} - The current context value for AuthStorage.
 */
const useAuthStorage = () => {
  const authStorage =  useContext(AuthStorageContext);
  if (!authStorage) {
    throw new Error('AuthStorage context is not found');
  }
  return authStorage;
};

export default useAuthStorage;