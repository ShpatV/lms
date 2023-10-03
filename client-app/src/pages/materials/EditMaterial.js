import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

function EditMaterial({ show, onHide, onSave, material }) {
  if (!material) {
    return "null";
  }

  const [editedMaterial, setEditedMaterial] = useState({
    title: material.title,
    content: material.content,
    datePosted: material.date_posted,
    courseId: material.course_id,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedMaterial({
      ...editedMaterial,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    onSave(editedMaterial);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Material</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="editTitle">
            <Form.Label>Material Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              name="title"
              value={editedMaterial.title}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="editContent">
            <Form.Label>Material Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter content"
              name="content"
              value={editedMaterial.content}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="editDatePosted">
            <Form.Label>Date Posted</Form.Label>
            <Form.Control
              type="date"
              name="date_posted"
              value={editedMaterial.date_posted}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditMaterial;
