import client from "../config/database.js";
import {
  getAllSessionsQuery,
  getSessionByIdQuery,
  createSessionQuery,
  deleteSessionByIdQuery,
  updateSessionQuery,
  getSessionByStudentId,
} from "../utils/queries/session.queries.js";

export default class SessionRepository {
  static getAllSessions = async () => {
    try {
      const result = await client.query(getAllSessionsQuery);
      return result.rows;
    } catch (error) {
      throw new Error("Error fetching sessions from the database");
    }
  };

  static getSessionById = async (id) => {
    try {
      const result = await client.query(getSessionByIdQuery, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error("Error fetching session from the database");
    }
  };

  static getSessionByStudentId = async (id) => {
    try {
      const result = await client.query(getSessionByStudentId, [id]);
      return result.rows;
    } catch (error) {
      throw new Error("Error fetching sessions from the database");
    }
  };

  static deleteSessionById = async (id) => {
    try {
      const result = await client.query(deleteSessionByIdQuery, [id]);

      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw new Error("Error deleting session from the database");
    }
  };

  static createSession = async (sessionData) => {
    try {
      const { name, start_date, end_date, is_published, course_id } =
        sessionData;

        console.log('repo back', sessionData);
      const result = await client.query(createSessionQuery, [
        name,
        start_date,
        end_date,
        is_published,
        course_id,
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error("Error creating session in the database");
    }
  };

  static updateSession = async (sessionId, sessionData) => {
    try {
      const { name, start_date, end_date, is_published, course_id } =
        sessionData;
      await client.query(updateSessionQuery, [
        name,
        start_date,
        end_date,
        is_published,
        course_id,
        sessionId,
      ]);
      console.log("Session updated successfully");
    } catch (error) {
      throw new Error("Error updating session in the database");
    }
  };
}
