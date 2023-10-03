class UserRepository {
  async login(username, password) {
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const user = await response.json();
      return user.data;
    } catch (error) {
      console.error(error.message);
    }
  }
  async register(user) {
    try {
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const registeredUser = await response.json();
      return registeredUser;
    } catch (error) {
      console.error(error.message);
    }
  }
  
  async logout(username) {
    try {
      const response = await fetch("http://localhost:5000/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Logout error in repository", error);
      throw error;
    }
  }
}

export default UserRepository;
