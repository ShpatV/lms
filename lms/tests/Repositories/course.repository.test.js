import CourseRepository from "../../src/repositories/course.repository";

jest.mock("../../src/config/database.js");
import client from "../../src/config/database.js";

describe("CourseRepository", () => {
  var courseRepository;
  beforeEach(() => {
    courseRepository = new CourseRepository();
    client.query = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllCourses", () => {
    it("should return all courses", async () => {
      const mockCourses = [
        { course_id: 1, title: "Course 1", description: "Description 1" },
        { course_id: 2, title: "Course 2", description: "Description 2" },
      ];

      client.query.mockResolvedValue({ rows: mockCourses });

      const result = await courseRepository.getAllCourses();

      expect(result).toEqual(mockCourses);
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(client.query).toHaveBeenCalledWith(expect.any(String));
    });

    it("should throw an error when there is a database error", async () => {
      const errorMessage = "Database error";
      client.query.mockRejectedValue(new Error(errorMessage));

      await expect(courseRepository.getAllCourses()).rejects.toThrow(
        new Error("Error retrieving courses.")
      );
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(client.query).toHaveBeenCalledWith(expect.any(String));
    });
  });

  describe("getCourseById", () => {
    it("should return a course when given a valid course ID", async () => {
      const courseId = 1;
      const mockRows = [
        {
          course_id: courseId,
          title: "Course 1",
          description: "Description 1",
          session_name: "Session 1",
        },
        {
          course_id: courseId,
          title: "Course 1",
          description: "Description 1",
          session_name: "Session 2",
        },
      ];
      client.query.mockResolvedValue({ rows: mockRows });

      const result = await courseRepository.getCourseById(courseId);

      console.log("result: " + result);
      expect(result).toEqual({
        course_id: courseId,
        title: "Course 1",
        description: "Description 1",
        sessions: ["Session 1", "Session 2"],
      });
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [courseId]);
    });

    it("should return null when given a non-existent course ID", async () => {
      const courseId = 100;
      client.query.mockResolvedValue({ rows: [] });

      const result = await courseRepository.getCourseById(courseId);

      expect(result).toBeNull();
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [courseId]);
    });

    it("should throw an error when there is a database error", async () => {
      const errorMessage = "Database error";
      client.query.mockRejectedValue(new Error(errorMessage));

      const courseId = 1;
      await expect(courseRepository.getCourseById(courseId)).rejects.toThrow(
        new Error("Error retrieving course by ID.")
      );
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [courseId]);
    });
  });

  describe("createCourse", () => {
    it("should create a new course in the database", async () => {
      const newCourse = {
        title: "New Course",
        description: "New Course Description",
      };
      const courseId = 1;
      const mockResult = {
        rows: [{ course_id: courseId, ...newCourse }],
      };

      client.query.mockResolvedValue(mockResult);

      const result = await courseRepository.createCourse(newCourse);

      expect(result).toEqual(mockResult);
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [
        newCourse.title,
        newCourse.description,
      ]);
    });

    it("should throw an error when there is a database error", async () => {
      const newCourse = {
        title: "New Course",
        description: "New Course Description",
      };
      const errorMessage = "Error creating course.";
      client.query.mockRejectedValue(new Error(errorMessage));

      await expect(courseRepository.createCourse(newCourse)).rejects.toThrow(
        Error
      );
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [
        newCourse.title,
        newCourse.description,
      ]);
    });
  });

  describe("courseExists", () => {
    it("should return true if the course exists", async () => {
      const courseId = 1;
      const mockResult = {
        rows: [{ course_exists: true }],
      };
      client.query.mockResolvedValue(mockResult);

      const result = await courseRepository.courseExists(courseId);

      expect(result).toBe(true);
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [courseId]);
    });

    it("should return false if the course does not exist", async () => {
      const courseId = 100;
      const mockResult = {
        rows: [{ course_exists: false }],
      };
      client.query.mockResolvedValue(mockResult);

      const result = await courseRepository.courseExists(courseId);

      expect(result).toBe(false);
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [courseId]);
    });

    it("should throw an error when there is a database error", async () => {
      const courseId = 1;
      const errorMessage = "Database error";
      client.query.mockRejectedValue(
        new Error("Error checking if course exists.")
      );

      await expect(courseRepository.courseExists(courseId)).rejects.toThrow(
        Error
      );
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [courseId]);
    });
  });

  describe("updateCourse", () => {
    it("should update a course in the database", async () => {
      const courseId = 1;
      const updatedCourse = {
        title: "Updated Course",
        description: "Updated Course Description",
      };

      const mockResult = { course_id: courseId, ...updatedCourse };

      client.query.mockResolvedValue({ rows: [mockResult] });

      const result = await courseRepository.updateCourse(
        courseId,
        updatedCourse
      );

      expect(result).toEqual(mockResult);
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [
        updatedCourse.title,
        updatedCourse.description,
        courseId,
      ]);
    });

    it("should throw an error when there is a database error", async () => {
      const courseId = 1;
      const updatedCourse = {
        title: "Updated Course",
        description: "Updated Course Description",
      };
      const errorMessage = "Error updating course.";
      client.query.mockRejectedValue(new Error(errorMessage));

      await expect(
        courseRepository.updateCourse(courseId, updatedCourse)
      ).rejects.toThrow(Error);
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [
        updatedCourse.title,
        updatedCourse.description,
        courseId,
      ]);
    });
  });

  describe("deleteCourseById", () => {
    it("should delete a course by ID from the database", async () => {
      const courseId = 1;

      await courseRepository.deleteCourseById(courseId);

      expect(client.query).toHaveBeenCalledTimes(1);
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [courseId]);
    });

    it("should throw an error when there is a database error", async () => {
      const courseId = 1;
      const errorMessage = "Database error";
      client.query.mockRejectedValue(new Error(errorMessage));

      await expect(courseRepository.deleteCourseById(courseId)).rejects.toThrow(
        Error
      );
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [courseId]);
    });
  });
});
