export interface BasketResponseDto {
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
  name: string;
  imageUrl: string;
  price: number;
  categoryName: string;
}

export interface CreatedBasketResponseDto {
  id: string;
  title: string;
}