export interface ResponseType<Type> {
  code?: string;
  message?: string;
  data?: Type;
}

export interface UserLogged {
  username?: string;
  role?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface LoginForm {
  username?: string;
  password?: string;
}



