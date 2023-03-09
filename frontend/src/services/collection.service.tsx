import http from '../common/http';
import { Collection, CollectionRequest } from '../types/collection';
import { ResponseType } from '../types/auth';

export const getCollections = async (): Promise<Collection[]> => {
  const response = await http.get<ResponseType<Collection[]>>('/dashboard/collections/');
  return response.data.data || [];
};

export const deleteCollection = async (id: number) => {
  const response = await http.delete<ResponseType<Collection[]>>(`/dashboard/collections/${id}`);
  return response.data?.code;
};
export const createCollection = async (collectionRequest: CollectionRequest) => {
  const response = await http.post<ResponseType<Collection>>('/dashboard/collections', collectionRequest);
  return response.data.data;
};
export const updateCollection = async (id: number, collectionRequest: CollectionRequest) => {
  const response = await http.post<ResponseType<Collection>>(`/dashboard/collections/${id}`, collectionRequest);
  return response.data.data;
};

export const getCollectionByName = async (name: string): Promise<Collection[]> => {
  const response = await http.get<ResponseType<Collection[]>>('dashboard/collections');
  return [];
};
