import SessionService from "../services/session.service.js";
/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: API endpoints for managing Sessions.
 */
export default class SessionController {
  constructor(sessionService) {
    this.sessionService = sessionService;
  }
  /**
   * @swagger
   * /api/sessions:
   *   get:
   *     summary: Get all Sessions
   *     tags: [Sessions]
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: "#/components/schemas/Session"
   *       500:
   *         description: Internal Server Error
   */

  async getAllSessions(req, res) {
    try {
      const sessions = await SessionService.getAllSessions();
      res.status(200).json(sessions);
    } catch (error) {
      console.log("getAllSessions controller error", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /**
   * @swagger
   * /api/sessions/{id}:
   *   get:
   *     summary: Get a specific session by ID
   *     tags: [Sessions]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID of the session
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/Session"
   *       404:
   *         description: Session not found
   */

  async getSessionById(req, res) {
    try {
      const sessionId = req.params.id;
      console.log("sessionId", sessionId);
      const session = await SessionService.getSessionById(sessionId);
      res.status(200).json(session);
    } catch (error) {
      console.log("getSessionById controller error", error);
      res.status(404).json({ error: "Session not found" });
    }
  }

  /**
   * @swagger
   * /api/sessions/student/{id}:
   *   get:
   *     summary: Get sessions by student ID
   *     tags: [Sessions]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID of the student
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/Session"
   *       404:
   *         description: Session not found
   */

  async getSessionByStudentId(req, res) {
    try {
      const studentId = req.params.id;
      console.log("studentId", studentId);
      const session = await SessionService.getSessionByStudentId(studentId);
      res.status(200).json(session);
    } catch (error) {
      console.log("getSessionById controller error", error);
      res.status(404).json({ error: "Session not found" });
    }
  }

  /**
   * @swagger
   * /api/sessions/{id}:
   *   delete:
   *     summary: Delete a session by ID
   *     tags: [Sessions]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID of the session
   *     responses:
   *       204:
   *         description: No content
   *       404:
   *         description: Session not found
   */
  async deleteSession(req, res) {
    try {
      const sessionId = req.params.id;
      await SessionService.deleteSessionById(sessionId);
      res.status(200).json({ message: "Session deleted successfully" });
    } catch (error) {
      console.log("deleteSession controller error", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /**
   * @swagger
   * /api/sessions:
   *   post:
   *     summary: Create a new session
   *     tags: [Sessions]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/Session"
   *     responses:
   *       201:
   *         description: Created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/Session"
   *       400:
   *         description: Bad request
   */
  async createSession(req, res) {
    try {
      const { name, start_date, end_date, is_published, course_id } = req.body;

      // data validation
      if (!name || typeof name !== "string" || name.length === 0) {
        return res.status(400).json({ error: "Invalid name provided" });
      }

      if (!start_date || !end_date) {
        return res
          .status(400)
          .json({ error: "Both start_date and end_date are required" });
      }

      if (typeof is_published !== "boolean") {
        return res.status(400).json({
          error: "Is Published should be boolean, either false or true",
        });
      }

      // check if course with that id exists
      // const courseExists = await CourseService.getCourseById(course_id);
      // if (!courseExists) {
      //   return res.status(404).json({ error: "Course not found" });
      // }

      const sessionData = {
        name,
        start_date,
        end_date,
        is_published,
        course_id,
      };

      const newSession = await SessionService.createSession(sessionData);
      res.status(201).json(newSession);
    } catch (error) {
      console.log("createSession controller error", error);
      res.status(500).json({ error: "Failed to create session" });
    }
  }

  /**
   * @swagger
   * /api/sessions/{id}:
   *   put:
   *     summary: Update an existing session
   *     tags: [Sessions]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID of the session
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/Session"
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/Session"
   *       404:
   *         description: Session not found
   *       400:
   *         description: Bad request
   */
  async updateSession(req, res) {
    try {
      const sessionId = req.params.id;
      const { name, start_date, end_date, is_published, course_id } = req.body;

      // Data validation
      if (!name || typeof name !== "string" || name.length === 0) {
        return res.status(400).json({ error: "Invalid name provided" });
      }

      if (!start_date || !end_date) {
        return res
          .status(400)
          .json({ error: "Both start_date and end_date are required" });
      }

      // check if course with that id exists
      // const courseExists = await CourseService.getCourseById(course_id);
      // if (!courseExists) {
      //   return res.status(404).json({ error: "Course not found" });
      // }

      const sessionData = {
        name,
        start_date,
        end_date,
        is_published,
        course_id,
      };

      const updatedSession = await SessionService.updateSession(
        sessionId,
        sessionData
      );
      res.status(200).json(updatedSession);
    } catch (error) {
      console.log("updateSession controller error", error);
      res.status(500).json({ error: "Failed to update session" });
    }
  }
}
