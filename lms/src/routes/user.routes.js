import express from "express";
import UserController from "../controllers/user.controller.js";
import UserRepository from "../repositories/user.repository.js";
import UserService from "../services/user.service.js";

const router = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

const userController = new UserController(userService);

router.post("/login", userController.login.bind(userController));
router.post("/logout", userController.logout.bind(userController));
router.post("/register", userController.register.bind(userController));
router.post(
  "/add-to-session",
  userController.addToSession.bind(userController) // Full path: http://localhost:5000/api/user/add-to-session
);

export default router;
