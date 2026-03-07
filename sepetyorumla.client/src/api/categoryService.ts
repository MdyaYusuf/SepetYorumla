import { requests } from "./axiosInstance";
import type { CategoryResponseDto } from "../models/Category";

export const CategoryService = {
  getAll: () => requests.get<CategoryResponseDto[]>("Categories"),
};