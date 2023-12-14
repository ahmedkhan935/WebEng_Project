import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const UpdateStudentForm = () => {
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
  const [countries, setCountries] = useState([]);

  useEffect(() => {
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

  const handleUpdateStudent = (event) => {
    event.preventDefault();
    console.log("Updating student:", studentName);
  };

  const styles = {
    addForm: {
      fontFamily: "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif",
      width: "60%",
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
    roundedInput: {
      width: "400px",
      height: "40px",
      marginBottom: "15px",
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
      <NavBar>
        <h1 style={styles.h2}>Update Student</h1>
        <Container style={styles.addForm}>
          <form onSubmit={handleUpdateStudent}>
            <h3>Profile</h3>
            <Container style={styles.formGroup}>
              <label style={styles.label}>Student Name:</label>
              <TextField
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                variant="outlined"
                style={styles.roundedInput}
              />
              <label style={styles.label}>Email:</label>
              <TextField
                type="text"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                variant="outlined"
                style={styles.roundedInput}
              />
              <label style={styles.label}>Password:</label>
              <TextField
                type="password"
                value={password}
                onChange={(e) => setStudentPassword(e.target.value)}
                variant="outlined"
                style={styles.roundedInput}
              />
            </Container>

            <h3>University Information</h3>
            <Container style={styles.formGroup}>
              <label style={styles.label}>Roll No:</label>
              <TextField
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                variant="outlined"
                style={styles.roundedInput}
              />
              <label style={styles.label}>Section:</label>
              <TextField
                type="text"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                variant="outlined"
                style={styles.roundedInput}
              />

              <label style={styles.label}>Degree:</label>
              <TextField
                select
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                variant="outlined"
                style={styles.roundedInput}
              >
                <MenuItem value="">Select Degree</MenuItem>
                <MenuItem value="Bachelor of Business Administration">
                  Bachelor of Business Administration
                </MenuItem>
                <MenuItem value="Bachelor of Science (Accounting and Finance)">
                  Bachelor of Science (Accounting and Finance)
                </MenuItem>
                <MenuItem value="Bachelor of Science (Artificial Intelligence)">
                  Bachelor of Science (Artificial Intelligence)
                </MenuItem>
                <MenuItem value="Bachelor of Science (Business Analytics)">
                  Bachelor of Science (Business Analytics)
                </MenuItem>
                <MenuItem value="Bachelor of Science (Civil Engineering)">
                  Bachelor of Science (Civil Engineering)
                </MenuItem>
                <MenuItem value="Bachelor of Science (Computer Science)">
                  Bachelor of Science (Computer Science)
                </MenuItem>
                <MenuItem value="Bachelor of Science (Cyber Security)">
                  Bachelor of Science (Cyber Security)
                </MenuItem>
                <MenuItem value="Bachelor of Science (Data Science)">
                  Bachelor of Science (Data Science)
                </MenuItem>
                <MenuItem value="Bachelor of Science (Electrical Engineering)">
                  Bachelor of Science (Electrical Engineering)
                </MenuItem>
                <MenuItem value="Bachelor of Science (Financial Technologies)">
                  Bachelor of Science (Financial Technologies)
                </MenuItem>
                <MenuItem value="Bachelor of Science (Software Engineering)">
                  Bachelor of Science (Software Engineering)
                </MenuItem>
              </TextField>

              <label style={styles.label}>Campus:</label>
              <TextField
                select
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
                variant="outlined"
                style={styles.roundedInput}
              >
                <MenuItem value="">Select Campus</MenuItem>
                <MenuItem value="Chiniot-Faisalabad">
                  Chiniot-Faisalabad
                </MenuItem>
                <MenuItem value="Islamabad">Islamabad</MenuItem>
                <MenuItem value="Karachi">Karachi</MenuItem>
                <MenuItem value="Lahore">Lahore</MenuItem>
                <MenuItem value="Peshawar">Peshawar</MenuItem>
              </TextField>
            </Container>

            {/* Personal Information */}
            <h3>Personal Information</h3>
            <Container style={styles.formGroup}>
              <label style={styles.label}>Date of Birth:</label>
              <TextField
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                variant="outlined"
                style={styles.roundedInput}
              />
              <label style={styles.label}>CNIC:</label>
              <TextField
                type="text"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                variant="outlined"
                style={styles.roundedInput}
              />
              <label style={styles.label}>Mobile No:</label>
              <TextField
                type="text"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                variant="outlined"
                style={styles.roundedInput}
              />
              <label style={styles.label}>Blood Group:</label>
              <TextField
                type="text"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                variant="outlined"
                style={styles.roundedInput}
              />
              <label style={styles.label}>Nationality:</label>
              <TextField
                type="text"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                variant="outlined"
                style={styles.roundedInput}
              />
            </Container>

            <h3>Contact Information</h3>

            <Container style={styles.formGroup}>
              <label style={styles.label}>Address:</label>
              <TextField
                type="text"
                value={permanentAddress}
                onChange={(e) => setPermanentAddress(e.target.value)}
                variant="outlined"
                style={styles.roundedInput}
              />
              <label style={styles.label}>Home Phone:</label>
              <TextField
                type="text"
                value={homePhonePermanent}
                onChange={(e) => setHomePhonePermanent(e.target.value)}
                variant="outlined"
                style={styles.roundedInput}
              />
              <label style={styles.label}>Postal Code:</label>
              <TextField
                type="text"
                value={postalCodePermanent}
                onChange={(e) => setPostalCodePermanent(e.target.value)}
                variant="outlined"
                style={styles.roundedInput}
              />
              <label style={styles.label}>City:</label>
              <TextField
                type="text"
                value={cityPermanent}
                onChange={(e) => setCityPermanent(e.target.value)}
                variant="outlined"
                style={styles.roundedInput}
              />
              <label style={styles.label}>Country:</label>
              <TextField
                select
                value={countryPermanent}
                onChange={(e) => setCountryPermanent(e.target.value)}
                variant="outlined"
                style={styles.roundedInput}
              >
                <MenuItem value="">Select Country</MenuItem>
                {countries.map((country, index) => (
                  <MenuItem key={index} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </TextField>
            </Container>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={styles.gradientButton}
            >
              Update
            </Button>
          </form>
        </Container>
      </NavBar>
    </>
  );
};

export default UpdateStudentForm;
