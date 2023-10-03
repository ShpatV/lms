import client from "../config/database.js";
import {
  getAllCoursesQuery,
  getCourseByIdQuery,
  createCourseQuery,
  courseExistsQuery,
  deleteCourseByIdQuery,
  updateCourseQuery,
} from "../utils/queries/course.queries.js";

export default class CourseRepository {
  async getAllCourses() {
    try {
      const result = await client.query(getAllCoursesQuery);

      return result.rows;
    } catch (error) {
      throw new Error("Error retrieving courses.");
    }
  }
  async getCourseById(courseId) {
    try {
      const result = await client.query(getCourseByIdQuery, [courseId]);

      if (result.rows.length === 0) {
        return null;
      }

      const course = {
        course_id: result.rows[0].course_id,
        title: result.rows[0].title,
        description: result.rows[0].description,
        sessions: result.rows
          .filter((row) => row.session_name !== null)
          .map((row) => row.session_name),
      };

      return course || null;
    } catch (error) {
      throw new Error("Error retrieving course by ID.");
    }
  }

  async createCourse(newCourse) {
    try {
      const { title, description } = newCourse;

      const result = await client.query(createCourseQuery, [
        title,
        description,
      ]);

      return result;
    } catch (error) {
      throw new Error("Error creating course.");
    }
  }
  async courseExists(courseId) {
    try {
      const result = await client.query(courseExistsQuery, [courseId]);

      return result.rows[0].course_exists;
    } catch (error) {
      throw new Error("Error checking if course exists.");
    }
  }
  async updateCourse(courseId, updatedCourse) {
    try {
      const { title, description } = updatedCourse;

      const result = await client.query(updateCourseQuery, [
        title,
        description,
        courseId,
      ]);

      return result.rows[0];
    } catch (error) {
      throw new Error("Error updating course.");
    }
  }
  async deleteCourseById(courseId) {
    try {
      await client.query(deleteCourseByIdQuery, [courseId]);
    } catch (error) {
      throw new Error("Error deleting course.");
    }
  }
}
