// AddStudentForm.js
import React, { useState } from "react";
import "../assets/styles/AddForm.css";

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

  return (
    <div className="add-form">
      <h2>Add Student</h2>
      <form onSubmit={handleAddStudent}>
        <h3>Profile</h3>
        <div className="form-group">
          <label>Student Name:</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="rounded-input"
          />
          <label>Email:</label>
          <input
            type="text"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
            className="rounded-input"
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setStudentPassword(e.target.value)}
            className="rounded-input"
          />
        </div>

        {/* University Information */}
        <h3>University Information</h3>
        <div className="form-group">
          <label>Roll No:</label>
          <input
            type="text"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            className="rounded-input"
          />
          <label>Section:</label>
          <input
            type="text"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="rounded-input"
          />

          <label>Degree:</label>
          <input
            type="text"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            className="rounded-input"
          />
          <label>Campus:</label>
          <input
            type="text"
            value={campus}
            onChange={(e) => setCampus(e.target.value)}
            className="rounded-input"
          />
        </div>

        {/* Personal Information */}
        <h3>Personal Information</h3>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="rounded-input"
          />
          <label>CNIC:</label>
          <input
            type="text"
            value={cnic}
            onChange={(e) => setCnic(e.target.value)}
            className="rounded-input"
          />
          <label>Mobile No:</label>
          <input
            type="text"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            className="rounded-input"
          />
          <label>Blood Group:</label>
          <input
            type="text"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="rounded-input"
          />
          <label>Nationality:</label>
          <input
            type="text"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            className="rounded-input"
          />
        </div>

        <h3>Contact Information</h3>

        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            value={permanentAddress}
            onChange={(e) => setPermanentAddress(e.target.value)}
            className="rounded-input"
          />
          <label>Home Phone:</label>
          <input
            type="text"
            value={homePhonePermanent}
            onChange={(e) => setHomePhonePermanent(e.target.value)}
            className="rounded-input"
          />
          <label>Postal Code:</label>
          <input
            type="text"
            value={postalCodePermanent}
            onChange={(e) => setPostalCodePermanent(e.target.value)}
            className="rounded-input"
          />
          <label>City:</label>
          <input
            type="text"
            value={cityPermanent}
            onChange={(e) => setCityPermanent(e.target.value)}
            className="rounded-input"
          />
          <label>Country:</label>
          <input
            type="text"
            value={countryPermanent}
            onChange={(e) => setCountryPermanent(e.target.value)}
            className="rounded-input"
          />
        </div>

        <button type="submit" className="gradient-button">
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudentForm;
