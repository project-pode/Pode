import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

/**
 * AuthStorage class for managing authentication-related data in AsyncStorage.
 */
class AuthStorage {
  private namespace: string;

  /**
   * Creates an instance of AuthStorage.
   * @param {string} namespace - The namespace for the storage keys.
   */
  constructor(namespace: string = 'auth') {
    this.namespace = namespace;
  }

  /**
   * Retrieves the user data from AsyncStorage.
   * @returns A Promise resolving to the user data object or null.
   */
  async getUser(): Promise<User | null> {
    const userData = await AsyncStorage.getItem(`${this.namespace}:user`);
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Stores the user data in AsyncStorage.
   * @param user - The user data to store.
   */
  async setUser(user: User): Promise<void> {
    await AsyncStorage.setItem(`${this.namespace}:user`, JSON.stringify(user));
  }

  /**
   * Removes the user data from AsyncStorage.
   */
  async removeUser(): Promise<void> {
    await AsyncStorage.removeItem(`${this.namespace}:user`);
  }

  /**
   * Retrieves the access token from AsyncStorage.
   * @returns A Promise resolving to the access token or null.
   */
  async getAccessToken(): Promise<string | null> {
    return await AsyncStorage.getItem(`${this.namespace}:token`);
  }

  /**
   * Stores the access token in AsyncStorage.
   * @param accessToken - The access token to store.
   */
  async setAccessToken(accessToken: string): Promise<void> {
    await AsyncStorage.setItem(`${this.namespace}:token`, accessToken);
  }

  /**
   * Removes the access token from AsyncStorage.
   */
  async removeAccessToken(): Promise<void> {
    await AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}

export default AuthStorage;
