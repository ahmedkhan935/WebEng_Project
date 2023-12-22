import React, { useEffect } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import Announcement from "../components/AnnouncementCard";
import NavBar from "../components/Navbar";
import {getThread} from '../services/StudentService'
import { useParams } from "react-router";
import AnnouncementList from "../components/AnnouncementList";


function Thread() {
  const [thread, setThread] = React.useState();
  const [postsError, setPostsError] = React.useState(null);
  const [postsFetched, setPostsFetched] = React.useState(false); //To check if classes have been fetched or not
  const threadId = useParams().id;

  useEffect(() => {
    // console.log("use effect")
    // console.log("Thread id", threadId)
    getThread(threadId).then((data) => {
      console.log("Thread fetchin data", data.data)
      if (data.error) {
        setPostsError(data.error);
        setPostsFetched(true);
        return;
      }
      console.log("About to set");
      setThread(data.data);
      console.log("Posts", thread)
      setPostsFetched(true);
    });
  }, []);

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
