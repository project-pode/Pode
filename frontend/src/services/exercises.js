import axios from 'axios';
import Constants from "expo-constants";
import tokenService from './tokenService';

const useDemoService = Constants.expoConfig.extra.USE_DEMO_SERVICE;
const apiBaseUrl = Constants.expoConfig.extra.API_URL;

const exerciseService = useDemoService
    ? require('../demo/demoExerciseService').default
    : {
        /**
         * Fetches a specific exercise for a user and lesson.
         * 
         * @param {string} userId - The ID of the user.
         * @param {string} lessonId - The ID of the lesson.
         * @param {string} exerciseId - The ID of the exercise.
         * @returns {Object} The exercise data.
         */
        getOne: async (userId, lessonId, exerciseId) => {
            try {
                const response = await axios.get(`${apiBaseUrl}/users/${userId}/lessons/${lessonId}/exercises/${exerciseId}`);
                return response.data; // The specific exercise
            } catch (error) {
                console.error('Error fetching exercise:', error);
            }
        },

        /**
         * Marks a specific exercise as completed for a user and lesson.
         * 
         * @param {string} userId - The ID of the user.
         * @param {string} lessonId - The ID of the lesson.
         * @param {string} exerciseId - The ID of the exercise.
         * @returns {Object} The response data.
         */
        completeExercise: async (userId, lessonId, exerciseId) => {
            try {
                const config = tokenService.getConfig();
                const response = await axios.put(`${apiBaseUrl}/users/${userId}/lessons/${lessonId}/exercises/${exerciseId}/complete`, {}, config);
                return response.data;
            } catch (error) {
                console.error('Error marking exercise as completed:', error);
                throw error;
            }
        }
    };

export default exerciseService;