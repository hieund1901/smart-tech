import { Action, configureStore } from '@reduxjs/toolkit';
import app from '../components/App/App.slice';
import home from '../components/Pages/Home/Home.slice';
import loginManager from '../components/Pages/LoginManager/LoginManager.slice';
import register from '../components/Pages/Register/Register.slice';
import auth from '../components/Pages/Login/auth.slice';
import category from '../components/Category/category.slice';
import product from '../components/Pages/ProductDetail/productDetail.slice';
import checkout from '../components/Pages/Checkout/Checkout.slice';

const middlewareConfiguration = { serializableCheck: false };

export const store = configureStore({
  reducer: { app, home, auth, register, category, loginManager,product,checkout },
  devTools: {
    name: 'Sapo',
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(middlewareConfiguration),
});
export type RootState = ReturnType<typeof store.getState>;

export function dispatchOnCall(action: Action) {
  return () => store.dispatch(action);
}
