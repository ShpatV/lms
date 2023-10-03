/* eslint-disable react/no-unescaped-entities */
import { React, useState } from "react";
import "../../components/styles/SignInAndUp.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import logo from "../../assets/loginPhoto/loginLogo.png";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";

import { useUser } from "../../context/UserContext";
function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser } = useUser();
  const userService = new UserService();
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Username or password are required.");
      return;
    }

    try {
      const response = await userService.login(username, password);

      if (response.success) {
        localStorage.setItem("token", response.token);
        setUser(response);
        if (response.role_id === 1) {
          navigate("/courses");
        } else if (response.role_id === 2) {
          navigate("/courses");
        }
      }
    } catch (error) {
      console.error(error);
      setError(`Incorrect username or password.`);
    }
  };

  return (
    <Container fluid className="fr-container">
      <Row>
        <Col md={6} className="left-part  align-self-center">
          <div className="img-div log-sq">
            <div className="img-di">
              <div className="login-div-img">
                <img src={logo} alt="logo" className="login-img" />
              </div>
            </div>
            <div>
              <p className="txt-quote">
                Learning is the only thing the mind never exhausts, never fears,
                and never regrets - <strong>Leonardo Da Vinci</strong>
              </p>
            </div>
          </div>
        </Col>
        <Col md={6} className="right-part ">
          <div className="fr-form-container">
            <Form className="fr-form rounded" onSubmit={handleLogin}>
              <h3 className="fr-text">Login</h3>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a username"
                  className="input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && (
                  <Form.Text className="text-danger">{error}</Form.Text>
                )}
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="submit-button mt-5"
              >
                Submit
              </Button>
              <p className="sign-inup-text mt-2">
                Don't have an account? <Link to="/register"> Register</Link>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default Login;
