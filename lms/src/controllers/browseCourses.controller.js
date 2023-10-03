import HttpResponse from "../utils/http.response.js";

export default class BrowseCurseController {
  constructor(browseCourseService) {
    this.browseCourseService = browseCourseService;
  }

  async getCoursesForStudent(req, res) {
    try {
      const studentId = req.params.studentId;
      const courses = await this.browseCourseService.getCoursesForStudent(
        studentId
      );
      HttpResponse.sendSuccess(res, courses);
    } catch (error) {
      console.error(error.message);
      HttpResponse.sendError(res, error);
    }
  }
}
