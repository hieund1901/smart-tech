import http from '../common/http';
import { LoginForm, ResponseType, UserLogged } from '../types/auth';

export const login = async (user?: LoginForm): Promise<ResponseType<UserLogged>> => {
  const response = await http.post<ResponseType<UserLogged>>('auth/login', {
    username: user?.username,
    password: user?.password,
    role: 'ROLE_MANAGER',
  });
  console.log('data: ', response.data);
  if (response.data.data?.accessToken) {
    localStorage.setItem('user', JSON.stringify(response.data.data));
    localStorage.setItem('accessToken', JSON.stringify(response.data.data.accessToken));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const useStr = localStorage.getItem('user');
  if (useStr) return JSON.parse(useStr);
  return null;
};
