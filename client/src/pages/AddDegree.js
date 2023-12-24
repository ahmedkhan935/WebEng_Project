import React, { useState } from "react";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Button, TextField, Modal, Box, Typography, Grid } from "@mui/material";
import NavBar from "../components/Navbar";
import { addDegree } from "../services/AdminService";

const AddDegree = () => {
  const [name, setName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [submitmsg, setsubmitmsg] = useState("");
  const [status, setstatus] = useState(false);

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
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAbbreviationChange = (e) => {
    setAbbreviation(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const resp = await addDegree({
      name,
      abbreviation,
    });

    if (resp.error) {
      console.log(resp);
      setFormSubmitted(true);
      setstatus(false);
      setsubmitmsg("Degree not Added!");
    } else {
      setFormSubmitted(true);
      setstatus(true);
      setsubmitmsg("Degree Added Sucessfully!");
    }
  };

  const handleModalClose = () => {
    setsubmitmsg("");
    setstatus(false);
    setFormSubmitted(false);
  };

  return (
    <NavBar>
      <h1 style={{ color: "#22717d", width: "100%", float: "right" }}>
        Add Degree
      </h1>

      <form style={styles.form} onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Degree Name"
          variant="outlined"
          value={name}
          onChange={handleNameChange}
          required
          margin="normal"
        />

        <TextField
          fullWidth
          label="Abbreviation"
          variant="outlined"
          value={abbreviation}
          onChange={handleAbbreviationChange}
          required
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary">
          Add Degree
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

export default AddDegree;
