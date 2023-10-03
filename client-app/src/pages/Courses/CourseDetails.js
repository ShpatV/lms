import React, { useState, useEffect } from "react";
import "../../components/styles/courseDetails.css";
import { Alert, Button } from "react-bootstrap";
import CourseService from "../../services/CourseService.js";
import AddMaterial from "../materials/AddMaterial";
import Material from "../materials/Material";
import { useParams } from "react-router-dom";
import MaterialService from "../../services/MaterialService.js";

function CourseDetails() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [showAddMaterialPage, setShowAddMaterialPage] = useState(false);
  const [materials, setMaterials] = useState([]);
  const courseService = new CourseService();
  const materialService = new MaterialService();
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const toggleAddModal = () => {
    setShowAddMaterialPage(!showAddMaterialPage);
  };
  const handleMaterialCreated = (newMaterial) => {
    setMaterials((prevMaterials) => [...prevMaterials, newMaterial]);
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await courseService.getCourseById(courseId);
        if (response.success) {
          setCourse(response.data);
        } else {
          console.error(response.error + "error");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };
    const fetchMaterials = async () => {
      try {
        const materialsData = await materialService.getMaterialsForCourse(
          courseId
        );
        setMaterials(materialsData.data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };
    fetchCourse();
    fetchMaterials();
  }, [courseId]);

  const handleConfirmDeleteMaterial = async (material_id) => {
    console.log("Deleting material with ID:", material_id);

    try {
      const idAsNumber = parseInt(material_id, 10);
      const response = await materialService.DeleteMaterialService(idAsNumber);
      console.log("Delete response:", response);

      if (response.status === 200) {
        setSuccessMessage(response.message);
        setErrors(null);
      } else {
        setErrors(`Error deleting material: ${response.message}`);
      }
    } catch (error) {
      console.error("Error deleting material:", error.message);
      setErrors(`Error deleting material: ${error.error.message}`);
    }
  };
  console.log("materiale " + materials.length);
  return (
    <div className="container-md  mt-3">
      <div className="row">
        <div className="col-md-3  firstPart ">
          {course && (
            <div
              className="card card-bg"
              style={{ width: "16rem", height: "20rem" }}
            >
              <div className="card-body">
                <h4 className="card-title">{course.title}</h4>
                <p className="card-text">{course.description}</p>
              </div>
            </div>
          )}
          <Button
            onClick={toggleAddModal}
            className="btnMaterial"
            type="submit"
          >
            Add Material
          </Button>
        </div>
        <Material
          materials={materials}
          handleConfirmDeleteMaterial={handleConfirmDeleteMaterial}
        />
      </div>

      {successMessage && (
        <Alert
          style={{ position: "fixed", bottom: "5%", left: "40%" }}
          variant="success"
          dismissible
        >
          <Alert.Heading>{successMessage}</Alert.Heading>
        </Alert>
      )}
      {errors && (
        <Alert
          style={{ position: "fixed", bottom: "5%", left: "32%" }}
          variant="danger"
          dismissible
        >
          <Alert.Heading>{errors}</Alert.Heading>
        </Alert>
      )}
      <AddMaterial
        show={showAddMaterialPage}
        onHide={toggleAddModal}
        handleMaterialCreated={handleMaterialCreated}
        courseId={courseId}
      />
    </div>
  );
}

export default CourseDetails;
