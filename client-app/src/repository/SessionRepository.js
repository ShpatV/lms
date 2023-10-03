class SessionRepository {
  async getSessionById(sessionId) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/sessions/${sessionId}`
      );
      const session = await response.json();

      console.log(session);
      return session;
    } catch (error) {
      console.error(error.message);
    }
  }

  // async getCourseBySessionId(sessionId) {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/api/sessions/${sessionId}`
  //     );
  //     const session = await response.json();

  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // }
  async getSessionByStudentId(studentId) {
    try {
      console.log(studentId);
      const response = await fetch(
        `http://localhost:5000/api/sessions/student/${3}`
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating session:", error);
      throw error;
    }
  }

  async createSession(newSession) {
    try {
      const response = await fetch("http://localhost:5000/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSession)
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error creating session:", data.message);
        throw new Error(data.message);
      } else {
        console.log("Session created successfully:", data);
        return data;
      }
    } catch (error) {
      console.error("Error creating session:", error);
      throw error;
    }
  }

  async getAllSessions() {
    const api = "http://localhost:5000/api/sessions";

    try {
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (e) {
      console.error("Error fetching sessions: " + e);
      throw e;
    }
  }

  async deleteSession(sessionId) {
    const apiEndpoint = `http://localhost:5000/api/sessions/${sessionId}`;
    const requestOptions = {
      method: "DELETE",
    };

    const response = await fetch(apiEndpoint, requestOptions);
    return response;
  }

  async updateSession(sessionId, newData) {
    const api = `http://localhost:5000/api/sessions/${sessionId}`;

    try {
      const response = await fetch(api, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      const data = await response.json();
      return data;
    } catch (e) {
      console.error("Error updating session:", e);
      throw e;
    }
  }
}

export default SessionRepository;
