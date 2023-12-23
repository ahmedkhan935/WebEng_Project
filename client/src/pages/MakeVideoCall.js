import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import VideoCallImg from "../assets/images/vid.gif";
import { Button, Typography, Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";

const VideoCall = () => {
  const [loading, setLoading] = useState(false);
  const classCode= useParams();

  useEffect(() => {}, []);

  const handleStartMeeting = () => {
    setLoading(true);

    // Simulate an asynchronous operation (e.g., API call)
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <NavBar>
      <Typography variant="h5">Welcome to Zoom Video Call</Typography>
      <Box
        textAlign="center"
        mt={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        <div
          style={{
            marginRight: "50px",
            marginBottom: "20px",
          }}
        >
          <img
            src={VideoCallImg}
            alt="Zoom Background"
            style={{
              maxWidth: "100%",
              height: "auto",
              width: "100%",
              borderRadius: "20px",
              marginBottom: "20px",
              maxHeight: "400px",
            }}
          />
        </div>
        <Button
          variant="outlined"
          color="primary"
          mt={2}
          style={{ width: "200px", height: "50px" }}
          onClick={handleStartMeeting}
        >
          {loading ? (
            <CircularProgress size={24} style={{ marginRight: "10px" }} />
          ) : null}
          Start Meeting
        </Button>
      </Box>
    </NavBar>
  );
};

export default VideoCall;
