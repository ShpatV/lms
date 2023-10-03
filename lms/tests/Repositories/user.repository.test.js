import UserRepository from "../../src/repositories/user.repository";

jest.mock("../../src/config/database.js");
import client from "../../src/config/database.js";

describe("UserRepository", () => {
  beforeEach(() => {
    client.query = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("findByUsername", () => {
    it("should return a user when given a valid username", async () => {
      const mockUser = {
        User_Id: 1,
        Username: "testUser",
        Email: "test@example.com",
        Password: "hashedPassword",
        Role_Id: 2,
      };

      client.query.mockResolvedValue({ rows: [mockUser] });

      const username = "testUser";
      const user = await UserRepository.findByUsername(username);

      expect(user).toEqual(mockUser);
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [username]);
    });

    it("should return null when given a non-existent username", async () => {
      client.query.mockResolvedValue({ rows: [null] });

      const username = "nonExistentUser";
      const user = await UserRepository.findByUsername(username);

      expect(user).toBeNull();
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [username]);
    });

    it("should throw an error when there is a database error", async () => {
      const errorMessage = "Database error";
      client.query.mockRejectedValue(new Error(errorMessage));

      const username = "testUser";

      await expect(UserRepository.findByUsername(username)).rejects.toThrow(
        Error
      );
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [username]);
    });
  });

  describe("createUser", () => {
    it("should create a new user in the database", async () => {
      const newUser = {
        username: "newUser",
        email: "newuser@example.com",
        password: "testPassword",
        role_id: 2,
      };

      const mockResult = {
        rows: [
          {
            User_Id: 1,
            Username: newUser.username,
            Email: newUser.email,
            Role_Id: newUser.role_id,
          },
        ],
      };
      client.query.mockResolvedValue(mockResult);

      const createdUser = await UserRepository.createUser(newUser);

      expect(createdUser).toEqual(mockResult.rows[0]);
      expect(client.query).toHaveBeenCalledTimes(2);
    });

    it("should throw an error when there is a database error", async () => {
      const newUser = {
        username: "newUser",
        email: "newuser@example.com",
        password: "testPassword",
        role_id: 2,
      };

      const errorMessage = "Database error";
      client.query.mockRejectedValue(new Error(errorMessage));

      await expect(UserRepository.createUser(newUser)).rejects.toThrow(Error);

      expect(client.query).toHaveBeenCalledTimes(1);
    });
  });
});
