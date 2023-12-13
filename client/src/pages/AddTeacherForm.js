import React, { useState } from "react";
import NavBar from "../components/Navbar";

const AddTeacherForm = () => {
  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [password, setStudentpassword] = useState("");

  const handleAddTeacher = (event) => {
    event.preventDefault();
    console.log("Adding teacher:", teacherName);
  };

  const styles = {
    body: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    addForm: {
      fontFamily: "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif",
      width: "500px",
      padding: "20px",
      background: "#ffffff",
      borderRadius: "8px",
      margin: "auto",
      boxShadow: "0 0 10px rgba(118, 130, 142, 0.977)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "20px",
    },

    label: {
      fontSize: "15px",
      width: "100px",
      marginRight: "10px",
      textAlign: "left",
      marginTop: "10px",
    },

    roundedInput: {
      width: "300px",
      height: "40px",
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxSizing: "border-box",
      marginTop: "5px",
    },
    gradientButton: {
      background: "linear-gradient(to right, #6ABDC9, #22717d)",
      color: "white",
      padding: "10px 15px",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      width: "150px",
      height: "40px",
      marginTop: "10px",
      marginLeft: "150px",
    },
    gradientButtonHover: {
      filter: "brightness(1.2)",
    },
    h2: {
      color: "#22717d",
      width: "80%",
      float: "right",
    },
    inputContainer: {
      display: "flex",
      width: "100%",
      marginBottom: "10px",
    },
  };

  return (
    <>
      <NavBar></NavBar>
      <h2 style={styles.h2}>Add Teacher</h2>
      <div style={styles.addForm}>
        <form onSubmit={handleAddTeacher}>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Teacher Name:</label>
            <input
              type="text"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              style={styles.roundedInput}
            />
          </div>

          <div style={styles.inputContainer}>
            <label style={styles.label}>Email:</label>
            <input
              type="text"
              value={teacherEmail}
              onChange={(e) => setTeacherEmail(e.target.value)}
              style={styles.roundedInput}
            />
          </div>

          <div style={styles.inputContainer}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setStudentpassword(e.target.value)}
              style={styles.roundedInput}
            />
          </div>

          <button type="submit" style={styles.gradientButton}>
            Add Teacher
          </button>
        </form>
      </div>
    </>
  );
};

export default AddTeacherForm;
