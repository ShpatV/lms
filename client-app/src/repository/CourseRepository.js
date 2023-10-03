class CourseRepository {
  async getCourseById(courseId) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/courses/${courseId}`
      );
      const course = await response.json();
      return course;
    } catch (error) {
      console.error(error.message);
    }
  }
  async createCourse(newCourse) {
    try {
      const response = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error creating course:", data.message);
        throw new Error(data.message);
      } else {
        console.log("Course created successfully:", data);
        return data;
      }
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  }
  async getAllCourses() {
    const api = "http://localhost:5000/api/courses";

    try {
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (e) {
      console.error("Error fetching courses: " + e);
      throw e;
    }
  }
  async deleteCourse(courseId) {
    const apiEndpoint = `http://localhost:5000/api/courses/${courseId}`;
    const requestOptions = {
      method: "DELETE",
    };

    const response = await fetch(apiEndpoint, requestOptions);
    return response;
  }
  async updateCourse(courseId, newData) {
    const api = `http://localhost:5000/api/courses/${courseId}`;

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
      console.error("Error updating course:", e);
      throw e;
    }
  }
  async getCoursesForStudent(studentId) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/browseCourses/courses/${studentId}`
      );
      const courses = await response.json();
      return courses;
    } catch (error) {
      console.error(error.message);
    }
  }
}
export default CourseRepository;
