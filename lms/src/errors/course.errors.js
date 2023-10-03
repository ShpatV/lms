export class CourseInUseError extends Error {
  constructor(message) {
    super(message);
    this.name = "COURSE_IN_USE";
    this.statusCode = 409;
  }
}
