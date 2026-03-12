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