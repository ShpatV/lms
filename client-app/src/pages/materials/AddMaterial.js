import React, { useState } from "react";
import "../../components/styles/createCourse.css";
import { Form, Button, Modal } from "react-bootstrap";
import MaterialService from "../../services/MaterialService.js";
const AddMaterial = ({ show, onHide, courseId, handleMaterialCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [datePosted, setDatePosted] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [error, setError] = useState(null);
  const materialService = new MaterialService();

  const validateTitle = (value) => value.length >= 3 && value.length <= 25;
  const validateContent = (value) => value.length >= 10 && value.length <= 150;
  const validateDate = (value) => {
    const inputDate = new Date(value);
    const today = new Date();

    inputDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return inputDate.getTime() === today.getTime();
  };

  const handleAddClick = async () => {
    try {
      setError(null);

      if (
        !validateTitle(title) ||
        !validateContent(content) ||
        !validateDate(datePosted)
      ) {
        setError("Invalid input. Please check form fields.");
        return;
      }

      const newMaterial = {
        course_id: courseId,
        title,
        content,
        date_posted: datePosted,
      };

      const response = await materialService.createMaterial(newMaterial);
      console.log("suksesi ne material " + response.success);
      if (response.success) {
        console.log("Material created successfully:", response.data.title);
        handleMaterialCreated(response.data);
        setTitle("");
        setContent("");
        setDatePosted("");
        onHide();
      } else {
        console.error("Error creating material:", response.message);
        setError(response.message);
      }
    } catch (error) {
      console.error("Error creating material:", error);
      setError("Error creating material. Please try again later.");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Material</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Form>
          <Form.Group controlId="editTitle">
            <Form.Label>Material Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="editContent">
            <Form.Label>Material Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="editDatePosted">
            <Form.Label>Date Posted</Form.Label>
            <Form.Control
              type="date"
              value={datePosted}
              onChange={(e) => setDatePosted(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAddClick}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddMaterial;
