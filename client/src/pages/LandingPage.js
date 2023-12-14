// LandingPage.js
import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";

const LandingPage = () => {
  const landingPageStyles = {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif",
    backgroundColor: "rgb(255, 255, 255)",
    boxShadow: "0 4px 8px rgba(102, 118, 239, 0.836)",
    borderRadius: "8px",
    padding: "20px",
    maxWidth: "300px",
    margin: "auto",
    marginTop: "100px",
  };

  const h1Styles = {
    color: "#2525ad",
  };

  const pStyles = {
    fontSize: "1.2em",
    marginBottom: "20px",
  };

  const linkButtonStyles = {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#2b59ce",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    margin: "10px",
    transition: "background-color 0.3s ease",
  };

  const linkButtonHoverStyles = {
    backgroundColor: "#4a63a3",
  };

  return (
    <div>
      <NavBar></NavBar>
      <div style={landingPageStyles}>
        <h2 style={h1Styles}>Welcome Admin!</h2>
        <p style={pStyles}>Choose an option:</p>
        <Link
          to="/admin/addTeacher"
          className="link-button"
          style={linkButtonStyles}
          activeStyle={linkButtonHoverStyles}
        >
          Add Teacher
        </Link>
        <br />
        <Link
          to="/admin/addStudent"
          className="link-button"
          style={linkButtonStyles}
          activeStyle={linkButtonHoverStyles}
        >
          Add Student
        </Link>
        <br />
        <Link
          to="/admin/viewTeachers"
          className="link-button"
          style={linkButtonStyles}
          activeStyle={linkButtonHoverStyles}
        >
          View Teachers
        </Link>
        <br />
        <Link
          to="/admin/viewStudents"
          className="link-button"
          style={linkButtonStyles}
          activeStyle={linkButtonHoverStyles}
        >
          View Students
        </Link>
        <br />
        <Link
          to="/admin/createCourse"
          className="link-button"
          style={linkButtonStyles}
          activeStyle={linkButtonHoverStyles}
        >
          Create Course
        </Link>
        <br />
        <Link
          to="/admin/searchCourses"
          className="link-button"
          style={linkButtonStyles}
          activeStyle={linkButtonHoverStyles}
        >
          View Courses
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
