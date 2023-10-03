import React from "react";
import "../styles/NavBar.css";
import logo from "../../assets/logo/imss.png";
// import profileLogo from "../../assets/logo/profilePic.png";
import UserService from "../../services/UserService";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import { Nav } from "react-bootstrap";

export default function NavBar() {
  const userService = new UserService();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (user) {
        const response = await userService.logout(user.username);
        if (response.success) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/");
        }
      } else {
        console.log("User is not logged in.");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Navbar className="bg-white">
      <Container>
        <Navbar.Brand href="#">
          <img src={logo} className="logo" />
        </Navbar.Brand>
        <Nav className="navbar-nav mx-2">
          {user && user.role_id === 2 ? (
            <>
              <Nav.Link href="/assignedCourses" className="nav-link">
                Courses
              </Nav.Link>
              <Nav.Link href="/assignedSessions" className="nav-link">
                Sessions
              </Nav.Link>
            </>
          ) : null}
        </Nav>
        <Nav className="navbar-nav mx-2">
          {user && user.role_id === 1 ? (
            <>
              <Nav.Link href="/courses" className="nav-link">
                Courses
              </Nav.Link>
              <Nav.Link href="/sessions" className="nav-link">
                Sessions
              </Nav.Link>
              <Nav.Link href="/createSession" className="nav-link">
                Create Session
              </Nav.Link>
              <Nav.Link href="/createCourse" className="nav-link">
                Create Course
              </Nav.Link>
              <Nav.Link href="/studentToSession" className="nav-link">
                Enroll
              </Nav.Link>
            </>
          ) : null}
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <NavDropdown title={user.username} id="basic-nav-dropdown">
            <NavDropdown.Item href="#" onClick={handleLogout}>
              Log out
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
