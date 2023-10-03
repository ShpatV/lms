import UserService from "../../src/services/user.service";
import UserRepository from "../../src/repositories/user.repository";
import {
  InvalidUsernameError,
  InvalidPasswordError,
  UserNotFoundError,
} from "../../src/errors/user.errors";

import bcrypt from "bcrypt";

jest.mock("../../src/repositories/user.repository.js");

describe("UserService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should return a token on successful login", async () => {
      const username = "testUser";
      const password = "testPassword";
      const mockedUser = {
        User_Id: 1,
        Username: username,
        password: bcrypt.hashSync(password, 10),
      };
      jest
        .spyOn(UserRepository, "findByUsername")
        .mockResolvedValue(mockedUser);
      const result = await UserService.login(username, password);

      expect(UserRepository.findByUsername).toHaveBeenCalledWith(username);
      expect(result).toHaveProperty("success", true);
      expect(result).toHaveProperty("message", "Login successful");
      expect(result).toHaveProperty("token");
    });

    it("should throw an error for invalid password", async () => {
      const username = "testUser";
      const password = "wrongPassword";
      const mockedUser = {
        User_Id: 1,
        Username: username,
        password: bcrypt.hashSync("testPassword", 10),
      };

      jest
        .spyOn(UserRepository, "findByUsername")
        .mockResolvedValue(mockedUser);

      await expect(UserService.login(username, password)).rejects.toThrow(
        new InvalidPasswordError("Invalid Password")
      );
    });

    it("should throw an error for non-existent user", async () => {
      const username = "nonExistentUser";
      const password = "testPassword";
      const person = {
        rows: [{ username: username, password: password }],
      };

      jest.spyOn(UserRepository, "findByUsername").mockResolvedValue(null);

      await expect(UserService.login(username, password)).rejects.toThrow(
        new UserNotFoundError("User not found")
      );
    });

    it("should throw an error for empty username", async () => {
      const username = "";
      const password = "testPassword";

      await expect(UserService.login(username, password)).rejects.toThrow(
        new Error("Internal Server Error")
      );
    });
  });

  describe("register", () => {
    it("should create a new user successfully", async () => {
      const roleId = 2;
      const newUser = {
        username: "newUser",
        email: "newuser@example.com",
        password: "testPassword",
        role_id: roleId,
        user_id: null,
      };
      jest.spyOn(UserRepository, "findByUsername").mockResolvedValue(null);
      jest.spyOn(UserRepository, "getStudentRoleId").mockResolvedValue(roleId);

      jest.spyOn(UserRepository, "createUser").mockResolvedValue(newUser);

      const createdUser = await UserService.register(newUser);

      expect(UserRepository.findByUsername).toHaveBeenCalledWith(
        newUser.username
      );

      expect(UserRepository.createUser).toHaveBeenCalledWith(newUser);
      expect(createdUser).toEqual(expect.objectContaining(newUser));
    });

    it("should throw an error for an existing username", async () => {
      const existingUser = {
        User_Id: 1,
        username: "existingUser",
        email: "existinguser@example.com",
        password: "testPassword",
        role_id: 1,
      };
      const newUser = {
        username: "existingUser", // Same username as existingUser
        email: "newuser@example.com",
        password: "testPassword",
        role_id: 2,
      };
      UserRepository.findByUsername.mockResolvedValue(existingUser);

      await expect(UserService.register(newUser)).rejects.toThrow(Error);
    });
  });
});
