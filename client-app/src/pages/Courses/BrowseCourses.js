import React, { useState, useEffect } from "react";
import Item from "../Items/Item.js";
import EditCourse from "./EditCourse.js";
import { Alert } from "react-bootstrap";
import CourseService from "../../services/CourseService.js";

function BrowseCourses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [showEditPage, setShowEditPage] = useState(false);
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const courseService = new CourseService();
  useEffect(() => {
    async function getData() {
      try {
        const data = await courseService.getCourses();
        if (data.success) {
          setCourses(data.data);
        } else {
          console.error("API response was not successful");
        }
      } catch (e) {
        console.error("Error fetching courses: ", e);
      }
    }
    getData();
  }, []);

  const handleEditClick = (courseId) => {
    setSelectedCourseId(courseId);
    setShowEditPage(true);
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await courseService.deleteCourse(courseId);

      if (response.status === 200) {
        setSuccessMessage("Course deleted successfully");
        setErrors(null);      
    window.location.reload();
        return;
      } else {
        const errorData = await response.json();
        setErrors(`Error deleting course: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      setErrors(error.message);
    }
    
    window.location.reload();
  };

  const handleCancelEdit = () => {
    setShowEditPage(false);
  };

  return (
    <div className="container">
      <div className="container-fluid d-flex flex-column gap-5">
        {courses.map((course) => (
          <Item
            key={course.course_id}
            item={course}
            onDelete={() => handleDeleteCourse(course.course_id)}
            onEditClick={() => handleEditClick(course.course_id)}
          />
        ))}
      </div>
      {successMessage && (
        <Alert
          style={{ position: "fixed", bottom: "5%", left: "40%" }}
          variant="success"
          onClick={handleCancelEdit}
          dismissible
        >
          <Alert.Heading>{successMessage}</Alert.Heading>
        </Alert>
      )}
      {errors && (
        <Alert
          style={{ position: "fixed", bottom: "5%", left: "32%" }}
          variant="danger"
          onClick={handleCancelEdit}
          dismissible
        >
          <Alert.Heading>{errors}</Alert.Heading>
        </Alert>
      )}
      {showEditPage && selectedCourseId && (
        <div className="overlay">
          <EditCourse
            courseId={selectedCourseId}
            oldTitle={
              selectedCourseId
                ? courses.find(
                    (course) => course.course_id === selectedCourseId
                  )?.title || ""
                : ""
            }
            oldDescription={
              selectedCourseId
                ? courses.find(
                    (course) => course.course_id === selectedCourseId
                  )?.description || ""
                : ""
            }
            onCancelEdit={handleCancelEdit}
          />
        </div>
      )}
    </div>
  );
}

export default BrowseCourses;
