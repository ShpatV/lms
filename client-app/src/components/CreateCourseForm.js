import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

function CreateCourseForm({
  title,
  titleError,
  description,
  descriptionError,
  handleTitleChange,
  handleDescriptionChange,
}) {
  return (
    <Form style={{ maxWidth: 400, margin: "0 auto" }}>
      <Form.Group className="mb-3" style={{ marginBottom: "4.5rem" }}>
        <Form.Label>Title</Form.Label>
        <Form.Control
          size="lg"
          type="text"
          style={{ borderRadius: 50, width: "100%" }}
          value={title}
          onChange={handleTitleChange}
          isInvalid={titleError}
        />
        <Form.Control.Feedback type="invalid">
          {titleError || "Please provide a title."}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          style={{ borderRadius: 50 }}
          size="lg"
          as="textarea"
          rows={5}
          value={description}
          onChange={handleDescriptionChange}
          isInvalid={descriptionError}
        />
        <Form.Control.Feedback type="invalid">
          {descriptionError || "Please provide a description."}
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
}

CreateCourseForm.propTypes = {
  title: PropTypes.string.isRequired,
  titleError: PropTypes.string,
  description: PropTypes.string.isRequired,
  descriptionError: PropTypes.string,
  handleTitleChange: PropTypes.func.isRequired,
  handleDescriptionChange: PropTypes.func.isRequired,
  handleCreateCourse: PropTypes.func.isRequired,
};

export default CreateCourseForm;
