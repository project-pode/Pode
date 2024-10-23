import axios from 'axios';
import Constants from "expo-constants";
import tokenService from './tokenService';
const apiBaseUrl = Constants.expoConfig.extra.API_URL;

const getAll = async () => {
  const response = await axios.get(`${apiBaseUrl}/users`);
  return response.data;
};

const getOne = async (userId) => {
  const response = await axios.get(`${apiBaseUrl}/users/${userId}`);
  return response.data;
};

const create = async newObject => {
  const config = tokenService.getConfig();
  const response = await axios.post(`${apiBaseUrl}/users`, newObject, config);
  return response.data;
};

export default { getAll, create, getOne };