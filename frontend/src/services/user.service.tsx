import http from '../common/http';
import { ResponseType } from '../types/auth';
import { UserDetail } from '../types/user';

export const getUserDetails = async (): Promise<UserDetail[]> => {
    const response = await http.get<ResponseType<UserDetail[]>>('/dashboard/users');
    return response.data.data || [];
  };