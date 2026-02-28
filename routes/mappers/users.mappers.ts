import { User } from "../../service/user.service";
import { UserResponse } from "./types";

export const mapToUserResponse = (user: User): UserResponse => {
  return {
    email: user.email,
    createdAt: user.createdAt
  };
};

export const mapToUsersListResponse = (users: User[]): UserResponse[] => {
  return users.map((user) => mapToUserResponse(user));
};