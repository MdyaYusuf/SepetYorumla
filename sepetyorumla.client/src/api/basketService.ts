import { requests } from "./axiosInstance";
import type {
  BasketResponseDto,
  CreatedBasketResponseDto
} from "../models/Basket";
import type { CreateBasketRequest } from "../models/BasketRequest";

export const BasketService = {
  create: (basket: CreateBasketRequest | FormData) =>
    requests.post<CreatedBasketResponseDto>("Baskets", basket),

  getAll: () =>
    requests.get<BasketResponseDto[]>("Baskets"),

  getById: (id: string) =>
    requests.get<BasketResponseDto>(`Baskets/${id}`),

  getByUserId: (userId: string) =>
    requests.get<BasketResponseDto[]>(`Baskets/user/${userId}`),

  getMyBaskets: () =>
    requests.get<BasketResponseDto[]>("Baskets/my-baskets"),

  getMyLikedBaskets: () =>
    requests.get<BasketResponseDto[]>("Baskets/my-liked-baskets"),

  getMyCommentedBaskets: () =>
    requests.get<BasketResponseDto[]>("Baskets/my-commented-baskets"),

  getSavedBaskets: () =>
    requests.get<BasketResponseDto[]>("SavedBaskets/my-saved"),

  getTopRated: (count: number) =>
    requests.get<BasketResponseDto[]>(`Baskets/top-rated/${count}`),

  toggleSave: (basketId: string) =>
    requests.post<null>("SavedBaskets/toggle", { basketId })
};