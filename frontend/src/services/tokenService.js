let token = null;
let config = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  config = {
    headers: { Authorization: token },
  };
};

const getConfig = () => config;

export default { setToken, getConfig };
