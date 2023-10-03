/* eslint-disable no-useless-catch */
import CourseRepository from "../repository/CourseRepository";
import Course from "../models/Course";
class CourseService {
  constructor() {
    this.courseRepository = new CourseRepository();
  }
  async getCourseById(courseId) {
    try {
      const course = await this.courseRepository.getCourseById(courseId);
      return course;
    } catch (error) {
      console.error(error + "error ne servis");
      throw error;
    }
  }
  async createCourse(newCourseData) {
    try {
      const newCourse = new Course(
        newCourseData.title,
        newCourseData.description
      );
      const createdCourse = await this.courseRepository.createCourse(newCourse);
      return createdCourse;
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  }
  async getCourses() {
    try {
      const data = await this.courseRepository.getAllCourses();
      return data;
    } catch (e) {
      console.error("Error getting courses: ", e);
      throw e;
    }
  }
  async deleteCourse(courseId) {
    try {
      const response = await this.courseRepository.deleteCourse(courseId);

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        throw errorData;
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      throw new Error(error.error);
    }
  }
  async updateCourse(courseId, newData, error) {
    try {
      const UpdatedCourse = await this.courseRepository.updateCourse(
        courseId,
        newData
      );
      return UpdatedCourse;
    } catch (e) {
      console.error("Error updating course:", error);
      throw e;
    }
  }
  async getCoursesForStudent(studentId) {
    try {
      const courses = await this.courseRepository.getCoursesForStudent(
        studentId
      );
      return courses;
    } catch (error) {
      console.error(error + "error ne servis");
      throw error;
    }
  }
}

export default CourseService;
