import User from "../models/user.model.js";
import HttpResponse from "../utils/http.response.js";

export default class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async login(req, res) {
    const { username, password } = req.body;
    try {
      console.log(username);
      console.log(password);
      const loginResult = await this.userService.login(username, password);

      HttpResponse.sendSuccess(res, loginResult, 200);
    } catch (error) {
      HttpResponse.sendError(res, error);
    }
  }

  async logout(req, res) {
    const { username } = req.body;
    try {
      const logoutResult = await this.userService.logout(username);
      HttpResponse.sendSuccess(res, logoutResult, 200);
    } catch (error) {
      HttpResponse.sendError(res, error);
    }
  }

  async register(req, res) {
    const { username, email, password } = req.body;
    try {
      const newUser = new User(null, username, email, password);
      const createdUser = await this.userService.register(newUser);
      HttpResponse.sendSuccess(res, createdUser, 201);
    } catch (error) {
      console.log("register controller error", error);
      HttpResponse.sendError(res, error);
    }
  }

  async addToSession(req, res) {
    const { userId, sessionId } = req.body;
    try {
      const result = await this.userService.addToSession(userId, sessionId);
      HttpResponse.sendSuccess(res, result, 200);
    } catch (error) {
      HttpResponse.sendError(res, error);
    }
  }
}
