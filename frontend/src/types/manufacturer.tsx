import { Collection } from './collection';

export interface Manufacturer {
  id: number;
  name: string;
  collections: Collection[];
  created_at: string;
}
export interface ManufacturerRequest {
  name: string;
  created_at?: string;
}
