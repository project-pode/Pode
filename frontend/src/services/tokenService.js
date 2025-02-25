import Constants from 'expo-constants';

const useDemoService = Constants.expoConfig.extra.USE_DEMO_SERVICE;

const tokenService = useDemoService
  ? require('../demo/demoTokenService').default
  : {
      token: null,
      config: null,

      /**
       * Sets the authorization token and configures the headers.
       * 
       * @param {string} newToken - The new token to set.
       */
      setToken: (newToken) => {
        tokenService.token = `Bearer ${newToken}`;
        tokenService.config = {
          headers: { Authorization: tokenService.token },
        };
      },

      /**
       * Retrieves the current configuration with authorization headers.
       * 
       * @returns {Object|null} The configuration object or null if not set.
       */
      getConfig: () => tokenService.config,
    };

export default tokenService;