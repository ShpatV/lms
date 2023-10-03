import SessionRepository from "../../src/repositories/session.repository";

jest.mock("../../src/config/database.js");
import client from "../../src/config/database.js";

describe("SessionRepository", () => {
  beforeEach(() => {
    client.query = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllSessions", () => {
    it("should return all sessions", async () => {
      const mockSessions = [
        { id: 1, name: "Session 1" },
        { id: 2, name: "Session 2" },
      ];

      client.query.mockResolvedValue({ rows: mockSessions });

      const result = await SessionRepository.getAllSessions();

      expect(result).toEqual(mockSessions);
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(client.query).toHaveBeenCalledWith(expect.any(String));
    });

    it("should throw an error when there is a database error", async () => {
      const errorMessage = "Database error";
      client.query.mockRejectedValue(new Error(errorMessage));

      await expect(SessionRepository.getAllSessions()).rejects.toThrow(Error);
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(client.query).toHaveBeenCalledWith(expect.any(String));
    });
  });

  describe("getSessionById", () => {
    it("should return a session by id", async () => {
      const sessionId = 1;
      const mockSession = { id: sessionId, name: "Session 1" };
      client.query.mockResolvedValue({ rows: [mockSession] });

      const result = await SessionRepository.getSessionById(sessionId);

      expect(result).toEqual(mockSession);
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [
        sessionId,
      ]);
    });

    it("should return null when given a non-existent session id", async () => {
      const sessionId = 1;
      client.query.mockResolvedValue({ rows: [null] });

      const result = await SessionRepository.getSessionById(sessionId);

      expect(result).toBeNull();
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [
        sessionId,
      ]);
    });
  });

  describe("deleteSessionById", () => {
    it("should delete a session by id", async () => {
      const sessionId = 1;
      const session = { rows: [{ id: sessionId, name: "Session 1" }] };

      client.query.mockResolvedValue(session);

      await SessionRepository.deleteSessionById(sessionId);

      expect(client.query).toHaveBeenCalledTimes(1);
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [
        sessionId,
      ]);
    });

    it("should throw an error and rollback when there is a database error", async () => {
      const sessionId = 1;
      const errorMessage = "Database error";
      client.query.mockRejectedValue(new Error(errorMessage));

      await expect(
        SessionRepository.deleteSessionById(sessionId)
      ).rejects.toThrow(Error);
      expect(client.query).toHaveBeenCalledTimes(2);
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [
        sessionId,
      ]);
      expect(client.query).toHaveBeenCalledWith("ROLLBACK");
    });
  });

  describe("createSession", () => {
    it("should create a new session in the database", async () => {
      const newSession = {
        name: "New Session",
        start_date: "2023-08-15",
        end_date: "2023-08-30",
        is_published: true,
        course_id: 1,
      };

      const mockResult = {
        rows: [
          {
            id: 1,
            ...newSession,
          },
        ],
      };
      client.query.mockResolvedValue(mockResult);

      const createdSession = await SessionRepository.createSession(newSession);

      expect(createdSession).toEqual(mockResult.rows[0]);
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [
        newSession.name,
        newSession.start_date,
        newSession.end_date,
        newSession.is_published,
        newSession.course_id,
      ]);
    });

    it("should throw an error when there is a database error", async () => {
      const newSession = {
        name: "New Session",
        start_date: "2023-08-15",
        end_date: "2023-08-30",
        is_published: true,
        course_id: 1,
      };

      const errorMessage = "Database error";
      client.query.mockRejectedValue(new Error(errorMessage));

      await expect(SessionRepository.createSession(newSession)).rejects.toThrow(
        Error
      );
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [
        newSession.name,
        newSession.start_date,
        newSession.end_date,
        newSession.is_published,
        newSession.course_id,
      ]);
    });
  });

  describe("updateSession", () => {
    it("should update a session in the database", async () => {
      const sessionId = 1;
      const updatedSessionData = {
        name: "Updated Session",
        start_date: "2023-08-20",
        end_date: "2023-09-05",
        is_published: true,
        course_id: 2,
      };

      client.query.mockResolvedValue(updatedSessionData);

      await SessionRepository.updateSession(sessionId, updatedSessionData);

      expect(client.query).toHaveBeenCalledTimes(1);
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [
        updatedSessionData.name,
        updatedSessionData.start_date,
        updatedSessionData.end_date,
        updatedSessionData.is_published,
        updatedSessionData.course_id,
        sessionId,
      ]);
    });

    it("should throw an error when there is a database error", async () => {
      const sessionId = 1;
      const updatedSessionData = {
        name: "Updated Session",
        start_date: "2023-08-20",
        end_date: "2023-09-05",
        is_published: true,
        course_id: 2,
      };

      const errorMessage = "Database error";
      client.query.mockRejectedValue(new Error(errorMessage));

      await expect(
        SessionRepository.updateSession(sessionId, updatedSessionData)
      ).rejects.toThrow(Error);

      expect(client.query).toHaveBeenCalledWith(expect.any(String), [
        updatedSessionData.name,
        updatedSessionData.start_date,
        updatedSessionData.end_date,
        updatedSessionData.is_published,
        updatedSessionData.course_id,
        sessionId,
      ]);
    });
  });
});
