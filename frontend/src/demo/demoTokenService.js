const demoTokenService = {
    token: 'demo-token',
    config: {
      headers: { Authorization: 'Bearer demo-token' },
    },
  
    setToken: (newToken) => {
      demoTokenService.token = `Bearer ${newToken}`;
      demoTokenService.config = {
        headers: { Authorization: demoTokenService.token },
      };
    },
  
    getConfig: () => demoTokenService.config,
  };
  
  export default demoTokenService;