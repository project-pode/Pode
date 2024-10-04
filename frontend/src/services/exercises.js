import axios from 'axios';
import Constants from "expo-constants";
const apiBaseUrl = Constants.expoConfig.extra.API_URL;

// Fetch a specific exercise by lesson ID and exercise ID
const getOne = async (lessonId, exerciseId) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/lessons/${lessonId}/exercises/${exerciseId}`);
        return response.data; // The specific exercise
    } catch (error) {
        console.error('Error fetching exercise:', error);
    }
};

export default {getOne};
