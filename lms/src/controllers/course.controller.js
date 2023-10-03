import HttpResponse from "../utils/http.response.js";
import { CourseInUseError } from "../errors/course.errors.js";

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: API endpoints for managing Courses.
 */
export default class CourseController {
  constructor(courseService) {
    this.courseService = courseService;
  }

  /**
   * @swagger
   * /api/courses:
   *   get:
   *     summary: Get all Courses
   *     tags: [Courses]
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/CourseArray"
   *       500:
   *         description: Internal Server Error
   *       404:
   *          description: Not Found
   */
  async getAllCourses(req, res) {
    try {
      const courses = await this.courseService.getAllCourses();

      console.log(courses);
      return HttpResponse.sendSuccess(res, courses);
    } catch (error) {
      console.error(error.message);
      HttpResponse.sendError(res, error);
    }
  }

  // GET a specific category by ID
  /**
   * @swagger
   * /api/courses/{id}:
   *   get:
   *     summary: Get a specific course by ID
   *     tags: [Courses]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID of the course
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/Course"
   *       500:
   *         description: Internal Server Error
   *       404:
   *          description: Not Found
   */
  async getCourseById(req, res) {
    try {
      const courseId = req.params.id;

      if (!Number.isInteger(Number(courseId))) {
        return HttpResponse.sendBadRequest(
          res,
          "The Course ID should be a number."
        );
      }
      const course = await this.courseService.getCourseById(courseId);

      if (course) {
        return HttpResponse.sendSuccess(res, course);
      } else {
        return HttpResponse.sendNotFound(
          res,
          `The Course with id ${courseId} does not exist.`
        );
      }
    } catch (error) {
      console.error(error.message);
      console.log(error.message + " error ne controller");
      HttpResponse.sendError(res, error);
    }
  }

  // POST a new Course
  /**
   * @swagger
   * /api/courses:
   *   post:
   *     summary: Create a new Course
   *     tags: [Courses]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/Course"
   *     responses:
   *       201:
   *         description: Created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/Course"
   *       400:
   *         description: Bad request
   */
  async addCourse(req, res) {
    try {
      const { title, description } = req.body;

      if (!title || !description) {
        return HttpResponse.sendBadRequest(
          res,
          "Title and Description are required."
        );
      }
      if (title.length < 2 || title.length > 10) {
        return HttpResponse.sendBadRequest(
          res,
          "Title should be between 2 and 10 characters."
        );
      }

      if (description.length < 4 || description.length > 50) {
        return HttpResponse.sendBadRequest(
          res,
          "Description should be between 4 and 50 characters."
        );
      }

      const newCourse = await this.courseService.createCourse(req.body);

      return HttpResponse.sendSuccess(res, newCourse.rows[0], 201);
    } catch (error) {
      console.error(error.message);
      HttpResponse.sendError(res, error);
    }
  }

  // PUT (update) an existing course
  /**
   * @swagger
   * /api/courses/{id}:
   *   put:
   *     summary: Update an existing course
   *     tags: [Courses]
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID of the course
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/Course"
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/Course"
   *       404:
   *         description: Course not found
   *       400:
   *         description: Bad request
   */
  async updateCourse(req, res) {
    try {
      const courseId = req.params.id;
      const { title, description } = req.body;

      if (!Number.isInteger(Number(courseId))) {
        return HttpResponse.sendBadRequest(
          res,
          "The Course ID should be a number."
        );
      }

      if (!title || !description) {
        return HttpResponse.sendBadRequest(
          res,
          "Title and Description are required."
        );
      }

      const courseExists = await this.courseService.courseExists(courseId);
      if (!courseExists) {
        return HttpResponse.sendNotFound(
          res,
          `The Course with id ${courseId} does not exist.`
        );
      }

      const updatedCourse = await this.courseService.updateCourse(
        courseId,
        req.body
      );

      return HttpResponse.sendSuccess(res, updatedCourse);
    } catch (error) {
      console.error(error.message);
      HttpResponse.sendError(res, error);
    }
  }

  // DELETE a Course
  /**
   * @swagger
   * /api/courses/{id}:
   *   delete:
   *     summary: Delete a Course by ID
   *     tags: [Courses]
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID of the Course
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: No content
   *       404:
   *         description: Course not found
   */

  async deleteCourse(req, res) {
    try {
      const courseId = req.params.id;

      if (!Number.isInteger(Number(courseId))) {
        return HttpResponse.sendBadRequest(
          res,
          "The Course ID should be a number."
        );
      }

      const courseExists = await this.courseService.courseExists(courseId);
      if (!courseExists) {
        return HttpResponse.sendNotFound(
          res,
          `The Course with id ${courseId} does not exist.`
        );
      }

      await this.courseService.deleteCourseById(courseId);

      return res.status(200).json({
        status: 200,
        statusText: "OK",
        message: "Course deleted successfully",
      });
    } catch (error) {
      if (error instanceof CourseInUseError) {
        return HttpResponse.sendError(res, error, 409);
      } else {
        console.error(error.message);
        return HttpResponse.sendError(res, error);
      }
    }
  }
}
