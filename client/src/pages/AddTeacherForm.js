import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { teacherRegister } from "../services/AuthService";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const AddTeacherForm = () => {
  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [password, setTeacherPassword] = useState("");
  const [cnic, setCnic] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [homePhonePermanent, setHomePhonePermanent] = useState("");
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [submitmsg, setsubmitmsg] = useState("");
  const [status, setstatus] = useState(false);
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

  const handleAddTeacher = async (event) => {
    event.preventDefault();
    const resp = await teacherRegister(
      teacherEmail,
      password,
      teacherName,
      cnic,
      permanentAddress,
      homePhonePermanent
    );
    if (resp.status === 500 || resp.status === 400) {
      setsubmitmsg("Cannot Add Teacher!");
      setstatus(false);
      setFormSubmitted(true);
    } else {
      setstatus(true);
      setsubmitmsg("  Teacher successfully added!");
      setFormSubmitted(true);
    }
  };

  const handleModalClose = () => {
    setFormSubmitted(false);
    setstatus(false);
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
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
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
        <h1 style={styles.h2}>Teacher Form</h1>
        <Container style={styles.addForm}>
          <form onSubmit={handleAddTeacher} style={styles.form}>
            <h3>Profile</h3>
            <Container style={styles.formGroup}>
              <TextField
                label="Teacher Name"
                variant="outlined"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                style={styles.roundedInput}
              />
              <TextField
                label="Email"
                variant="outlined"
                value={teacherEmail}
                onChange={(e) => setTeacherEmail(e.target.value)}
                style={styles.roundedInput}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setTeacherPassword(e.target.value)}
                style={styles.roundedInput}
              />
            </Container>

            {/* Personal Information */}
            <h3>Personal Information</h3>
            <Container style={styles.formGroup}>
              <p>Date of Birth</p>{" "}
              <TextField
                label="CNIC"
                variant="outlined"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
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
            </Container>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={styles.gradientButton}
            >
              Add Teacher
            </Button>
          </form>
        </Container>
        {isFormSubmitted && (
          <Modal
            open={isFormSubmitted}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                borderRadius: "10px",
                bgcolor: "background.paper",
                boxShadow: "2px 2px 2px 1px #ffffff",
                p: 4,
                textAlign: "center",
              }}
            >
              {status ? (
                <TagFacesIcon style={{ fontSize: "100px", color: "#de8a57" }} />
              ) : (
                <SentimentVeryDissatisfiedIcon
                  style={{ fontSize: "100px", color: "#de8a57" }}
                />
              )}
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {isFormSubmitted && <>{submitmsg}</>}
              </Typography>
              <Button onClick={handleModalClose} style={{ marginTop: "10px" }}>
                Close
              </Button>
            </Box>
          </Modal>
        )}
      </NavBar>
    </>
  );
};

export default AddTeacherForm;
