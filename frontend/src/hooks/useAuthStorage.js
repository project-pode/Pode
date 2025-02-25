import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';

/**
 * Custom hook to access the AuthStorage context.
 * @returns {Object} - The current context value for AuthStorage.
 */
const useAuthStorage = () => {
  return useContext(AuthStorageContext);
};

export default useAuthStorage;