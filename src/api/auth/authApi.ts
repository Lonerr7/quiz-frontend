import {axiosInstance} from '../config/ApiConfig';

export const authApi = {
  logIn: async ({name, password}: {name: string; password: string}) => await axiosInstance.post('/auth/logIn', {name, password}),
};