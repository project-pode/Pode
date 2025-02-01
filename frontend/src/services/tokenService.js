import Constants from 'expo-constants';

const useDemoService = Constants.expoConfig.extra.USE_DEMO_SERVICE;

const tokenService = useDemoService
  ? require('../demo/demoTokenService').default
  : {
      token: null,
      config: null,

      setToken: (newToken) => {
        tokenService.token = `Bearer ${newToken}`;
        tokenService.config = {
          headers: { Authorization: tokenService.token },
        };
      },

      getConfig: () => tokenService.config,
    };

export default tokenService;