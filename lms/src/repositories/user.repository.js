import client from "../config/database.js";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import {
  createUserQuery,
  findByUsernameQuery,
} from "../utils/queries/user.queries.js";
import { UserNotFoundError } from "../errors/user.errors.js";
import { SessionNotFoundError } from "../errors/userSession.errors.js";

export default class UserRepository {
  async findByUsername(username) {
    try {
      const result = await client.query(findByUsernameQuery, [username]);
      return result.rows[0];
    } catch (error) {
      console.log("Error fetching user from the database:", error);
      throw new Error("Error fetching user from the database");
    }
  }

  async createUser(user) {
    try {
      const newUser = new User(
        null,
        user.username,
        user.email,
        user.password,
        user.role_id
      );
      const studentRoleId = await this.getStudentRoleId();

      if (studentRoleId && newUser.role_id === studentRoleId) {
        newUser.role_id = studentRoleId;
      }
      console.log("Creating user in UserRepository:", newUser);
      const hashedPassword = bcrypt.hashSync(newUser.password, 10);
      const values = [
        newUser.username,
        newUser.email,
        hashedPassword,
        newUser.role_id,
      ];
      const result = await client.query(createUserQuery, values);
      console.log("User created in UserRepository:", result.rows[0]);
      return result.rows[0];
    } catch (error) {
      console.log("Error creating user in UserRepository:", error);
      throw new Error("Error creating user in the database");
    }
  }

  async getStudentRoleId() {
    try {
      const result = await client.query(
        "SELECT Role_Id FROM lms_schema.Role WHERE Name = 'Student'"
      );
      return result.rows[0]?.role_id || null;
    } catch (error) {
      console.log("Error fetching student role ID:", error);
      throw new Error("Error fetching student role ID");
    }
  }

  async getUserById(userId) {
    const query = `
    SELECT * FROM lms_schema.Users WHERE User_Id = $1
  `;

    const result = await client.query(query, [userId]);

    if (result.rows.length === 0) {
      throw new UserNotFoundError(`User with ID ${userId} not found.`);
    }

    return result.rows[0];
  }

  async getSessionById(sessionId) {
    const query = `
    SELECT * FROM lms_schema.Session WHERE Session_Id = $1
  `;

    const result = await client.query(query, [sessionId]);

    if (result.rows.length === 0) {
      throw new SessionNotFoundError(`Session with ID ${sessionId} not found.`);
    }

    return result.rows[0];
  }

  async addToSession(userId, sessionId) {
    try {
      const user = await this.getUserById(userId);

      if (!user) {
        throw new UserNotFoundError("Service: User not found.");
      }

      const session = await this.getSessionById(sessionId);

      if (!session) {
        throw new SessionNotFoundError("Service: Session not found.");
      }

      const query = `
      INSERT INTO lms_schema.User_Session (User_Id, Session_Id)
      VALUES ($1, $2)
    `;

      const values = [userId, sessionId];
      await client.query(query, values);

      return {
        success: true,
        message: "Service: User added to session successfully.",
      };
    } catch (error) {
      throw new Error(
        "Service: Error adding user to session. " + error.message
      );
    }
  }
}
