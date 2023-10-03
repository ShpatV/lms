import React, { useState, useEffect } from "react";
import "../../components/styles/courseDetails.css";
import CourseService from "../../services/CourseService.js";
import SessionService from "../../services/SessionService";
import AddMaterial from "../materials/AddMaterial";
import SessionMaterial from "./SessionMaterial";
import { useParams } from "react-router-dom";
import MaterialService from "../../services/MaterialService.js";

function CourseDetails() {
  const { sessionId } = useParams();
  const [courseId, setCourseId] = useState();
  const [course, setCourse] = useState(null);
  const [showAddMaterialPage, setShowAddMaterialPage] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const sessionService = new SessionService();
  const courseService = new CourseService();
  const materialService = new MaterialService();

  const toggleAddModal = () => {
    setShowAddMaterialPage(!showAddMaterialPage);
  };
  const handleMaterialCreated = (newMaterial) => {
    setMaterials((prevMaterials) => [...prevMaterials, newMaterial]);
  };

  useEffect(() => {
    const fetchCourseIdBySessionId = async () => {
      try {
        const response = await sessionService.getSessionById(sessionId);
        setCourseId(response.course_id);

        fetchCourse(response.course_id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourseIdBySessionId();
  }, [sessionId]);

  const fetchCourse = async (courseId) => {
    try {
      const response = await courseService.getCourseById(courseId);
      if (response.success) {
        setCourse(response.data);
        setDataFetched(true);
      } else {
        console.error(response.error + "error");
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        if (courseId) {
          const materialsData = await materialService.getMaterialsForCourse(
            courseId
          );
          setMaterials(materialsData.data);
          setDataFetched(true);
        }
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchMaterials();
  }, [courseId]);

  //   const handleConfirmDeleteMaterial = async (material_id) => {
  //     console.log("Deleting material with ID:", material_id);

  //     try {
  //       const idAsNumber = parseInt(material_id, 10);
  //       const response = await materialService.DeleteMaterialService(idAsNumber);
  //       console.log("Delete response:", response);

  //       if (response.status === 200) {
  //         setSuccessMessage(response.message);
  //         setErrors(null);
  //       } else {
  //         setErrors(`Error deleting material: ${response.message}`);
  //       }
  //     } catch (error) {
  //       console.error("Error deleting material:", error.message);
  //       setErrors(`Error deleting material: ${error.error.message}`);
  //     }
  //   };

  return (
    <div className="container-md  mt-3">
      {dataFetched ? (
        <div className="row">
          <div className="container-md  mt-3">
            <div className="row">
              <div className="col-md-3  firstPart ">
                {course && (
                  <div
                    className="card card-bg"
                    style={{ width: "16rem", height: "20rem" }}
                  >
                    <div className="card-body">
                      <h4 className="card-title" style={{ color: "black" }}>
                        {course.title}
                      </h4>
                      <p className="card-text">{course.description}</p>
                    </div>
                  </div>
                )}
              </div>
              <SessionMaterial materials={materials} />
            </div>

            <AddMaterial
              show={showAddMaterialPage}
              onHide={toggleAddModal}
              handleMaterialCreated={handleMaterialCreated}
              courseId={2}
            />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default CourseDetails;
