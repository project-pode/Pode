import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * AuthStorage class for managing authentication-related data in AsyncStorage.
 */
class AuthStorage {
  /**
   * Creates an instance of AuthStorage.
   * @param {string} namespace - The namespace for the storage keys.
   */
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  /**
   * Retrieves the user data from AsyncStorage.
   * @returns {Object|null} The user data or null if not found.
   */
  async getUser() {
    const userData = await AsyncStorage.getItem(`${this.namespace}:user`);
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Stores the user data in AsyncStorage.
   * @param {Object} user - The user data to store.
   */
  async setUser(user) {
    await AsyncStorage.setItem(
      `${this.namespace}:user`,
      JSON.stringify(user)
    );
  }

  /**
   * Removes the user data from AsyncStorage.
   */
  async removeUser() {
    await AsyncStorage.removeItem(`${this.namespace}:user`);
  }

  /**
   * Retrieves the access token from AsyncStorage.
   * @returns {string|null} The access token or null if not found.
   */
  async getAccessToken() {
    const accessToken = await AsyncStorage.getItem(`${this.namespace}:token`);
    return accessToken;
  }

  /**
   * Stores the access token in AsyncStorage.
   * @param {string} accessToken - The access token to store.
   */
  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(
      `${this.namespace}:token`,
      accessToken
    );
  }

  /**
   * Removes the access token from AsyncStorage.
   */
  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}

export default AuthStorage;