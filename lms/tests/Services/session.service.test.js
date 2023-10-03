import SessionService from "../../src/services/session.service";
import SessionRepository from "../../src/repositories/session.repository";

jest.mock("../../src/repositories/session.repository.js");

describe("SessionService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllSessions", () => {
    it("should return all sessions", async () => {
      const mockSessions = [
        { id: 1, name: "Session 1" },
        { id: 2, name: "Session 2" },
      ];

      jest
        .spyOn(SessionRepository, "getAllSessions")
        .mockResolvedValue(mockSessions);

      const result = await SessionService.getAllSessions();

      expect(SessionRepository.getAllSessions).toHaveBeenCalled();
      expect(result).toEqual(mockSessions);
    });
  });

  describe("getSessionById", () => {
    it("should return a session by id", async () => {
      const sessionId = 1;
      const mockSession = { id: sessionId, name: "Session 1" };

      jest
        .spyOn(SessionRepository, "getSessionById")
        .mockResolvedValue(mockSession);
      const result = await SessionService.getSessionById(sessionId);

      expect(SessionRepository.getSessionById).toHaveBeenCalledWith(sessionId);
      expect(result).toEqual(mockSession);
    });
  });

  describe("deleteSessionById", () => {
    it("should delete a session by id", async () => {
      const sessionId = 1;
      const mockSession = { id: sessionId, name: "Session 1" };

      jest
        .spyOn(SessionRepository, "getSessionById")
        .mockResolvedValue(mockSession);

      jest
        .spyOn(SessionRepository, "deleteSessionById")
        .mockResolvedValue(mockSession);

      const result = await SessionService.deleteSessionById(sessionId);

      expect(SessionRepository.deleteSessionById).toHaveBeenCalledWith(
        sessionId
      );

      expect(result).toEqual(mockSession);
    });
  });

  describe("createSession", () => {
    it("should create a new session", async () => {
      const sessionData = { name: "New Session" };
      const mockSession = { id: 1, ...sessionData };
      jest
        .spyOn(SessionRepository, "createSession")
        .mockResolvedValue(mockSession);
      const result = await SessionService.createSession(sessionData);

      expect(SessionRepository.createSession).toHaveBeenCalledWith(sessionData);
      expect(result).toEqual(mockSession);
    });

    // Other test cases for createSession...
  });

  describe("updateSession", () => {
    it("should update a session", async () => {
      const sessionId = 1;
      const sessionData = { name: "Updated Session" };
      const mockUpdatedSession = { id: sessionId, ...sessionData };

      jest
        .spyOn(SessionRepository, "updateSession")
        .mockResolvedValue(mockUpdatedSession);
      const result = await SessionService.updateSession(sessionId, sessionData);

      expect(SessionRepository.updateSession).toHaveBeenCalledWith(
        sessionId,
        sessionData
      );
      expect(result).toEqual(mockUpdatedSession);
    });
  });
});
