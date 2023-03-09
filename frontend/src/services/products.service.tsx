import http from '../common/http';
import { ResponseType } from '../types/auth';
import { ProductRequest, Products } from '../types/products';

export const getAllProducts = async (): Promise<Products[]> => {
  const response = await http.get<ResponseType<Products[]>>('dashboard/products/');
  return response.data.data || [];
};

export const createProduct = async (product: ProductRequest) => {
  const response = await http.post<ResponseType<Products>>('/dashboard/products', product);
  return response.data.data;
};

export const deleteProduct = async (id: number) => {
  const response = await http.delete<ResponseType<Products>>(`/dashboard/products/${id}`);
  return response.data?.code;
};