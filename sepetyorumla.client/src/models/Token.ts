import type { User } from "./User";

export interface TokenResponseDto {
  token: string;
  expiration: string;
  user: User;
}