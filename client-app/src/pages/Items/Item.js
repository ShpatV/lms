import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import DeleteConfirm from "../Items/DeleteConfirm.js";
import { Link } from "react-router-dom";

const Item = ({ item, onDelete, onEditClick }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await onDelete(item.id || item.session_id);
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error confirming delete:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="course d-flex">
      {item.name && (
        <Link
          to={`/session/courseDetail/${item.id}`}
          style={{ textDecoration: "none" }}
        >
          <h3>{item.title || item.name}</h3>
        </Link>
      )}
      {item.title && (
        <Link
          to={`/courses/courseDetails/${item.course_id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <h3>{item.title || item.name}</h3>
        </Link>
      )}

      <div className="d-flex gap-3">
        {item.title && (
          <Button onClick={onEditClick} variant="light">
            Edit
          </Button>
        )}
        {item.name && (
          <Link to={`/sessions/edit/${item.session_id}`}>
            <Button variant="light">Edit</Button>
          </Link>
        )}
        <Button onClick={handleDeleteClick} variant="danger">
          Delete
        </Button>
      </div>
      {showConfirmation && (
        <DeleteConfirm
          handleConfirmDelete={handleConfirmDelete}
          handleCancelDelete={handleCancelDelete}
        />
      )}
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      start_date: PropTypes.string.isRequired,
      end_date: PropTypes.string.isRequired,
      is_published: PropTypes.bool.isRequired,
    }),
  ]).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
};

export default Item;
