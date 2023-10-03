import React, { useEffect, useState } from "react";
import "../../components/styles/createCourse.css";
import { Form, Button, Container } from "react-bootstrap";
import SessionService from "../../services/SessionService";
import CourseService from "../../services/CourseService";
import { useNavigate } from "react-router-dom";

const CreateSession = () => {
  const sessionService = new SessionService();
  const courseService = new CourseService();

  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    isPublished: false,
    courseId: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    startDate: "",
    endDate: "",
    courseId: "",
  });

  useEffect(() => {
    async function loadAllCourses() {
      try {
        const courseList = await courseService.getCourses();
        setCourses(courseList.data);
      } catch (error) {
        console.log(error);
      }
    }
    loadAllCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    // Perform form validation
    const errors = {};

    if (formData.name.trim() === "") {
      errors.name = "Name is required.";
    }

    if (formData.startDate === "") {
      errors.startDate = "Start Date is required.";
    }

    if (formData.endDate === "") {
      errors.endDate = "End Date is required.";
    }

    if (formData.courseId === null) {
      errors.courseId = "Course is required.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Create a session using the SessionService
    try {
      const newSessionData = {
        name: formData.name,
        start_date: formData.startDate,
        end_date: formData.endDate,
        is_published: formData.isPublished,
        course_id: formData.courseId,
      };

      navigate("/sessions");
      await sessionService.createSession(newSessionData);
    } catch (error) {
      // Handle error (you can show an error message)
      console.error("Error creating session:", error);
    }
  };

  return (
    <div className="container-md">
      <div className="col custom-col-style">
        <div className="col-sm custom-col-content">
          <h1>Create Session</h1>
        </div>
      </div>

      <div className="col custom-col-style-2">
        <div className="col-sm custom-col-content">
          <Container
            style={{
              backgroundColor: "#DFE1E2",
              borderRadius: 50,
              padding: 30,
              maxWidth: 600,
            }}
          >
            <Form
              style={{ maxWidth: 400, margin: "0 auto" }}
              onSubmit={handleSubmit}
            >
              <Form.Group className="mb-3" style={{ marginBottom: "4.5rem" }}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  style={{ borderRadius: 50, width: "100%" }}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  isInvalid={!!formErrors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  size="lg"
                  type="date"
                  style={{ borderRadius: 50, width: "100%" }}
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  isInvalid={!!formErrors.startDate}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.startDate}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  size="lg"
                  type="date"
                  style={{ borderRadius: 50, width: "100%" }}
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  isInvalid={!!formErrors.endDate}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.endDate}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Assign the course</Form.Label>
                <Form.Select
                  size="lg"
                  style={{ borderRadius: 50, width: "100%" }}
                  value={formData.courseId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      courseId: parseInt(e.target.value, 10),
                    })
                  }
                  isInvalid={!!formErrors.courseId}
                >
                  <option value="" disabled>
                    Select a course
                  </option>
                  {courses.map((course) => (
                    <option key={course.course_id} value={course.course_id}>
                      {course.title}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {formErrors.courseId}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3 pt-3">
                <Form.Check
                  style={{ textAlign: "start" }}
                  reverse
                  type="switch"
                  id="custom-switch"
                  label="Is Published"
                  value={formData.isPublished}
                  onChange={(e) =>
                    setFormData({ ...formData, isPublished: e.target.value })
                  }
                  isInvalid={!!formErrors.isPublished}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "30px",
                  }}
                >
                  <Button
                    className="btnCreate"
                    size="lg"
                    style={{
                      borderRadius: 50,
                      display: "flex",
                    }}
                    variant="primary"
                    type="submit"
                  >
                    Create
                  </Button>
                </div>
              </Form.Group>
            </Form>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default CreateSession;
