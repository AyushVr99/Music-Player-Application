import * as SecureStore from 'expo-secure-store';
import { User } from '@app-types/user.types';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export const storageService = {
  setToken: async (token: string): Promise<void> => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },

  getToken: async (): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch {
      return null;
    }
  },

  removeToken: async (): Promise<void> => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },

  setUser: async (user: User): Promise<void> => {
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  },

  getUser: async (): Promise<User | null> => {
    try {
      const userData = await SecureStore.getItemAsync(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  },

  removeUser: async (): Promise<void> => {
    await SecureStore.deleteItemAsync(USER_KEY);
  },
};
