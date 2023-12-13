// AddStudentForm.js
import React, { useState } from "react";

const AddStudentForm = () => {
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [password, setStudentPassword] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [section, setSection] = useState("");
  const [degree, setDegree] = useState("");
  const [campus, setCampus] = useState("");
  const [dob, setDob] = useState("");
  const [cnic, setCnic] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [nationality, setNationality] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [homePhonePermanent, setHomePhonePermanent] = useState("");
  const [postalCodePermanent, setPostalCodePermanent] = useState("");
  const [cityPermanent, setCityPermanent] = useState("");
  const [countryPermanent, setCountryPermanent] = useState("");

  const handleAddStudent = (event) => {
    event.preventDefault();
    console.log("Adding student:", studentName);
    // Add logic to send data to the server or perform other actions
  };

  const styles = {
    addForm: {
      fontFamily: "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif",
      width: "900px",
      padding: "20px",
      fontFamily: "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif",
      background: "linear-gradient(to right, #cedbfa, #fefeff)",
      borderRadius: "8px",
      margin: "auto",
      marginTop: "100px",
      boxShadow: "0 0 10px rgba(118, 130, 142, 0.977)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    formGroup: {
      padding: "10px",
      borderRadius: "10px",
      display: "flex",
      flexWrap: "wrap",
      marginBottom: "20px",
      width: "90%",
      boxShadow: "0 0 10px rgba(118, 130, 142, 0.977)",
    },
    label: {
      fontSize: "15px",
      width: "30%",
      marginRight: "10px",
      textAlign: "left",
    },
    formInput: {
      width: "70%",
    },
    roundedInput: {
      width: "400px",
      height: "40px",
      padding: "8px",
      marginTop: "5px",
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
      height: "50px",
      marginTop: "10px",
      marginLeft: "350px",
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
      <h1 style={styles.h2}>Add Student</h1>
      <form onSubmit={handleAddStudent}>
        <h3>Profile</h3>
        <div style={styles.formGroup}>
          <label style={styles.label}>Student Name:</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            style={styles.roundedInput}
          />
          <label style={styles.label} style={styles.label}>
            Email:
          </label>
          <input
            type="text"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
            style={styles.roundedInput}
          />
          <label style={styles.label} style={styles.label}>
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setStudentPassword(e.target.value)}
            style={styles.roundedInput}
          />
        </div>

        <h3>University Information</h3>
        <div style={styles.formGroup}>
          <label style={styles.label} style={styles.label}>
            Roll No:
          </label>
          <input
            type="text"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            style={styles.roundedInput}
          />
          <label style={styles.label} style={styles.label}>
            Section:
          </label>
          <input
            type="text"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            style={styles.roundedInput}
          />

          <label style={styles.label} style={styles.label}>
            Degree:
          </label>
          <input
            type="text"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            style={styles.roundedInput}
          />
          <label style={styles.label} style={styles.label}>
            Campus:
          </label>
          <input
            type="text"
            value={campus}
            onChange={(e) => setCampus(e.target.value)}
            style={styles.roundedInput}
          />
        </div>

        {/* Personal Information */}
        <h3>Personal Information</h3>
        <div style={styles.formGroup}>
          <label style={styles.label}>Date of Birth:</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            style={styles.roundedInput}
          />
          <label style={styles.label}>CNIC:</label>
          <input
            type="text"
            value={cnic}
            onChange={(e) => setCnic(e.target.value)}
            style={styles.roundedInput}
          />
          <label style={styles.label}>Mobile No:</label>
          <input
            type="text"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            style={styles.roundedInput}
          />
          <label style={styles.label}>Blood Group:</label>
          <input
            type="text"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            style={styles.roundedInput}
          />
          <label style={styles.label}>Nationality:</label>
          <input
            type="text"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            style={styles.roundedInput}
          />
        </div>

        <h3>Contact Information</h3>

        <div style={styles.formGroup}>
          <label style={styles.label}>Address:</label>
          <input
            type="text"
            value={permanentAddress}
            onChange={(e) => setPermanentAddress(e.target.value)}
            style={styles.roundedInput}
          />
          <label style={styles.label}>Home Phone:</label>
          <input
            type="text"
            value={homePhonePermanent}
            onChange={(e) => setHomePhonePermanent(e.target.value)}
            style={styles.roundedInput}
          />
          <label style={styles.label}>Postal Code:</label>
          <input
            type="text"
            value={postalCodePermanent}
            onChange={(e) => setPostalCodePermanent(e.target.value)}
            style={styles.roundedInput}
          />
          <label style={styles.label}>City:</label>
          <input
            type="text"
            value={cityPermanent}
            onChange={(e) => setCityPermanent(e.target.value)}
            style={styles.roundedInput}
          />
          <label style={styles.label}>Country:</label>
          <input
            type="text"
            value={countryPermanent}
            onChange={(e) => setCountryPermanent(e.target.value)}
            style={styles.roundedInput}
          />
        </div>

        <button type="submit" style={styles.gradientButton}>
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudentForm;
