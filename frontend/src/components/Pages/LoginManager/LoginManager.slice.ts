import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserLogged } from '../../../types/auth';

const initialState: UserLogged = {
  username: '',
  role: '',
  accessToken: '',
  refreshToken: '',
};

const managerSlice = createSlice({
  name: 'manager',
  initialState:{
    Login:{
      currentAdmin:null,
      isFetching:false,
      errors:false,
    }
  },
  reducers: {

    loginManagerStart:(state)=>{
      state.Login.isFetching=true;
    },
    loginManagerSuccess: (state, action) => {
      state.Login.isFetching = false;
      state.Login.currentAdmin = action.payload;
      state.Login.errors = false;
    },
    loginFailed: (state) => {
      state.Login.isFetching = false;
      state.Login.errors = true;
    },
    logoutManager: (state) => {
      state.Login.currentAdmin=null;
    },
  },
});

export const { loginManagerStart,loginManagerSuccess,loginFailed,logoutManager } = managerSlice.actions;

export default managerSlice.reducer;
