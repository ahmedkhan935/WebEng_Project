import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useParams } from "react-router";
import { updateStudent, viewStudent } from "../services/AdminService";

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
const UpdateStudentForm = () => {
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [degree, setDegree] = useState("");
  const [cnic, setCnic] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [homePhonePermanent, setHomePhonePermanent] = useState("");
  const [countries, setCountries] = useState([]);
  const { id } = useParams();

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
    const fetchStudent = async () => {
      try {
        const response = await viewStudent(id);
        setStudentName(response.name);
        setStudentEmail(response.email);
        setRollNo(response.rollNumber);
        setDegree(response.degreeName);
        setCnic(response.CNIC);
        setPermanentAddress(response.address);
        setHomePhonePermanent(response.contactNumber);
      } catch (error) {
        alert("Student could not be fetched");
      }
    };
    fetchStudent();
    //fetchCountries();
  }, [id]);

  const handleUpdateStudent = (event) => {
    event.preventDefault();

    const updatedData = {
      name: studentName,
      email: studentEmail,
      address: permanentAddress,
      contactNumber: homePhonePermanent,
    };
    updateStudent(id, updatedData).then((res) => {
      if (res.errorMessage) {
        alert("Student could not be updated");
      } else {
        alert("Student updated successfully");
      }
    });
  };

  // ... styles object ...

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
            </Container>

            <h3>University Information</h3>
            <Container style={styles.formGroup}>
              <label style={styles.label}>Roll No:</label>
              <TextField
                type="text"
                value={rollNo}
                variant="outlined"
                style={styles.roundedInput}
                disabled
              />
              <label style={styles.label}>Degree:</label>
              <TextField
                value={degree}
                variant="outlined"
                style={styles.roundedInput}
                disabled
              />
            </Container>

            <h3>Personal Information</h3>
            <Container style={styles.formGroup}>
              <label style={styles.label}>CNIC:</label>
              <TextField
                type="text"
                value={cnic}
                variant="outlined"
                style={styles.roundedInput}
                disabled
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
