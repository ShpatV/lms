/* eslint-disable no-useless-catch */
import UserRepository from "../repository/UserRepository";
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(username, password) {
    try {
      const userData = await this.userRepository.login(username, password);
      return userData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async register(user) {
    try {
      const response = await this.userRepository.register(user);
      return response;
    } catch (error) {
      console.error("User registration error in service", error);
    }
  }
  async logout(username) {
    try {
      const response = await this.userRepository.logout(username); 
      return response;
    } catch (error) {
      console.error("Logout error in service", error);
      throw error;
    }
  }
}


export default UserService;
