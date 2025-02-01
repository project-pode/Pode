import axios from 'axios';
import Constants from "expo-constants";
import tokenService from './tokenService';
const useDemoService = Constants.expoConfig.extra.USE_DEMO_SERVICE;

const apiBaseUrl = Constants.expoConfig.extra.API_URL;

const userService = useDemoService
    ? require('../demo/demoUserService').default
    : {
        getAll: async () => {
            const response = await axios.get(`${apiBaseUrl}/users`);
            return response.data;
        },
        getOne: async (userId) => {
            const response = await axios.get(`${apiBaseUrl}/users/${userId}`);
            return response.data;
        },
        create: async (newObject) => {
            const config = tokenService.getConfig();
            const response = await axios.post(`${apiBaseUrl}/users`, newObject, config);
            return response.data;
        },
        updateAvatar: async (userId, avatar) => {
            const config = tokenService.getConfig();
            const response = await axios.put(`${apiBaseUrl}/users/${userId}`, { avatar }, config);
            return response.data;
        }
    };

export default userService;