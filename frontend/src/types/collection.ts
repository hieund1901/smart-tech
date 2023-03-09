import { Category } from "./category";
import { Manufacturer } from "./manufacturer";

export interface Collection{
    id: number;
    name: string;
    category: Category;
    manufacturer: Manufacturer;
    products: Product[];
    created_at: string;
    updated_at: string;
  }

  export interface CollectionRequest{
    name: string;
    category_id: number;
    manufacturer_id: number;
  }

  


export interface Product{
  id: number;
  name: string;
  importingPrice: number;
  sellingPrice: number;
  discount: number;
  remainingAmount:number;
  soldAmount:number;
  detail:string;
  rating: number;
  imgLink: string;
  createdAt: string;
}