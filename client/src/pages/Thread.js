import React, { useEffect } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import Announcement from "../components/AnnouncementCard";
import NavBar from "../components/Navbar";
import {getThread as getStudentThread} from '../services/StudentService'
import {getThread as getTeacherThread} from '../services/TeacherService'
import { useParams } from "react-router";
import AnnouncementList from "../components/AnnouncementList";
import { useLocation } from 'react-router-dom';

function Thread() {
  const [thread, setThread] = React.useState();
  const [postsError, setPostsError] = React.useState(null);
  const [postsFetched, setPostsFetched] = React.useState(false); //To check if classes have been fetched or not
  const threadId = useParams().id;

  const location = useLocation();
  const userRole = location.pathname.split('/')[1];

  useEffect(() => {
    if (userRole == "student") {
      getStudentThread(threadId).then((data) => {
        handleData(data);
      });
    } else if (userRole == "teacher") {
      getTeacherThread(threadId).then((data) => {
        handleData(data);
      });
    }
  }, []);

  const handleData = (data) => {
    if (data.error) {
      setPostsError(data.error);
      setPostsFetched(true);
      return;
    }
    setThread(data.data);
    setPostsFetched(true);
  }
  return (
    <NavBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          marginBottom: "20px",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" sx={{ width: "100%", marginBottom: "10px" }}>
            Posts from this thread
          </Typography>

          <AnnouncementList isFullList={true}  thread={thread} ></AnnouncementList>
          
        </Container>
      </Box>
    </NavBar>
  );
}

export default Thread;
