import axios from 'axios';
import Constants from "expo-constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import tokenService from './tokenService';
const apiBaseUrl = Constants.expoConfig.extra.API_URL;

const getAll = async () => {
  const response = await axios.get(`${apiBaseUrl}/users`);
  return response.data;
};

const create = async newObject => {
  const config = tokenService.getConfig();
  const response = await axios.post(`${apiBaseUrl}/users`, newObject, config);
  return response.data;
};

export default { getAll, create };