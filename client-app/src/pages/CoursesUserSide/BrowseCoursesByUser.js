import { React, useState, useEffect } from "react";
// import { useEffect } from "react";
import CourseUserSide from "./CourseUserSide.js";
import CourseService from "../../services/CourseService.js";
import { useUser } from "../../context/UserContext.js";
import "../../components/styles/getCourses.css";
function BrowseCoursesByUser() {
  const [courses, setCourses] = useState([]);
  const courseService = new CourseService();

  const { user } = useUser();
  console.log("username i userit " + user.username);
  const studentId = user.user_id;

  useEffect(() => {
    const fetchCoursesForStudent = async () => {
      try {
        const courses = await courseService.getCoursesForStudent(studentId);
        setCourses(courses.data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };
    fetchCoursesForStudent(studentId);
  }, [studentId]);
  return (
    <div className="container">
      <div className="container-fluid d-flex flex-column gap-5">
        {courses.length === 0 ? (
          <h1 className="courseMsg">
            You are not enrolled in any courses right now
          </h1>
        ) : (
          courses.map((course) => (
            <CourseUserSide key={course.course_id} title={course.title} />
          ))
        )}
      </div>
    </div>
  );
}

export default BrowseCoursesByUser;
