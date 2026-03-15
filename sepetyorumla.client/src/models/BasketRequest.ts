export interface CreateProductInBasketDto {
  name: string;
  description?: string;
  price: number;
  storeName?: string;
  imageFile?: File;
  brand?: string;
  model?: string;
  categoryId: number;
}

export interface CreateBasketRequest {
  title: string;
  description?: string;
  products: CreateProductInBasketDto[];
}

export interface UpdateProductInBasketDto {
  id?: string;
  name: string;
  description?: string;
  price: number;
  storeName?: string;
  brand?: string;
  model?: string;
  categoryId: number;
  imageFile?: File;
}

export interface UpdateBasketRequest {
  id: string;
  title: string;
  description?: string;
  products: UpdateProductInBasketDto[];
}