import axios from 'axios';
import Constants from "expo-constants";
import tokenService from './tokenService';

const apiBaseUrl = Constants?.expoConfig?.extra?.API_URL;
const useDemoService = Constants?.expoConfig?.extra?.USE_DEMO_SERVICE;

const lessonService = useDemoService
    ? require('../demo/demoLessonService').default
    : {
        /**
         * Fetches all lessons for a specific user.
         * 
         * @returns {Array} The list of lessons.
         */
        getLessons: async () => {
            try {
                console.log('Fetching lessons from API');
                const response = await axios.get(`${apiBaseUrl}/lessons`);
                return response.data; // The list of lessons
            } catch (error) {
                console.error('Error fetching lessons:', error);
            }
        },

        /**
         * Fetches a specific lesson for a user.
         * 
         * @param {string} lessonId - The ID of the lesson.
         * @returns {Object} The lesson data.
         */
        getLesson: async (lessonId:string) => {
            try {
                console.log('Fetching lesson from API');
                const response = await axios.get(`${apiBaseUrl}/lessons/${lessonId}`);
                return response.data; // The specific lesson
            } catch (error) {
                console.error('Error fetching lesson:', error);
            }
        },

        /**
         * Marks a specific lesson as completed for a user.
         * 
         * @param {string} lessonId - The ID of the lesson.
         * @returns {Object} The response data.
         */
        completeLesson: async (lessonId:string) => {
            try {
                console.log('Completing lesson via API');
                const config = tokenService.getConfig();
                const response = await axios.put(`${apiBaseUrl}/lessons/${lessonId}/complete`, {}, config);
                return response.data;
            } catch (error) {
                console.error('Error marking lesson as completed:', error);
                throw error;
            }
        }
    };

export default lessonService;