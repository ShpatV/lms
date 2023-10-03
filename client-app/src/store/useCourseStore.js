import { useState } from "react";
import CourseService from "../services/CourseService.js";

export const useCourseStore = () => {
  const [courseState, setCourseState] = useState({
    title: "",
    titleError: "",
    description: "",
    descriptionError: "",
    error: "",
    successMessage: "",
    showSuccessMessage: false,
  });
  const courseService = new CourseService();
  const clearForm = () => {
    setCourseState({
      ...courseState,
      title: "",
      description: "",
      titleError: "",
      descriptionError: "",
    });
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();

    const { title, description } = courseState;

    if (!title || !description) {
      setCourseState({
        ...courseState,
        error: "Title and description are required.",
      });
      return;
    }

    setCourseState({
      ...courseState,
      error: "",
      successMessage: "",
    });

    try {
      const newCourseData = {
        title: title,
        description: description,
      };

      console.log("Creating course with data:", newCourseData);

      const createdCourse = await courseService.createCourse(newCourseData);

      console.log("Course created successfully:", createdCourse);

      setCourseState({
        ...courseState,
        successMessage: "Course created successfully",
        showSuccessMessage: true,
      });
      clearForm();
    } catch (error) {
      console.error("Error creating course:", error);
      setCourseState({
        ...courseState,
        error: "Error creating course. Please try again.",
      });
    }
  };

  const handleClearSuccessMessage = () => {
    setCourseState({
      ...courseState,
      successMessage: "",
      showSuccessMessage: false,
    });
  };
  const handleClearForm = () => {
    setCourseState({
      ...courseState,
      title: "",
      description: "",
      titleError: "",
      descriptionError: "",
    });
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    if (title.length < 2 || title.length > 10) {
      setCourseState({
        ...courseState,
        title: title,
        titleError: "Title must be between 2 and 10 characters.",
      });
    } else {
      setCourseState({
        ...courseState,
        title: title,
        titleError: "",
      });
    }
  };

  const handleDescriptionChange = (e) => {
    const description = e.target.value;
    if (description.length < 4 || description.length > 50) {
      setCourseState({
        ...courseState,
        description: description,
        descriptionError: "Description must be between 4 and 50 characters.",
      });
    } else {
      setCourseState({
        ...courseState,
        description: description,
        descriptionError: "",
      });
    }
  };

  return {
    courseState,
    handleClearForm,
    clearForm,
    handleCreateCourse,
    handleClearSuccessMessage,
    handleTitleChange,
    handleDescriptionChange,
  };
};
