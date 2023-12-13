// AddStudentForm.js
import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";

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
  const [countryPermanent, setCountryPermanent] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Fetch countries from the API
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryNames = data.map((country) => country.name.common);
        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleAddStudent = (event) => {
    event.preventDefault();
    console.log("Adding student:", studentName);
    // Add logic to send data to the server or perform other actions
  };

  const styles = {
    addForm: {
      fontFamily: "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif",
      width: "60%",
      padding: "20px",
      fontFamily: "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif",
      background: "#ffffff",
      borderRadius: "8px",
      margin: "auto",
      boxShadow: "0 0 10px rgba(118, 130, 142, 0.977)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "20px",
    },
    formGroup: {
      background: "#f2f7f7",
      padding: "20px",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      marginBottom: "20px",
      width: "90%",
      boxShadow: "0 0 10px rgba(118, 130, 142, 0.977)",
      marginLeft: "40px",
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
      background: "linear-gradient(to right, #6ABDC9, #22717d)",
      color: "white",
      padding: "10px 15px",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      width: "150px",
      height: "50px",
      marginTop: "10px",
      marginLeft: "300px",
    },
    gradientButtonHover: {
      filter: "brightness(1.2)",
    },
    h2: {
      color: "#22717d",
      width: "80%",
      float: "right",
    },
  };

  return (
    <>
      <NavBar></NavBar>
      <h1 style={styles.h2}>Student Form</h1>
      <div style={styles.addForm}>
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
            <label style={styles.label}>Email:</label>
            <input
              type="text"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              style={styles.roundedInput}
            />
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setStudentPassword(e.target.value)}
              style={styles.roundedInput}
            />
          </div>

          <h3>University Information</h3>
          <div style={styles.formGroup}>
            <label style={styles.label}>Roll No:</label>
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              style={styles.roundedInput}
            />
            <label style={styles.label}>Section:</label>
            <input
              type="text"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              style={styles.roundedInput}
            />

            <label style={styles.label}>Degree:</label>
            <select
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              style={styles.roundedInput}
            >
              <option value="">Select Degree</option>
              <option value="Bachelor of Business Administration">
                Bachelor of Business Administration
              </option>
              <option value="Bachelor of Science (Accounting and Finance)">
                Bachelor of Science (Accounting and Finance)
              </option>
              <option value="Bachelor of Science (Artificial Intelligence)">
                Bachelor of Science (Artificial Intelligence)
              </option>
              <option value="Bachelor of Science (Business Analytics)">
                Bachelor of Science (Business Analytics)
              </option>
              <option value="Bachelor of Science (Civil Engineering)">
                Bachelor of Science (Civil Engineering)
              </option>
              <option value="Bachelor of Science (Computer Science)">
                Bachelor of Science (Computer Science)
              </option>
              <option value="Bachelor of Science (Cyber Security)">
                Bachelor of Science (Cyber Security)
              </option>
              <option value="Bachelor of Science (Data Science)">
                Bachelor of Science (Data Science)
              </option>
              <option value="Bachelor of Science (Electrical Engineering)">
                Bachelor of Science (Electrical Engineering)
              </option>
              <option value="Bachelor of Science (Financial Technologies)">
                Bachelor of Science (Financial Technologies)
              </option>
              <option value="Bachelor of Science (Software Engineering)">
                Bachelor of Science (Software Engineering)
              </option>
            </select>

            <label style={styles.label}>Campus:</label>
            <select
              value={campus}
              onChange={(e) => setCampus(e.target.value)}
              style={styles.roundedInput}
            >
              <option value="">Select Campus</option>
              <option value="Chiniot-Faisalabad">Chiniot-Faisalabad</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Karachi">Karachi</option>
              <option value="Lahore">Lahore</option>
              <option value="Peshawar">Peshawar</option>
            </select>
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
            <select
              value={countryPermanent}
              onChange={(e) => setCountryPermanent(e.target.value)}
              style={styles.roundedInput}
            >
              <option value="">Select Country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" style={styles.gradientButton}>
            Add Student
          </button>
        </form>
      </div>
    </>
  );
};

export default AddStudentForm;
