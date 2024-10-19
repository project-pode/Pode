import axios from 'axios';
import Constants from "expo-constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
const apiBaseUrl = Constants.expoConfig.extra.API_URL;


let token=null;
let config=null;
const setToken = newToken => {
  token = `Bearer ${newToken}`;
  config  = {
    headers: { Authorization: token },
  };
};

const getAll = async () => {
  const response = await axios.get(`${apiBaseUrl}/users`);
  return response.data;
};

const create = async newObject => {
  const response = await axios.post(`${apiBaseUrl}/users`, newObject, config);
  return response.data;
};

//users uncompleted lessons
const getLessons = async (userId) => {
  const response = await axios.get(`${apiBaseUrl}/users/${userId}/lessons`);
  return response.data;
}

const getLesson = async (userId, lessonId) => {
  const response = await axios.get(`${apiBaseUrl}/users/${userId}/lessons/${lessonId}`);
  return response.data;
};

// Mark lesson as completed
const completeLesson = async (userId, lessonId) => {
  try {
    const response = await axios.put(`${apiBaseUrl}/users/${userId}/lessons/${lessonId}/complete`, {}, config)
    return response.data;
  } catch (error) {
    console.error('Error marking lesson as completed:', error);
    throw error;
  }
};

export default { getAll, create, getLessons, getLesson, completeLesson, setToken };