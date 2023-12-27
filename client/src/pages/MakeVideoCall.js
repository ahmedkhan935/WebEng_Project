import React, { useState, useEffect } from "react";
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
import { getMeetLink } from "../services/StudentService";
import { StartMeet, endMeet } from "../services/TeacherService";

import io from "socket.io-client";
const VideoCall = () => {
  const [loading, setLoading] = useState(false);
  const [meetingStarted, setMeetingStarted] = useState(false); // Track if the meeting has started
  const { classCode } = useParams();
  const [meetingEnded, setMeetingEnded] = useState(true); // Track if the meeting has ended
  const location = useLocation();
  const apikey = "vpaas-magic-cookie-fb99e6b0dca443f9bb85db7b2561f865";


  const userRole = location.pathname.split('/')[1]; // Extract userRole from the URL
  const teacher = userRole == "teacher";
  useEffect(() => {
    if (userRole == "student") {
      getMeetLink(classCode).then((res) => {
        if (res.data.link) {
          setMeetingStarted(true);
          setMeetingEnded(false);
        }

      })
      //setMeetingStarted(true);
    };
  }, [])
  const socket = io('http://localhost:3000');

  useEffect(() => {
    // Listen for the 'call ended' event
    socket.on('call ended', (classCode) => {
      // Check if the classCode matches the current class

      // Hide the iframe
      setMeetingStarted(false);
    });

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      socket.off('call ended');
    };
  }, []);


  const handleStartMeeting = () => {
    setLoading(true);
    setMeetingEnded(false);
    socket.emit('endMeet', classCode);
    setTimeout(async () => {

      await StartMeet(classCode, `https://8x8.vc/${apikey}${classCode}`);
      setLoading(false);
      setMeetingStarted(true); // Set meetingStarted to true when the meeting starts
    }, 2000);
  };
  const endMeeting = async () => {
    await endMeet(classCode);
    setMeetingEnded(true);

    setMeetingStarted(false);
  }


  return (
    <NavBar>
      <Container>
        <Typography variant="h5">Welcome to Video Call</Typography>

        {meetingStarted && !meetingEnded ? (
          // Render Jitsi Meet component when the meeting has started
          <JitsiMeetComponent roomName={classCode} displayName="Teacher" apikey={apikey} />
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
              {
                !meetingStarted && meetingEnded && userRole == "student" && (
                  <Typography variant="h4" sx= {{marginBottom: '20px', marginTop: '20px'}} >Meeting is not Live, please come back later. </Typography>
                )
              }
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
        {meetingStarted && userRole == "teacher" && (
          <Button onClick={endMeeting}>End Call</Button>
        )}

      </Container>
    </NavBar>
  );
};

export default VideoCall;
