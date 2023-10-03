import express from "express";
import BrowseCourseController from "../controllers/browseCourses.controller.js";
import BrowseCourseService from "../services/browseCourse.service.js";
import BrowseCourseRepository from "../repositories/courseBrowse.repository.js";

const router = express.Router();

const browseRepository = new BrowseCourseRepository();
const browseService = new BrowseCourseService(browseRepository);
const browseController = new BrowseCourseController(browseService);

router.get(
  "/courses/:studentId",
  browseController.getCoursesForStudent.bind(browseController)
);

export default router;
