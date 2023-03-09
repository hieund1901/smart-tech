import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    category: {
      allCategories: {
        data: [],
      },
      isFetching: false,
      errors: false,
    },
  },
  reducers: {
    getCategoryStart: (state) => {
      state.category.isFetching = true;
    },
    getCategorySuccess: (state, action) => {
      state.category.isFetching = false;
      state.category.allCategories = action.payload;
      state.category.errors = false;
    },
    getCategoryFailed: (state) => {
      state.category.isFetching = false;
      state.category.errors = true;
    },
  },
});

export const { getCategoryStart, getCategorySuccess, getCategoryFailed } = categorySlice.actions;

export default categorySlice.reducer;
