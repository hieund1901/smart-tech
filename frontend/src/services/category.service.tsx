import http from '../common/http';
import { ResponseType } from '../types/auth';
import { Category, CategoryRequest } from '../types/category';

export const getCategories = async (): Promise<Category[]> => {
  const response = await http.get<ResponseType<Category[]>>('/dashboard/categories/');
  return response.data.data || [];
};

export const deleteCategory = async (id: number) => {
  const response = await http.delete<ResponseType<Category[]>>(`/dashboard/categories/${id}`);
  return response.data?.code;
};

export const createCategory = async (category: CategoryRequest) => {
  const response = await http.post<ResponseType<Category>>('/dashboard/categories', category);
  return response.data.data;
};

export const getCategoryByName = async (name: string): Promise<Category[]> => {
  const response = await http.get<ResponseType<Category[]>>('dashboard/categories');
  return [];
};

export const updateCategory = async (id?: number, category?: CategoryRequest) => {
  const response = await http.post<ResponseType<Category>>(`/dashboard/categories/${id}`, category);
  return response.data.data;
};

export const getCategoryById = async (id: number): Promise<Category> => {
  const category: Category = {
    id: 0,
    name: '',
    collections: [],
    created_at: '',
    updated_at: ''
  };
  const response = await http.get<ResponseType<Category>>(`dashboard/categories/${id}`);
  return response.data.data || category;
};
