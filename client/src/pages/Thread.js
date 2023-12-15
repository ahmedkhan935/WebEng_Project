import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import Announcement from "../components/AnnouncementCard";
import NavBar from "../components/Navbar";

function Thread() {
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
          <Announcement> </Announcement>
          <Announcement> </Announcement>
          <Announcement> </Announcement>
        </Container>
      </Box>
    </NavBar>
  );
}

export default Thread;
