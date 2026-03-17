import type { UserListItem } from "../models/User";
import { requests } from "./axiosInstance";

export const FollowService = {
  toggleFollow: (userId: string) =>
    requests.post<null>(`Follows/${userId}`, {}),

  getFollowers: (userId: string) =>
    requests.get<UserListItem[]>(`Follows/${userId}/followers`),

  getFollowing: (userId: string) =>
    requests.get<UserListItem[]>(`Follows/${userId}/following`),
};