import type { User } from "./User";

export interface TokenResponseDto {
  accessToken: string;
  accessTokenExpiration: string;
  user: User;
}