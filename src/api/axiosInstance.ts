import axios from 'axios';
import { config } from '@constants/config';

export const axiosInstance = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});