import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const authSlice = createSlice({
  name: 'auth',
  initialState:{
    login:{
      currentUser: {
        data:{
          username:'',
        }
      },
      isFetching: false,
      errors: false
    },
    register:{
       isFetching: false,
       errors: false,
       success:false,
    }
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    LoginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.errors = false;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.errors = true;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.errors = false;
      state.register.success = true;
    },
    registerFailed: (state) => {
      state.register.isFetching = false;
      state.register.errors = true;
    }
  }
});

export const {
  loginStart,
  LoginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed
} = authSlice.actions;

export default authSlice.reducer;
