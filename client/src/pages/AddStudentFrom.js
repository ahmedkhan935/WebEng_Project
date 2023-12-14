import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Label } from "@mui/icons-material";
import {studentRegister} from "../services/AuthService"
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

  const handleAddStudent = async (event) => {
    event.preventDefault();
    const resp=await studentRegister(studentEmail,password,studentName,rollNo,cnic,permanentAddress,mobileNo,degree);
    if(resp.status===201){
      alert("Student Added Successfully");
    }
    else{
      alert("Error Adding Student");
    }


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
    roundedInput: {
      width: "100%",
      marginBottom: "15px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
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
        <h1 style={styles.h2}>Student Form</h1>
        <Container style={styles.addForm}>
          <form onSubmit={handleAddStudent} style={styles.form}>
            <h3>Profile</h3>
            <Container style={styles.formGroup}>
              <TextField
                label="Student Name"
                variant="outlined"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                style={styles.roundedInput}
              />
              <TextField
                label="Email"
                variant="outlined"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                style={styles.roundedInput}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setStudentPassword(e.target.value)}
                style={styles.roundedInput}
              />
            </Container>

            <h3>University Information</h3>
            <Container style={styles.formGroup}>
              <TextField
                label="Roll No"
                variant="outlined"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                style={styles.roundedInput}
              />
              <TextField
                label="Section"
                variant="outlined"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                style={styles.roundedInput}
              />
              <TextField
                select
                label="Degree"
                variant="outlined"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                style={styles.roundedInput}
              >
                <MenuItem value="">Select Degree</MenuItem>
                <MenuItem value="Bachelor of Business Administration">
                  Bachelor of Business Administration
                </MenuItem>
                <MenuItem value="Bachelor of Science (Accounting and Finance)">
                  Bachelor of Science (Accounting and Finance)
                </MenuItem>
                {/* Add other degrees as needed */}
              </TextField>
              <TextField
                select
                label="Campus"
                variant="outlined"
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
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
              <p>Date of Birth</p>{" "}
              <TextField
                type="date"
                variant="outlined"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                style={styles.roundedInput}
              />
              <TextField
                label="CNIC"
                variant="outlined"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                style={styles.roundedInput}
              />
              <TextField
                label="Mobile No"
                variant="outlined"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                style={styles.roundedInput}
              />
              <TextField
                label="Blood Group"
                variant="outlined"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                style={styles.roundedInput}
              />
              <TextField
                label="Nationality"
                variant="outlined"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                style={styles.roundedInput}
              />
            </Container>

            <h3>Contact Information</h3>
            <Container style={styles.formGroup}>
              <TextField
                label="Address"
                variant="outlined"
                value={permanentAddress}
                onChange={(e) => setPermanentAddress(e.target.value)}
                style={styles.roundedInput}
              />
              <TextField
                label="Home Phone"
                variant="outlined"
                value={homePhonePermanent}
                onChange={(e) => setHomePhonePermanent(e.target.value)}
                style={styles.roundedInput}
              />
              <TextField
                label="Postal Code"
                variant="outlined"
                value={postalCodePermanent}
                onChange={(e) => setPostalCodePermanent(e.target.value)}
                style={styles.roundedInput}
              />
              <TextField
                label="City"
                variant="outlined"
                value={cityPermanent}
                onChange={(e) => setCityPermanent(e.target.value)}
                style={styles.roundedInput}
              />
              <TextField
                select
                label="Country"
                variant="outlined"
                value={countryPermanent}
                onChange={(e) => setCountryPermanent(e.target.value)}
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
              Add Student
            </Button>
          </form>
        </Container>
      </NavBar>
    </>
  );
};

export default AddStudentForm;
