import { Card, Box, Typography, CardContent, CardMedia, Container, alpha, Grid } from "@mui/material";
import React from "react";
import classroomHeader from '../assets/images/classroomHeader.jpg'; // import the image
import NavBar from '../components/Navbar';
import CompletedCourseBadge from "../components/CompletedCourseBadge";
import UpcomingWork from "../components/UpcomingWork";

function Classroom() {
  return (
    <NavBar>
      <Container>
        <Card>
          <Box position="relative">
            <CardMedia
              sx={{ height: 200 }}
              image={classroomHeader}
              title="Classroom"
            />
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bgcolor={(theme) => alpha(theme.palette.primary.main, 0.7)}
            />
            <Box position="absolute" bottom={0} left={0} p={1}>
              <Typography variant="h3" color="white" margin="10px">
                Programming Fundamentals
              </Typography>
            </Box>
          </Box>
          <CardContent>
            <CompletedCourseBadge /> {/* This will be displayed only if student is viewing an old course */}
            <Grid container spacing={2}>
  <Grid item xs={12} sm={3}>
    <UpcomingWork />
  </Grid>
  <Grid item xs={12} sm={9}>
    <Card>
      <CardContent>
        <Typography variant="h6" color="text.secondary" margin="10px">
          Assignment 1
        </Typography>
        <Typography variant="body2" color="text.secondary" margin="10px">
          Due: 10/10/2021
        </Typography>
      </CardContent>
    </Card>
  </Grid>
</Grid>
          </CardContent>
        </Card>
      </Container>
    </NavBar>
  );
}

export default Classroom;