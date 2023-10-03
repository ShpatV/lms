import SessionRepository from "../repositories/session.repository.js";

export default class SessionService {
  static getAllSessions = async () => {
    try {
      return await SessionRepository.getAllSessions();
    } catch (error) {
      console.log("session service getAllSessions error", error);
    }
  };

  static getSessionById = async (id) => {
    try {
      return await SessionRepository.getSessionById(id);
    } catch (error) {
      console.log("session service getSessionById error", error);
    }
  };

  static getSessionByStudentId = async (id) => {
    try {
      return await SessionRepository.getSessionByStudentId(id);
    } catch (error) {
      console.log("session service getSessionByStudentId error", error);
    }
  };
  static deleteSessionById = async (id) => {
    try {
      return await SessionRepository.deleteSessionById(id);
    } catch (error) {
      console.log("session service deleteSessionById error", error);
    }
  };

  static createSession = async (sessionData) => {
    try {
      return await SessionRepository.createSession(sessionData);
    } catch (error) {
      console.log("session service createSession error", error);
    }
  };

  static updateSession = async (sessionId, sessionData) => {
    try {
      return await SessionRepository.updateSession(sessionId, sessionData);
    } catch (error) {
      console.log("session service updateSession error", error);
    }
  };
}
