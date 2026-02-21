import { axiosInstance } from './axiosInstance';
import { User, UpdateUserRequest } from '@app-types/user.types';

export const userApi = {
  getProfile: async (): Promise<User> => {
    const response = await axiosInstance.get('/user/profile');
    return response.data;
  },

  updateProfile: async (data: UpdateUserRequest): Promise<User> => {
    const response = await axiosInstance.put('/user/profile', data);
    return response.data;
  },

  deleteAccount: async (): Promise<void> => {
    await axiosInstance.delete('/user/account');
  },
};
