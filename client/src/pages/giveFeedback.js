import React, { useState } from "react";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Button, Container,TextField, Modal, Box, Typography } from "@mui/material";
import NavBar from "../components/Navbar";
import { useParams } from "react-router";
import { givefeedback } from "../services/StudentService";
const GiveFeedback = () => {
  const { classCode } = useParams();
  const styles = {
    form: {
      width: "50%",
      border: "2px solid white",
      padding: "20px",
      borderRadius: "10px",
      background: "#ffffff",
    },
  };
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [submitmsg, setsubmitmsg] = useState("");
  const [status, setstatus] = useState(false);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    givefeedback(classCode, comment).then((res) => {
      if (res.error) {
        setFormSubmitted(true);
        setstatus(false);
        setsubmitmsg("Feedback not Given!");
      } else {
        setFormSubmitted(true);
        setstatus(true);
        setsubmitmsg("Feedback submitted successfully");
      }
    });
  };

  const handleModalClose = () => {
    setFormSubmitted(false);
  };

  return (
    <NavBar>
      <Container sx={{padding: 1}}>
      <Typography variant="h5" color="primary" >
      Give feedback to your teacher
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" style={{marginTop:"20px", marginBottom:"20px"}}>
        Please remember to be respectful and constructive in your feedback.
        <br></br>
        Feedback is not anonymous, your teacher will be able to see your name with your comments.
      </Typography>

      <form
        onSubmit={handleFormSubmit}
        style={
          ({ width: "80%", margin: "auto", marginTop: "50px" }, styles.form)
        }
      >
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
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
        >
          Submit Feedback
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
              width: '400px',
              borderRadius: "10px",
              bgcolor: "background.paper",
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
            <Button variant="contained" color="primary" onClick={handleModalClose} style={{ marginTop: "10px" }}>
              Close
            </Button>
          </Box>
        </Modal>
      )}
      </Container>
    </NavBar>
  );
};

export default GiveFeedback;
