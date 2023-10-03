import React, { useState } from "react";
import "../../components/styles/createCourse.css";
import { Form, Button, Container, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import CourseService from "../../services/CourseService.js";
const EditCourse = ({ courseId, oldTitle, oldDescription, onCancelEdit }) => {
  const [newtitle, setNewTitle] = useState(oldTitle);
  const [newDescription, setNewDescription] = useState(oldDescription);
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const courseService = new CourseService();
  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleEditSubmit = async () => {
    const newData = {
      title: newtitle,
      description: newDescription,
    };

    try {
      const updatedCourse = await courseService.updateCourse(courseId, newData);
      console.log("Updated course data: ", updatedCourse);
      setSuccessMessage("Course updated successfully");
    } catch (e) {
      console.error("Error while updating course: ", e);
      setErrors("Course update failed");
      throw e;
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "12%",
        left: "0",
        background: "white",
        width: "100vw",
      }}
      className="container-fluid-md"
    >
      <div className="col custom-col-style">
        <div className="col-sm custom-col-content">
          <h1>Edit Course</h1>
        </div>
      </div>

      <div className="col custom-col-style-2">
        <div className="col-sm custom-col-content">
          <Container
            style={{
              backgroundColor: "#DFE1E2",
              borderRadius: 50,
              padding: 30,
              maxWidth: 600,
            }}
          >
            <p style={{ fontSize: "26px" }}>Edit Course</p>
            <Form
              onSubmit={handleEditSubmit}
              style={{ maxWidth: 400, margin: "0 auto" }}
            >
              <Form.Group className="mb-3" style={{ marginBottom: "4.5rem" }}>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  value={newtitle}
                  onChange={handleTitleChange}
                  style={{ borderRadius: 50, width: "100%" }}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  style={{ borderRadius: 50 }}
                  size="lg"
                  as="textarea"
                  value={newDescription}
                  onChange={handleDescriptionChange}
                  rows={5}
                />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button
                  size="lg"
                  style={{ borderRadius: 50 }}
                  variant="primary"
                  type="submit"
                >
                  EDIT
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  style={{ borderRadius: 50 }}
                  onClick={onCancelEdit}
                >
                  Cancel
                </Button>
              </div>
            </Form>
            {successMessage && (
              <Alert
                style={{ position: "fixed", bottom: "15%", left: "40%" }}
                variant="success"
              >
                <Alert.Heading>{successMessage}</Alert.Heading>
              </Alert>
            )}
            {errors && (
              <Alert
                style={{ position: "fixed", bottom: "15%", left: "40%" }}
                variant="danger"
              >
                <Alert.Heading>{errors}</Alert.Heading>
              </Alert>
            )}
          </Container>
        </div>
      </div>
    </div>
  );
};
EditCourse.propTypes = {
  courseId: PropTypes.number.isRequired,
  oldTitle: PropTypes.string.isRequired,
  oldDescription: PropTypes.string.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
};
export default EditCourse;
