export default class BrowseCourseService {
  constructor(browseCourseRepository) {
    this.browseCourseRepository = browseCourseRepository;
  }

  async getCoursesForStudent(studentId) {
    try {
      return await this.browseCourseRepository.getCoursesForStudent(studentId);
    } catch (error) {
      console.error(error.message);
      throw new Error("Error getting courses for student.");
    }
  }
}
