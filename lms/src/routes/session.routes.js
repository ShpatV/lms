import express from "express";
import SessionController from "../controllers/session.controller.js";
import SessionService from "../services/session.service.js";

const router = express.Router();

const sessionService = new SessionService();
const sessionController = new SessionController(sessionService);

router.get("/", sessionController.getAllSessions);

router.get("/:id", sessionController.getSessionById);

router.get("/student/:id", sessionController.getSessionByStudentId);

router.post("/", sessionController.createSession);

router.put("/:id", sessionController.updateSession);

router.delete("/:id", sessionController.deleteSession);

export default router;
