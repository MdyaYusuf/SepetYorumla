import { requests } from "./axiosInstance";

export const FollowService = {
  toggleFollow: (userId: string) =>
    requests.post<null>(`Follows/${userId}`, {}),
};