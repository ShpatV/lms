/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap';
import SessionService from '../../services/SessionService';
import CourseService from '../../services/CourseService';

const EditSession = () => {

  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    isPublished: false,
    courseId: 0,
  });

  const [courses, setCourses] = useState([]);

  const [formErrors, setFormErrors] = useState({
    name: "",
    startDate: "",
    endDate: "",
    courseId: "",
  });

  const sessionService = new SessionService();
  const courseService = new CourseService();



  useEffect(() => {
    async function loadFormData() {
      try {
        const sessionData = await sessionService.getSessionById(sessionId)
        setFormData({
          name: sessionData.session_name,
          startDate: sessionData.start_date,
          endDate: sessionData.end_date,
          isPublished: sessionData.is_published,
          courseId: sessionData.course_id,
        });
        console.log(sessionData);
        const courseList = await courseService.getCourses();
        setCourses(courseList.data);
      } catch (error) {
        console.log(error);
      }
    }
    loadFormData();
  }, [sessionId]);


  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

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

    // Update the session using the SessionService
    try {
      const updatedformData = {
        name: formData.name,
        start_date: formData.startDate,
        end_date: formData.endDate,
        is_published: formData.isPublished,
        course_id: formData.courseId,
      };
      
      navigate("/sessions");

      await sessionService.updateSession(sessionId, updatedformData);

    } catch (error) {
      // Handle error (you can show an error message)
      console.error("Error updating session:", error);
    }
  };

  return (
    <div className="container-md">
      <div className="col custom-col-style">
        <div className="col-sm custom-col-content">
          <h1>Edit Session</h1>
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
                <Button
                  size="lg"
                  style={{ borderRadius: 50, display: "flex" }}
                  variant="primary"
                  type="submit"
                >
                  Edit
                </Button>
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
                  value={formatDateForInput(formData.startDate)}
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
                  value={formatDateForInput(formData.endDate)}
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
                  value={formData.courseId} // Make sure to update formData with the selected course ID
                  onChange={(e) =>
                    setFormData({ ...formData, courseId: parseInt(e.target.value, 10) })
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
              </Form.Group>
            </Form>
          </Container>
        </div>
      </div>
    </div>
  )
}

export default EditSession