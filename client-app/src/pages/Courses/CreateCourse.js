import React from "react";
import "../../components/styles/createCourse.css";
import { Button, Container, Alert } from "react-bootstrap";
import CreateCourseForm from "../../components/CreateCourseForm";
import { useCourseStore } from "../../store/useCourseStore";
import { useNavigate } from "react-router-dom";

function CreateCourse() {
  const navigate = useNavigate();
  const {
    courseState,
    handleCreateCourse,
    handleClearSuccessMessage,
    handleTitleChange,
    handleDescriptionChange,
  } = useCourseStore();

  const GoToBrowseCourses = () => {
    navigate("/courses");
  };
  return (
    <div className="container-md">
      <div className="col custom-col-style">
        <div className="col-sm custom-col-content">
          <h1>Create Course</h1>
        </div>
      </div>

      <div className="col custom-col-style-2">
        <div className="col-sm custom-col-content">
          {courseState.error && (
            <Alert variant="danger">{courseState.error}</Alert>
          )}
          {courseState.showSuccessMessage && courseState.successMessage && (
            <Alert variant="success">{courseState.successMessage}</Alert>
          )}
          <Button
            className="btnCreate"
            size="lg"
            style={{
              borderRadius: 50,
              display: "flex",
            }}
            variant="primary"
            type="submit"
            onClick={async (e) => {
              e.preventDefault();
              await handleCreateCourse(e);
              handleClearSuccessMessage();
              GoToBrowseCourses();
            }}
          >
            Create
          </Button>
          <Container
            style={{
              backgroundColor: "#DFE1E2",
              borderRadius: 50,
              padding: 30,
              maxWidth: 600,
            }}
          >
            <CreateCourseForm
              title={courseState.title}
              titleError={courseState.titleError}
              description={courseState.description}
              descriptionError={courseState.descriptionError}
              handleTitleChange={handleTitleChange}
              handleDescriptionChange={handleDescriptionChange}
              handleCreateCourse={handleCreateCourse}
            />
          </Container>
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;
