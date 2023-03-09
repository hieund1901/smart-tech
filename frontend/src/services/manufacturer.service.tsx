import http from '../common/http';
import { Manufacturer, ManufacturerRequest } from '../types/manufacturer';
import { ResponseType } from '../types/auth';

export const getManufacturers = async (): Promise<Manufacturer[]> => {
  const response = await http.get<ResponseType<Manufacturer[]>>('/dashboard/manufacturers/');
  return response.data.data || [];
};

export const deleteManufacturer = async (id: number) => {
  const response = await http.delete<ResponseType<Manufacturer>>(`/dashboard/manufacturers/${id}`);
  return response.data?.code;
};
export const createManufacture = async (manufacturer: ManufacturerRequest) => {
  const response = await http.post<ResponseType<Manufacturer>>('/dashboard/manufacturers', manufacturer);
  return response.data.data;
};

export const getManufactureByName = async (name: string): Promise<Manufacturer[]> => {
  const response = await http.get<ResponseType<Manufacturer[]>>('dashboard/manufacturers');
  return [];
};

export const getManufactureById = async (id: number) => {
  const response = await http.get<ResponseType<Manufacturer>>(`dashboard/manufacturers/${id}`);
  return response.data?.data;
};

export const updateManufacturer = async (id?: number, manufacturer?: ManufacturerRequest) => {
  const response = await http.post<ResponseType<Manufacturer>>(`dashboard/manufacturers/${id}`, manufacturer);
  return response.data.data;
};
