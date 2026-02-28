import { mapToUserResponse } from "./users.mappers";
import { UserResponse } from "./types";
import { User } from "../../service/user.service";

test("should map user data correctly", () => {
  // given
  const mockUser: User = {
    email: "test@gmail.com",
    password: "Password123!",
    createdAt: new Date(),
  };

  // when
  const result: UserResponse = mapToUserResponse(mockUser);

  // then
  expect(result.email).toBe(mockUser.email);
  expect(result.createdAt).toBe(mockUser.createdAt);
});
