import axios from 'axios';
import Constants from "expo-constants";
import { LoginCredentials } from '../types';

const apiBaseUrl = Constants?.expoConfig?.extra?.API_URL;
const useDemoService = Constants?.expoConfig?.extra?.USE_DEMO_SERVICE;

const loginService = useDemoService
    ? require('../demo/demoLoginService').default
    : {
        /**
         * Logs in a user with the provided credentials.
         * 
         * @param {Object} credentials - The login credentials.
         * @returns {Object} The response data containing user information and token.
         */
        login: async (credentials: LoginCredentials) => {
            const response = await axios.post(`${apiBaseUrl}/login`, credentials);
            return response.data;
        }
    };

export default loginService;