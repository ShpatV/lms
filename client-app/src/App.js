import "./App.css";
import React, { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import CourseDetails from "./pages/Courses/CourseDetails";
import { UserProvider } from "./context/UserContext";

const CreateCourse = lazy(() => import("./pages/Courses/CreateCourse"));

const CreateSession = lazy(() => import("./pages/Sessions/CreateSession"));

const BrowseCourses = lazy(() => import("./pages/Courses/BrowseCourses.js"));
const BrowseSessions = lazy(() => import("./pages/Sessions/BrowseSessions.js"));
const SessionDetails = lazy(() => import("./pages/Sessions/SessionDetails.js"));
const Register = lazy(() => import("./pages/registerPage/Register.js"));
const Login = lazy(() => import("./pages/loginPage/Login.js"));
const EditCourse = lazy(() => import("./pages/Courses/EditCourse.js"));
const EditSession = lazy(() => import("./pages/Sessions/EditSession.js"));
const StudentToSession = lazy(() =>
  import("./pages/StudentToSession/StudentToSession.js")
);
const BrowseCoursesByUser = lazy(() =>
  import("./pages/CoursesUserSide/BrowseCoursesByUser")
);
const Navbar = lazy(() => import("./components/NavBar/NavBar.js"));

function App() {
  const location = useLocation();

  const routesWithoutNavbar = ["/", "/register"];

  const shouldDisplayNavbar = !routesWithoutNavbar.includes(location.pathname);

  const isLoggedIn = localStorage.getItem("token");

  return (
    <div className="App">
      <UserProvider>
        <div>
          <Suspense
            fallback={
              <div className="loading-container">
                <div className="loading-spinner"></div>
              </div>
            }
          >
            {shouldDisplayNavbar && <Navbar />}
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/createCourse"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <CreateCourse />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/createSession"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <CreateSession />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/courses"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <BrowseCourses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sessions"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <BrowseSessions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/studentToSession"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <StudentToSession />
                  </ProtectedRoute>
                }
              />

              {/* <Route
                path="/sessions/:id"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <EditSession />
                  </ProtectedRoute>
                }
              /> */}
              <Route
                path="/courses/edit/:id"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <EditCourse />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sessions/edit/:sessionId"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <EditSession />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assignedCourses"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <BrowseCoursesByUser />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/courses/courseDetails/:courseId"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <CourseDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/session/courseDetail/:sessionId"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <SessionDetails />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </UserProvider>
    </div>
  );
}

export default App;
