import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import NavBar from "../components/Navbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { addCourse, viewAllCourses } from "../services/AdminService";

// const prerequisites = ["Prerequisite 1", "Prerequisite 2", "Prerequisite 3"];

const CreateCourseForm = () => {
  const [prerequisites, setPrerequisites] = useState([]);
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseCredits, setCourseCredits] = useState("");
  const [courseType, setCourseType] = useState("");
  const [selectedPrerequisite, setSelectedPrerequisite] = useState("");
  const [prereqs, setPrereqs] = useState([]);
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [submitmsg, setsubmitmsg] = useState("");
  const [status, setstatus] = useState(false);

  useEffect(() => {
    const fetchPrerequisites = async () => {
      const response = await viewAllCourses();
      const courses = response.map((course) => course.courseCode);
      setPrerequisites(courses);
    };
    fetchPrerequisites();
  }, []);
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const resp = await addCourse({
      courseCode,
      courseName,
      courseCredits,
      courseType,
      prereqs,
    });

    if (resp.errorMessage) {
      setsubmitmsg("Cannot create Course!");
      setstatus(false);
      setFormSubmitted(true);
    } else {
      console.log(resp);
      setstatus(true);
      setsubmitmsg("  Course successfully created!");
      setFormSubmitted(true);
    }
  };
  const handleModalClose = () => {
    setstatus(false);
    setFormSubmitted(false);
  };

  const handleAddPrereq = () => {
    if (selectedPrerequisite) {
      setPrereqs([...prereqs, { courseCode: selectedPrerequisite }]);
      setSelectedPrerequisite("");
    }
  };

  const handleRemovePrereq = (index) => {
    const updatedPrereqs = [...prereqs];
    updatedPrereqs.splice(index, 1);
    setPrereqs(updatedPrereqs);
  };

  const styles = {
    form: {
      width: "50%",
      margin: "auto",
      marginTop: "50px",
      border: "2px solid white",
      padding: "20px",
      borderRadius: "10px",
      marginTop: "100px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#ffffff",
      boxShadow: "0 0 10px rgba(118, 130, 142, 0.977)",
    },
    successMessage: {
      textAlign: "center",
      fontSize: "24px",
    },

    h2: {
      color: "#22717d",
      width: "100%",
      float: "right",
    },
    formControl: {
      width: "100%",
      marginBottom: "20px",
    },
    tagsContainer: {
      marginTop: "10px",
      display: "flex",
      flexWrap: "wrap",
    },
    tag: {
      marginRight: "8px",
      marginBottom: "8px",
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      backgroundColor: "#f0f0f0",
    },
    tagText: {
      marginRight: "8px",
    },
  };

  return (
    <NavBar>
      <h1 style={styles.h2}>Create Course</h1>

      <form style={styles.form} onSubmit={handleFormSubmit}>
        <TextField
          id="courseCode"
          label="Course Code"
          variant="outlined"
          fullWidth
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          margin="normal"
        />
        <TextField
          id="courseName"
          label="Course Name"
          variant="outlined"
          fullWidth
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          margin="normal"
        />
        <TextField
          id="courseCredits"
          label="Course Credits"
          variant="outlined"
          fullWidth
          value={courseCredits}
          onChange={(e) => setCourseCredits(e.target.value)}
          margin="normal"
        />
        <TextField
          id="courseType"
          select
          label="Course Type"
          variant="outlined"
          fullWidth
          value={courseType}
          onChange={(e) => setCourseType(e.target.value)}
          margin="normal"
        >
          <MenuItem value="Lab">Lab</MenuItem>
          <MenuItem value="Theory">Theory</MenuItem>
        </TextField>

        <FormControl style={styles.formControl}>
          <InputLabel id="prerequisite-label">Select Prerequisite</InputLabel>
          <Select
            fullWidth
            margin="normal"
            labelId="prerequisite-label"
            id="prerequisite"
            value={selectedPrerequisite}
            onChange={(e) => setSelectedPrerequisite(e.target.value)}
            label="Select Prerequisite"
          >
            <MenuItem value="" disabled>
              Select Prerequisite
            </MenuItem>
            {prerequisites.map((prerequisite, index) => (
              <MenuItem key={index} value={prerequisite}>
                {prerequisite}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          color="primary"
          onClick={handleAddPrereq}
          marginBottom="30px"
        >
          Add Prerequisite
        </Button>

        {prereqs.length > 0 && (
          <div style={styles.tagsContainer}>
            {prereqs.map((prereq, index) => (
              <div key={index} style={styles.tag}>
                <Typography variant="body1" style={styles.tagText}>
                  {prereq.courseCode}
                </Typography>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleRemovePrereq(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "10px", width: "150px", height: "40px" }}
        >
          Create Course
        </Button>
      </form>

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
  );
};

export default CreateCourseForm;
