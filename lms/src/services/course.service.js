import { CourseInUseError } from "../errors/course.errors.js";
export default class CourseService {
  constructor(courseRepository) {
    this.courseRepository = courseRepository;
  }
  async getAllCourses() {
    try {
      return await this.courseRepository.getAllCourses();
    } catch (error) {
      console.error(error.message);
      throw new Error("error retrieving courses.");
    }
  }
  async getCourseById(courseId) {
    try {
      const result = await this.courseRepository.getCourseById(courseId);

      return result || null;
    } catch (error) {
      console.error(error.message);
      throw new Error("error retrieving course.");
    }
  }
  async createCourse(newCourse) {
    try {
      const result = await this.courseRepository.createCourse(newCourse);

      return result;
    } catch (error) {
      console.error(error.message);
      throw new Error("Error creating course.");
    }
  }
  async courseExists(courseId) {
    try {
      const result = await this.courseRepository.courseExists(courseId);

      return result;
    } catch (error) {
      console.error(error.message);
      throw new Error("Error checking if course exists.");
    }
  }
  async updateCourse(courseId, updatedCourse) {
    try {
      const result = await this.courseRepository.updateCourse(
        courseId,
        updatedCourse
      );

      return result;
    } catch (error) {
      console.error(error.message);
      throw new Error("Error updating course.");
    }
  }
  async deleteCourseById(courseId) {
    try {
      const course = await this.courseRepository.getCourseById(courseId);

      if (course.sessions && course.sessions.length > 0) {
        throw new CourseInUseError(
          "Cannot delete a Course with active Sessions."
        );
      }

      await this.courseRepository.deleteCourseById(courseId);
    } catch (error) {
      if (error instanceof CourseInUseError) {
        throw error;
      } else {
        console.error(error.message);
        throw new Error("Error deleting course.");
      }
    }
  }
}
