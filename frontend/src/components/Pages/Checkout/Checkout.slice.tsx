import { createSlice } from '@reduxjs/toolkit';

const CheckoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    user: {
      User: {
        name:null,
        email:null,
        phone:null,
        address:null,
        voucer:null,
        other:null,
      },
      isFetching: false,
      errors: false,
    },
  },
  reducers: {
    setUser:(state,action)=>{
        state.user.User = action.payload;
    },
    getUserStart: (state) => {
      state.user.isFetching = true;
    },
    getUserSuccess: (state, action) => {
      state.user.isFetching = false;
      state.user.User = action.payload;
      state.user.errors = false;
    },
    getUserFailed: (state) => {
      state.user.isFetching = false;
      state.user.errors = true;
    },
  },
});

export const { setUser, getUserStart, getUserSuccess,getUserFailed } = CheckoutSlice.actions;

export default CheckoutSlice.reducer;