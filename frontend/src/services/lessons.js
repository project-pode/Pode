import axios from 'axios';
import Constants from "expo-constants";
import tokenService from './tokenService';
const apiBaseUrl = Constants.expoConfig.extra.API_URL;

//users uncompleted lessons
const getLessons = async (userId) => {
  const response = await axios.get(`${apiBaseUrl}/users/${userId}/lessons`);
  return response.data;
};

const getLesson = async (userId, lessonId) => {
  const response = await axios.get(`${apiBaseUrl}/users/${userId}/lessons/${lessonId}`);
  return response.data;
};

// Mark lesson as completed
const completeLesson = async (userId, lessonId) => {
  try {
    const config = tokenService.getConfig();
    const response = await axios.put(`${apiBaseUrl}/users/${userId}/lessons/${lessonId}/complete`, {}, config);
    return response.data;
  } catch (error) {
    console.error('Error marking lesson as completed:', error);
    throw error;
  }
};



export default {getLessons, getLesson, completeLesson};