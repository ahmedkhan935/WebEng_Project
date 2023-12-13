import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h2>Welcome Admin!</h2>
      <p>Choose an option:</p>
      <Link to="/addTeacherForm" className="link-button">
        Add Teacher
      </Link>
      <br />
      <Link to="/addStudentForm" className="link-button">
        Add Student
      </Link>
    </div>
  );
};

export default LandingPage;
