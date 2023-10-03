import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../../components/styles/material.css";
import EditMaterial from "./EditMaterial";
import DeleteMaterialConfirm from "./DeleteMaterialConfirm";
import MaterialService from "../../services/MaterialService";

function Material({ materials, handleConfirmDeleteMaterial }) {
  const [expandedRow, setExpandedRow] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState(null);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const materialService = new MaterialService();
  const [allMaterials, setAllMaterials] = useState(materials);

  useEffect(() => {
    setAllMaterials(materials);
  }, [materials]);

  const handleCancelDeleteMaterial = () => {
    setShowDeleteConfirmation(false);
    setMaterialToDelete(null);
  };

  const handleRowClick = (index) => {
    if (index === expandedRow) {
      setExpandedRow(null);
    } else {
      setExpandedRow(index);
    }
  };

  const handleEditMaterial = async (materialId) => {
    try {
      const material = await materialService.getMaterialById(materialId);
      setEditingMaterial(material.data);
      setShowEditModal(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleUpdateMaterial = async (updatedMaterial) => {
    try {
      await materialService.updateMaterial(
        editingMaterial.material_id,
        updatedMaterial
      );

      const updatedMaterials = allMaterials.map((material) => {
        if (material.material_id === editingMaterial.material_id) {
          return { ...material, ...updatedMaterial };
        }
        return material;
      });

      setAllMaterials(updatedMaterials);

      setShowEditModal(false);
      setEditingMaterial(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const renderExpandedContent = (material) => (
    <div className="m-card txt">
      <p className="content">{material.content}</p>
      <div className="lowerPart" style={{ alignSelf: "flex-end" }}>
        <span>{formatDate(material.date_posted)}</span>
        <div className="m-button">
          <Button
            className="btnbtn editBtn"
            onClick={() => handleEditMaterial(material.material_id)}
          >
            Edit
          </Button>
          <Button
            onClick={(event) => {
              event.stopPropagation();
              setShowDeleteConfirmation(!showDeleteConfirmation);
              setMaterialToDelete(material);
            }}
            variant="danger"
            className="btnbtn deleteBtn"
          >
            Delete
          </Button>
          {showDeleteConfirmation && (
            <DeleteMaterialConfirm
              handleConfirmDeleteMaterial={() => {
                handleConfirmDeleteMaterial(materialToDelete.material_id);
                handleCancelDeleteMaterial();
                window.location.reload();
              }}
              handleCancelDeleteMaterial={handleCancelDeleteMaterial}
            />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="col-md-9 txt">
      {allMaterials.length === 0 && <p>No material found for this course.</p>}
      {allMaterials.map((material, rowIndex) => (
        <div
          key={rowIndex}
          className={`row material  rounded mb-2 p-2 ${
            expandedRow === rowIndex ? "expandColor" : ""
          }`}
          style={{ height: expandedRow === rowIndex ? "250px" : "100px" }}
          onClick={() => handleRowClick(rowIndex)}
        >
          <div
            className={`col-md-12  align-items-center justify-content-center expandable-row  ${
              expandedRow === rowIndex ? "" : "d-flex"
            }`}
          >
            <h5 className={`  ${expandedRow === rowIndex ? "boldTitle" : ""}`}>
              {material.title}
            </h5>
            {expandedRow === rowIndex && renderExpandedContent(material)}
          </div>
        </div>
      ))}
    {showEditModal && (
      <EditMaterial
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        onSave={handleUpdateMaterial}
        material={editingMaterial}
      />
      )}
      
    </div>
  );
}

export default Material;
