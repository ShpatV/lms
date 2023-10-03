import React, { useState } from "react";
import "../../components/styles/SignInAndUp.css";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import registerPic from "../../assets/SignUp-Photo/4572982.jpg";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const userService = new UserService();
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    const validationErrors = { ...errors };
    switch (fieldName) {
      case "username":
        //need to check if the username is already taken
        if (!value.trim()) {
          validationErrors.username = "Username is required";
        } else {
          validationErrors.username = null;
        }
        break;
      case "email":
        //need to check if the email is already taken
        if (!value.trim()) {
          validationErrors.email = "Email is required";
        } else if (
          !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            value
          )
        ) {
          validationErrors.email = "Invalid email address";
        } else {
          validationErrors.email = null;
        }
        break;
      case "password":
        if (!value) {
          validationErrors.password = "Password is required";
        } else if (value.length < 6) {
          validationErrors.password =
            "Password must be at least 6 characters long";
        } else {
          validationErrors.password = null;
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          validationErrors.confirmPassword = "Passwords do not match";
        } else {
          validationErrors.confirmPassword = null;
        }
        break;
      default:
        break;
    }
    setErrors(validationErrors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = {};
    if (!formData.username.trim()) {
      validationErrors.username = "Username is required";
    }
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        formData.email
      )
    ) {
      validationErrors.email = "Invalid email address";
    }
    if (!formData.password) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters long";
    }
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await userService.register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        if (response.success) {
          navigate("/assignedCourses");
        } else {
          console.error(
            "User registration failed in component:",
            response.message
          );
        }
      } catch (error) {
        console.error("User registration error:", error);
      }
    }
  };

  return (
    <Container fluid className="fr-container">
      <Row>
        <Col md={6} className="left-part  align-self-center">
          <div className="img-div d-flex justify-content-center align-items-center">
            <img src={registerPic} alt="register" className="register-img" />
          </div>
        </Col>
        <Col md={6} className="right-part ">
          <div className="fr-form-container">
            <Form className="fr-form rounded" onSubmit={handleSubmit}>
              <h3 className="fr-text">Register</h3>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a username"
                  name="username"
                  className={`input ${errors.username ? "is-invalid" : ""}`}
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <Form.Text className="text-danger">
                    {errors.username}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  className={`input ${errors.email ? "is-invalid" : ""}`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <Form.Text className="text-danger">{errors.email}</Form.Text>
                )}
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  className={`input ${errors.password ? "is-invalid" : ""}`}
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <Form.Text className="text-danger">
                    {errors.password}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  className={`input ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <Form.Text className="text-danger">
                    {errors.confirmPassword}
                  </Form.Text>
                )}
              </Form.Group>
              <Button variant="primary" type="submit" className="submit-button">
                Submit
              </Button>
              <p className="sign-inup-text mt-2">
                Already have an account? <Link to="/">Login</Link>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
