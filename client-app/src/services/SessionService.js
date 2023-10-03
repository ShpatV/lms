import SessionRepository from "../repository/SessionRepository";
import Session from "../models/Session";

class SessionService {
  constructor() {
    this.sessionRepository = new SessionRepository();
  }

  async getSessionById(sessionId) {
    try {
      const session = await this.sessionRepository.getSessionById(sessionId);
      return session;
    } catch (error) {
      console.error("Error in session service:", error);
      throw error;
    }
  }

  async getCourseBySessionId(sessionId) {
    try {
      const session = await this.sessionRepository.getCourseBySessionId(
        sessionId
      );
      return session;
    } catch (error) {
      console.error("Error in session service:", error);
      throw error;
    }
  }
  async getSessionByStudentId(studentId) {
    try {
      const session = await this.sessionRepository.getSessionByStudentId(
        studentId
      );

      return session;
    } catch (error) {
      console.error("Error in session service:", error);
      throw error;
    }
  }
  async createSession(newSessionData) {
    try {
      const newSession = new Session(
        newSessionData.name,
        newSessionData.start_date,
        newSessionData.end_date,
        newSessionData.is_published,
        newSessionData.course_id
      );

      console.log('newsession', newSessionData)

      const createdSession = await this.sessionRepository.createSession(
        newSession
      );
      return createdSession;
    } catch (error) {
      console.error("Error creating session:", error);
      throw error;
    }
  }

  async getSessions() {
    try {
      const data = await this.sessionRepository.getAllSessions();
      console.log("DAA" + data);
      return data;
    } catch (e) {
      console.error("Error getting sessions:", e);
      throw e;
    }
  }

  async deleteSession(sessionId) {
    try {
      const response = await this.sessionRepository.deleteSession(sessionId);

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        throw errorData;
      }
    } catch (error) {
      console.error("Error deleting session:", error);
      throw new Error(error.error);
    }
  }

  async updateSession(sessionId, newData) {
    try {
      const updatedSession = await this.sessionRepository.updateSession(
        sessionId,
        newData
      );
      return updatedSession;
    } catch (e) {
      console.error("Error updating session:", e);
      throw e;
    }
  }
}

export default SessionService;
