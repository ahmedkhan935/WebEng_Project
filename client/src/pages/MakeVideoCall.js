import React, { useState,useEffect } from "react";
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

const VideoCall = () => {
  const [loading, setLoading] = useState(false);
  const [meetingStarted, setMeetingStarted] = useState(false); // Track if the meeting has started
  const {classCode} = useParams();
const [meetingEnded, setMeetingEnded] = useState(true); // Track if the meeting has ended
  const location = useLocation();
  
  const userRole = location.pathname.split('/')[1]; // Extract userRole from the URL
  useEffect(() => {
    if (userRole == "student") {
      getMeetLink(classCode).then((res)=>
      { 
        if(res.data.link){
          setMeetingStarted(true);
          setMeetingEnded(false);
        }

      })
        //setMeetingStarted(true);
  };
  }, [])

  const handleStartMeeting = () => {
    setLoading(true);
    setMeetingEnded(false);

    setTimeout(async () => {
      await StartMeet(classCode, `https://8x8.vc/${classCode}`);
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
          <JitsiMeetComponent roomName={classCode} displayName="Teacher" />
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
        !meetingStarted && meetingEnded && userRole=="student" && (
          <Typography variant="h5">Meeting is not Live</Typography>
          
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
        {meetingStarted && (
        <Button onClick={endMeeting}>End Call</Button>
      )}
      
      </Container>
    </NavBar>
  );
};

export default VideoCall;
