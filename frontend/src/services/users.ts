import axios from 'axios';
import Constants from "expo-constants";
import tokenService from './tokenService';

const useDemoService = Constants?.expoConfig?.extra?.USE_DEMO_SERVICE;
const apiBaseUrl = Constants?.expoConfig?.extra?.API_URL;

const userService = useDemoService
    ? require('../demo/demoUserService').default
    : {
        /**
         * Fetches all users.
         * 
         * @returns {Array} The list of users.
         */
        getAll: async () => {
            const response = await axios.get(`${apiBaseUrl}/users`);
            return response.data;
        },

        /**
         * Fetches a specific user by ID.
         * 
         * @param {string} userId - The ID of the user.
         * @returns {Object} The user data.
         */
        getOne: async (userId: string) => {
            const response = await axios.get(`${apiBaseUrl}/users/${userId}`);
            return response.data;
        },

        /**
         * Creates a new user.
         * 
         * @param {Object} newObject - The new user data.
         * @returns {Object} The created user data.
         */
        create: async (newObject: Object) => {
            const config = tokenService.getConfig();
            const response = await axios.post(`${apiBaseUrl}/users`, newObject, config);
            return response.data;
        },

        /**
         * Updates the avatar of a specific user.
         * 
         * @param {string} userId - The ID of the user.
         * @param {string} avatar - The new avatar by its name.
         * @returns {Object} The updated user data.
         */
        updateAvatar: async (userId: string, avatar: string) => {
            const config = tokenService.getConfig();
            const response = await axios.put(`${apiBaseUrl}/users/${userId}`, { avatar }, config);
            return response.data;
        }
    };

export default userService;