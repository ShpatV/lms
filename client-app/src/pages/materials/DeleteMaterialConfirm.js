import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "../../components/styles/getCourses.css";

const DeleteMaterialConfirm = ({handleConfirmDeleteMaterial , handleCancelDeleteMaterial }) => {
  
  return (
    <div className="confirmation-dialog-wrapper container-fluid d-flex justify-content-center align-items-center">
      <div className="confirmation-dialog container d-flex gap-3 flex-column justify-content-center align-items-center">
        <p className="text-dark">Are you sure you want to delete it?</p>
        <div className="container d-flex justify-content-center gap-3">
          <Button variant="danger" onClick={handleConfirmDeleteMaterial}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleCancelDeleteMaterial}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
};
DeleteMaterialConfirm.propTypes = {
    handleConfirmDeleteMaterial: PropTypes.func.isRequired,
    handleCancelDeleteMaterial: PropTypes.func.isRequired,
};

export default DeleteMaterialConfirm;