import 'dotenv/config';

const useDemoService = process.env.REACT_APP_USE_DEMO_SERVICE === 'true';

export default {
  expo: {
    name: "pode",
    slug: "pode",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      API_URL: process.env.API_URL,
      USE_DEMO_SERVICE: useDemoService
    }
  }
};