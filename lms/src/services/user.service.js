import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { secretKey } from "../config/secret.key.config.js";
import {
  UserNotFoundError,
  UsernameAlreadyExistsError,
  InvalidPasswordError,
  InvalidUsernameError,
} from "../errors/user.errors.js";
import { SessionNotFoundError } from "../errors/userSession.errors.js";

export default class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async login(username, password) {
    try {
      if (!username) {
        throw new InvalidUsernameError("Username is required");
      }
      console.log("Attempting login for username:", username);

      const user = await this.userRepository.findByUsername(username);

      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign(
            { userId: user.User_Id, username: user.Username },
            secretKey,
            { expiresIn: "7h" }
          );

          return {
            success: true,
            message: "Login successful",
            token: token,
            role_id: user.role_id,
            username: user.username,
            user_id: user.user_id,
          };
        } else {
          throw new InvalidPasswordError("Invalid Password");
        }
      } else {
        throw new UserNotFoundError("User not found");
      }
    } catch (error) {
      if (error instanceof InvalidPasswordError) {
        console.log("Invalid Password", error.message);
      }
      if (error instanceof UserNotFoundError) {
        console.log("User not found:", error.message);
      } else {
        console.log("login service error", error);
        throw new Error("Internal Server Error");
      }
    }
  }

  async logout(username) {
    try {
      console.log("Logout request received for user:", username);

      const user = await this.userRepository.findByUsername(username);
      if (!user) {
        console.log("User not found during logout:", username);
        throw new UserNotFoundError("User not found");
      }
      user.token = null;
      return {
        success: true,
        message: "Logout successful",
      };
    } catch (error) {
      console.log("logout service error", error);
      throw new Error("Internal Server Error");
    }
  }

  async register(user) {
    try {
      const newUser = new User(
        null,
        user.username,
        user.email,
        user.password,
        user.role_id
      );
      console.log("Creating user in UserService:", newUser);
      const existingUser = await this.userRepository.findByUsername(
        newUser.username
      );

      if (existingUser) {
        throw new Error("Username already exists");
      }
      const studentRoleId = await this.userRepository.getStudentRoleId();

      if (!studentRoleId) {
        console.log("Student role not found");
        throw new Error("Student role not found");
      }
      newUser.role_id = studentRoleId;

      const createdUser = await this.userRepository.createUser(newUser);
      return createdUser;
    } catch (error) {
      if (error instanceof UsernameAlreadyExistsError) {
        console.log("Username already exists:", error.message);
        throw error;
      } else {
        console.log("register service error", error);
        throw new Error("Registration Failed");
      }
    }
  }

  async addToSession(userId, sessionId) {
    const validateId = (id, idType) => {
      if (!Number.isInteger(id) || id <= 0) {
        throw new Error(`Invalid ${idType} ID format.`);
      }
    };

    validateId(userId, "user");
    validateId(sessionId, "session");

    try {
      const user = await this.userRepository.getUserById(userId);
      const session = await this.userRepository.getSessionById(sessionId);

      if (!user) {
        throw new UserNotFoundError(`User with ID ${userId} not found.`);
      }

      if (!session) {
        throw new SessionNotFoundError(
          `Session with ID ${sessionId} not found.`
        );
      }

      await this.userRepository.addToSession(userId, sessionId);

      return {
        success: true,
        message: "User added to session successfully.",
      };
    } catch (error) {
      if (
        error instanceof UserNotFoundError ||
        error instanceof SessionNotFoundError
      ) {
        throw error;
      } else {
        console.log("addToSession service error:", error);
        throw new Error("Error adding user to session.");
      }
    }
  }
}
