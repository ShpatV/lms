import express from "express";
import CourseRepository from "../repositories/course.repository.js";
import CourseService from "../services/course.service.js";
import CourseController from "../controllers/course.controller.js";

const router = express.Router();

const courseRepo = new CourseRepository();
const courseService = new CourseService(courseRepo);
const courseController = new CourseController(courseService);

router.get("/", courseController.getAllCourses.bind(courseController));
router.get("/:id", courseController.getCourseById.bind(courseController));
router.post("/", courseController.addCourse.bind(courseController));
router.put("/:id", courseController.updateCourse.bind(courseController));
router.delete("/:id", courseController.deleteCourse.bind(courseController));

export default router;
