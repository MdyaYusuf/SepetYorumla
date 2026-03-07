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
};