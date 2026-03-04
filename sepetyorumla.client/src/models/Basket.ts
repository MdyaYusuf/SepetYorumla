export interface Basket {
  id: string;
  title: string;
  description?: string;
  userId: string;
  username: string;
  userProfileImageUrl?: string; 
  products: ProductPreviewDto[];
  createdDate: string;
}

export interface ProductPreviewDto {
  id: string;
  name: string;
  price: number;
  categoryName: string;
}

export interface CreatedBasketResponseDto {
  id: string;
  title: string;
}