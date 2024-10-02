import axios from 'axios';
import Constants from "expo-constants";
const apiBaseUrl = Constants.expoConfig.extra.API_URL;
const getAll = async () => {
  const response = await axios.get(`${apiBaseUrl}/lessons`);
  return response.data;
};

const getOne = async (id) => {
    const response = await axios.get(`${apiBaseUrl}/lessons/${id}`);
    return response.data;
};




export default { getAll, getOne};