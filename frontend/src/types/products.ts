export interface Products {
  id: number;
  collection_id: number;
  name: string;
  shortName: string;
  importingPrice: number;
  sellingPrice: number;
  discount: number;
  remainingAmount: number;
  soldAmount: number;
  detail: string;
  rating: number;
  imageBase64: string;
  attributes: object;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductRequest {
  collectionId: number;
  name: string;
  shortName: string;
  importingPrice: number;
  sellingPrice: number;
  discount: number;
  remainingAmount: number;
  soldAmount: number;
  detail: string;
  rating: number;
  attributes: object;
  imgBase64: string | undefined;
}
