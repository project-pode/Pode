import axios from 'axios';
import Constants from "expo-constants";
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




export default { getAll, create };