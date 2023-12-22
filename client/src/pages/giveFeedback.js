import React, { useState } from "react";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  TextField,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import NavBar from "../components/Navbar";
import { Label } from "@mui/icons-material";

const GiveFeedback = () => {
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

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [submitmsg, setsubmitmsg] = useState("");
  const [status, setstatus] = useState(false);

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted Rating:", rating);
    console.log("Submitted Comment:", comment);

    // For demonstration purposes, setting form submitted state to show a modal fpr success or failure
    setFormSubmitted(true);
    //depending on error or succes change it to true or false
    setstatus(true);
    setsubmitmsg("Feedback given Sucessfully!");

    // setstatus(false);
    // setsubmitmsg("Feedback not Given!");
  };

  const handleModalClose = () => {
    setFormSubmitted(false);
  };

  return (
    <NavBar>
      <h1 style={{ color: "#22717d", width: "100%", float: "right" }}>
        Give Feedback
      </h1>

      <form
        onSubmit={handleFormSubmit}
        style={
          ({ width: "50%", margin: "auto", marginTop: "50px" }, styles.form)
        }
      >
        <TextField
          id="courseCode"
          label="Course Code"
          variant="outlined"
          fullWidth
          margin="normal"
        />

        {/* Other form fields */}

        <h4 style={{ width: "100%", float: "right" }}>Status</h4>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="Rating"
            name="rating"
            value={rating}
            onChange={handleRatingChange}
            row
          >
            <FormControlLabel value="worst" control={<Radio />} label="Worst" />
            <FormControlLabel value="bad" control={<Radio />} label="Bad" />
            <FormControlLabel
              value="normal"
              control={<Radio />}
              label="Normal"
            />
            <FormControlLabel value="good" control={<Radio />} label="Good" />
            <FormControlLabel
              value="excellent"
              control={<Radio />}
              label="Excellent"
            />
          </RadioGroup>
        </FormControl>

        <TextField
          id="comment"
          label="Comment"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={comment}
          onChange={handleCommentChange}
          margin="normal"
        />

        <Button
          type="submit"
          variant="outlined"
          color="primary"
          style={{ marginTop: "10px" }}
        >
          Submit Feedback
        </Button>
      </form>

      {/* Modal for form submission confirmation */}
      <Modal open={isFormSubmitted} onClose={handleModalClose}>
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
          <Typography variant="h6" component="h2">
            Feedback Submitted!
          </Typography>
          <Button onClick={handleModalClose} style={{ marginTop: "10px" }}>
            Close
          </Button>
        </Box>
      </Modal>

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

export default GiveFeedback;
