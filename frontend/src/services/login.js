import axios from 'axios';
import Constants from "expo-constants";

const apiBaseUrl = Constants.expoConfig.extra.API_URL;
const useDemoService = Constants.expoConfig.extra.USE_DEMO_SERVICE;

const loginService = useDemoService
    ? require('../demo/demoLoginService').default
    : {
        login: async (credentials) => {
            const response = await axios.post(`${apiBaseUrl}/login`, credentials);
            return response.data;
        }
    };

export default loginService;