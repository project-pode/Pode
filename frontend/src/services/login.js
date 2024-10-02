import axios from 'axios';
import Constants from "expo-constants";
const apiBaseUrl = Constants.expoConfig.extra.API_URL;

const login = async credentials => {
  const response = await axios.post(`${apiBaseUrl}/login`, credentials);
  return response.data;
};

export default { login };