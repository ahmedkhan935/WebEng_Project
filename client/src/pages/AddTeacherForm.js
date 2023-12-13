import React, { useState } from "react";

const AddTeacherForm = () => {
  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [password, setStudentpassword] = useState("");

  const handleAddTeacher = (event) => {
    event.preventDefault();
    console.log("Adding teacher:", teacherName);
  };

  const styles = {
    addForm: {
      padding: "20px",
      fontFamily: "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif",
      background: "linear-gradient(to right, #cedbfa, #fefeff)",
      borderRadius: "8px",
      margin: "auto",
      marginTop: "100px",
      marginBottom: "20px",
      boxShadow: "0 0 10px rgba(118, 130, 142, 0.977)",
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      alignItems: "center",
      width: "50%",
    },

    label: {
      fontSize: "15px",
      width: "30%",
      marginRight: "10px",
      textAlign: "left",
      marginTop: "10px",
    },

    inputContainer: {
      display: "flex",
      marginBottom: "10px",
    },

    roundedInput: {
      width: "80%",
      height: "40px",
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxSizing: "border-box",
    },
    gradientButton: {
      background: "linear-gradient(to right, #4a63a3, #2b59ce)",
      color: "white",
      padding: "10px 15px",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      width: "150px",
      height: "40px",
      marginTop: "10px",
      marginLeft: "100px",
    },
    gradientButtonHover: {
      filter: "brightness(1.2)",
    },
    h2: {
      color: "#2525ad",
    },
  };

  return (
    <div style={styles.addForm}>
      <h2 style={styles.h2}>Add Teacher</h2>
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
  );
};

export default AddTeacherForm;
