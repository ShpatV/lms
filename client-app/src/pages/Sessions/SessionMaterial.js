import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
// import { Button } from "react-bootstrap";
import "../../components/styles/material.css";
// import MaterialService from "../../services/MaterialService";

function SessionMaterial({ materials }) {
  const { user } = useUser();
  const [expandedRow, setExpandedRow] = useState(null);
  const [allMaterials, setAllMaterials] = useState(materials);

  useEffect(() => {
    setAllMaterials(materials);
  }, [materials]);

  const handleRowClick = (index, e) => {
    if (e.target.type === "checkbox") {
      return;
    }

    if (index === expandedRow) {
      setExpandedRow(null);
    } else {
      setExpandedRow(index);
    }
  };

  async function fetchIsCompleted(materialId) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/materials/${materialId}/user_material`
      );

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = await response.json();
      return data.is_completed;
    } catch (error) {
      console.error("Error fetching is_completed value:", error);
    }
  }

  async function updateMaterialProgress(material_id, user_id, is_completed) {
    const url = `http://localhost:5000/api/materials/${material_id}/progress`;
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({
      user_id,
      is_completed,
      material_id,
    });

    console.log(is_completed);
    console.log("BBBBBBBBBBBBBBBBBBBB");
    console.log(body);

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: headers,
        body: body,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const updatedMaterial = await response.json();
      return updatedMaterial;
    } catch (error) {
      console.error("Error updating material progress:", error);
      throw error;
    }
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleCheckboxClick = async (materialId, e) => {
    e.stopPropagation();
    console.log(materialId);

    try {
      const is_completed = await fetchIsCompleted(materialId);
      console.log(is_completed);
      console.log(materialId);
      console.log("AAAAAAAAAAAAAAAAAAAAAA");

      const updatedMaterial = await updateMaterialProgress(
        materialId,
        user.user_id,
        is_completed
      );

      console.log("Material progress updated:", updatedMaterial);
    } catch (error) {
      console.error("Error updating is_completed material progress:", error);
      throw error;
    }
  };

  const renderExpandedContent = (material) => (
    <div className="m-card txt">
      <p className="content">{material.content}</p>
      <div className="lowerPart" style={{ alignSelf: "flex-end" }}>
        <span>{formatDate(material.date_posted)}</span>
        <label className="form-check-label">
          <input
            type="checkbox"
            onChange={(e) => {
              handleCheckboxClick(material.material_id, e);
            }}
            checked={material.isRead}
          />
          Mark as Read
        </label>
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
          onClick={(e) => handleRowClick(rowIndex, e)}
        >
          <div
            className={`col-md-12  align-items-center justify-content-center ${
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
    </div>
  );
}

export default SessionMaterial;
