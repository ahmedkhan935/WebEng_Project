import React, { useState } from "react";
import NavBar from "../components/Navbar";
import VideoCallImg from "../assets/images/vid.gif";
import JitsiMeetComponent from "../components/JitsiMeetComponent"; // Import the JitsiMeetComponent
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  Container,
} from "@mui/material";
import { useParams, useLocation } from "react-router-dom";

const VideoCall = () => {
  const [loading, setLoading] = useState(false);
  const [meetingStarted, setMeetingStarted] = useState(false); // Track if the meeting has started
  const classCode = useParams();
  const location = useLocation();
  const userRole = location.pathname.split("/")[1]; // Extract userRole from the URL

  const handleStartMeeting = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setMeetingStarted(true); // Set meetingStarted to true when the meeting starts
    }, 2000);
  };

  return (
    <NavBar>
      <Container>
        <Typography variant="h5">Welcome to Video Call</Typography>

        {meetingStarted ? (
          // Render Jitsi Meet component when the meeting has started
          <JitsiMeetComponent roomNames={classCode} displayName="Teacher" />
        ) : (
          // Render the start meeting button and image
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
            {userRole == "teacher" && (
              <Button
                variant="outlined"
                color="primary"
                mt={2}
                style={{ width: "200px", height: "50px" }}
                onClick={handleStartMeeting}
              >
                {loading && (
                  <CircularProgress size={24} style={{ marginRight: "10px" }} />
                )}
                Start Meeting
              </Button>
            )}
          </Box>
        )}
      </Container>
    </NavBar>
  );
};

export default VideoCall;
