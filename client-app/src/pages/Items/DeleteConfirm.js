import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "../../components/styles/getCourses.css";

const DeleteConfirm = ({ handleConfirmDelete, handleCancelDelete }) => {
  
  return (
    <div className="confirmation-dialog-wrapper container-fluid d-flex justify-content-center align-items-center">
      <div className="confirmation-dialog container d-flex gap-3 flex-column justify-content-center align-items-center">
        <p className="text-dark">Are you sure you want to delete it?</p>
        <div className="container d-flex justify-content-center gap-3">
          <Button variant="danger" onClick={handleConfirmDelete}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleCancelDelete}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
};
DeleteConfirm.propTypes = {
  handleConfirmDelete: PropTypes.func.isRequired,
  handleCancelDelete: PropTypes.func.isRequired,
};

export default DeleteConfirm;
