import axios from 'axios';
import Constants from "expo-constants";
import tokenService from './tokenService';

const apiBaseUrl = Constants.expoConfig.extra.API_URL;
const useDemoService = Constants.expoConfig.extra.USE_DEMO_SERVICE;

const lessonService = useDemoService
    ? require('../demo/demoLessonService').default
    : {
        getLessons: async (userId) => {
            try {
                console.log('Fetching lessons from API');
                const response = await axios.get(`${apiBaseUrl}/users/${userId}/lessons`);
                return response.data; // The list of lessons
            } catch (error) {
                console.error('Error fetching lessons:', error);
            }
        },
        getLesson: async (userId, lessonId) => {
            try {
                console.log('Fetching lesson from API');
                const response = await axios.get(`${apiBaseUrl}/users/${userId}/lessons/${lessonId}`);
                return response.data; // The specific lesson
            } catch (error) {
                console.error('Error fetching lesson:', error);
            }
        },
        completeLesson: async (userId, lessonId) => {
            try {
                console.log('Completing lesson via API');
                const config = tokenService.getConfig();
                const response = await axios.put(`${apiBaseUrl}/users/${userId}/lessons/${lessonId}/complete`, {}, config);
                return response.data;
            } catch (error) {
                console.error('Error marking lesson as completed:', error);
                throw error;
            }
        }
    };

export default lessonService;