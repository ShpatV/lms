import CourseService from "../../src/services/course.service";
import CourseRepository from "../../src/repositories/course.repository";
import { CourseInUseError } from "../../src/errors/course.errors";

jest.mock("../../src/repositories/course.repository");

describe("CourseService", () => {
  var courseRepository;
  var courseService;
  beforeAll(() => {
    courseRepository = new CourseRepository();
    courseService = new CourseService(courseRepository);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllCourses", () => {
    it("should return all courses", async () => {
      const mockCourses = [
        { id: 1, name: "Course 1" },
        { id: 2, name: "Course 2" },
      ];

      jest
        .spyOn(courseRepository, "getAllCourses")
        .mockResolvedValue(mockCourses);

      const result = await courseService.getAllCourses();

      expect(courseRepository.getAllCourses).toHaveBeenCalled();
      expect(result).toEqual(mockCourses);
    });
  });

  describe("getCourseById", () => {
    it("should return a course by id", async () => {
      const courseId = 1;
      const mockCourse = { id: courseId, name: "Course 1" };
      jest
        .spyOn(courseRepository, "getCourseById")
        .mockResolvedValue(mockCourse);
      const result = await courseService.getCourseById(courseId);

      expect(courseRepository.getCourseById).toHaveBeenCalledWith(courseId);
      expect(result).toEqual(mockCourse);
    });
  });

  describe("createCourse", () => {
    it("should create a new course", async () => {
      const newCourse = { name: "New Course" };
      const mockCourse = { id: 1, ...newCourse };
      jest
        .spyOn(courseRepository, "createCourse")
        .mockResolvedValue(mockCourse);
      const result = await courseService.createCourse(newCourse);

      expect(courseRepository.createCourse).toHaveBeenCalledWith(newCourse);
      expect(result).toEqual(mockCourse);
    });
  });

  describe("courseExists", () => {
    it("should return true if the course exists", async () => {
      const courseId = 1;

      jest.spyOn(courseRepository, "courseExists").mockResolvedValue(true);

      const result = await courseService.courseExists(courseId);

      expect(courseRepository.courseExists).toHaveBeenCalledWith(courseId);
      expect(result).toBe(true);
    });
  });

  describe("updateCourse", () => {
    it("should update a course", async () => {
      const courseId = 1;
      const updatedCourse = { name: "Updated Course" };
      const mockUpdatedCourse = { id: courseId, ...updatedCourse };

      jest
        .spyOn(courseRepository, "updateCourse")
        .mockResolvedValue(mockUpdatedCourse);

      const result = await courseService.updateCourse(courseId, updatedCourse);

      expect(courseRepository.updateCourse).toHaveBeenCalledWith(
        courseId,
        updatedCourse
      );
      expect(result).toEqual(mockUpdatedCourse);
    });
  });

  describe("deleteCourseById", () => {
    it("should delete a course by id", async () => {
      const courseId = 1;
      const mockCourse = { id: courseId, name: "Course 1", sessions: [] };

      jest
        .spyOn(courseRepository, "getCourseById")
        .mockResolvedValue(mockCourse);
      jest
        .spyOn(courseRepository, "deleteCourseById")
        .mockResolvedValue(courseId);

      await courseService.deleteCourseById(courseId);

      expect(courseRepository.getCourseById).toHaveBeenCalledWith(courseId);
      expect(courseRepository.deleteCourseById).toHaveBeenCalledWith(courseId);
    });

    it("should throw a CourseInUseError when the course has active sessions", async () => {
      const courseId = 1;
      const mockCourse = {
        id: courseId,
        name: "Course 1",
        sessions: [{ id: 1, name: "Session 1" }],
      };

      courseRepository.getCourseById.mockResolvedValue(mockCourse);

      await expect(courseService.deleteCourseById(courseId)).rejects.toThrow(
        new CourseInUseError("Cannot delete a Course with active Sessions.")
      );

      expect(courseRepository.getCourseById).toHaveBeenCalledWith(courseId);
    });
  });
});
