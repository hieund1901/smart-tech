import { createSlice } from '@reduxjs/toolkit';

const productDetailSlice = createSlice({
  name: 'product',
  initialState: {
    product: {
      ProductById: {
        data: {
          id: 0,
          name: null,
          imageBase64: '',
          sellingPrice: null,
          attributes: {
            color: 'red',
          },
        },
      },
      isFetching: false,
      errors: false,
    },
  },
  reducers: {
    getProductbyidStart: (state) => {
      state.product.isFetching = true;
    },
    getProductbyidSuccess: (state, action) => {
      state.product.isFetching = false;
      state.product.ProductById = action.payload;
      state.product.errors = false;
    },
    getProductbyidFailed: (state) => {
      state.product.isFetching = false;
      state.product.errors = true;
    },
  },
});

export const { getProductbyidStart, getProductbyidSuccess, getProductbyidFailed } = productDetailSlice.actions;

export default productDetailSlice.reducer;
