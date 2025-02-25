const demoTokenService = {
  token: 'demo-token',
  config: {
      headers: { Authorization: 'Bearer demo-token' },
  },

  /**
   * Sets a new token and updates the authorization header.
   * @param {string} newToken - The new token to be set.
   */
  setToken: (newToken) => {
      demoTokenService.token = `Bearer ${newToken}`;
      demoTokenService.config = {
          headers: { Authorization: demoTokenService.token },
      };
  },

  /**
   * Gets the current configuration with the authorization header.
   * @returns {Object} - The current configuration object.
   */
  getConfig: () => demoTokenService.config,
};

export default demoTokenService;