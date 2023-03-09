export interface Category{
    id: number;
    name: string;
    collections: Collection[];
    created_at: string;
    updated_at: string;
}

export interface Collection {
    id: number;
    name: string;
}

export interface CategoryRequest{
    name: string,
}