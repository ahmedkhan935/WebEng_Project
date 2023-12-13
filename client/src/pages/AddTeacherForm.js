// AddTeacherForm.js

import React, { useState } from "react";
import "../assets/styles/AddForm.css";

const AddTeacherForm = () => {
  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [password, setStudentpassword] = useState("");

  const handleAddTeacher = (event) => {
    event.preventDefault();
    console.log("Adding teacher:", teacherName);
  };

  return (
    <div className="add-form">
      <h2 style={{ marginLeft: "80px" }}>Add Teacher</h2>
      <form onSubmit={handleAddTeacher}>
        <label>
          Teacher Name:
          <input
            type="text"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            className="rounded-input"
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            value={teacherEmail}
            onChange={(e) => setTeacherEmail(e.target.value)}
            className="rounded-input"
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setStudentpassword(e.target.value)}
            className="rounded-input"
          />
        </label>
        <br />

        <button type="submit" className="gradient-button">
          Add Teacher
        </button>
      </form>
    </div>
  );
};

export default AddTeacherForm;
