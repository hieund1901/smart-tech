import {
  loginFailed,
  loginStart,
  LoginSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from '../components/Pages/Login/auth.slice';
import { getCategoryFailed, getCategoryStart, getCategorySuccess } from '../components/Category/category.slice';
import http from '../common/http';
import { dispatch } from 'decoders';
import {
  getProductbyidStart,
  getProductbyidSuccess,
  getProductbyidFailed,
} from '../components/Pages/ProductDetail/productDetail.slice';

export const loginUser = async (user: any, dispatch: any, navigate: any) => {
  dispatch(loginStart());

  try {
    const res = await http.post('auth/login', user);
    if (res.data.message == 'Successful') {
      localStorage.setItem('user', JSON.stringify(res.data.data));
      dispatch(LoginSuccess(res.data));
      navigate('/');
    } else {
      alert(res.data.message);
    }
  } catch (error) {
    dispatch(loginFailed());
  }
};

export const registerUser = async (user: any, dispatch: any, navigate: any) => {
  dispatch(registerStart());

  try {
    const res = await http.post('auth/register', user);
    dispatch(registerSuccess());
    console.log(res.data);
    if (res.data.message == 'Successful') {
      navigate('/login');
    }
  } catch (error) {
    dispatch(registerFailed());
  }
};

export const getAllCategory = async (dispatch: any) => {
  dispatch(getCategoryStart());
  try {
    const res = await http.get('dashboard/categories');
    dispatch(getCategorySuccess(res.data));
  } catch (error) {
    dispatch(getCategoryFailed());
  }
};

export const getCollectionById = async (id: any) => {
  const response = await http.get('/dashboard/collections/' + id);
  return response.data.data;
};

export const getProductById = async (id: any, dispatch: any) => {
  dispatch(getProductbyidStart());
  try {
    const response = await http.get('/dashboard/products/' + id);
    dispatch(getProductbyidSuccess(response.data));
  } catch (error) {
    dispatch(getProductbyidFailed());
  }
};

export const getProductTopSelling = async (id: any, count: any) => {
  const response = await http.get('/dashboard/products/top-selling-products', {
    params: { categoryId: id, count: count },
  });
  return response.data.data;
};

export const getAllByNameContains = async (name: string) => {
  const response = await http.get('/dashboard/products/name-contains', {
    params: { name: name },
  });
  return response.data.data;
};
