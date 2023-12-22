import {
  Card,
  Box,
  Typography,
  CardContent,
  CardMedia,
  Container,
  alpha,
  Grid,
  CircularProgress
} from "@mui/material";
import React, {useEffect} from "react";
import classroomHeader from "../assets/images/classroomHeader.jpg"; // import the image
import NavBar from "../components/Navbar";
import CompletedCourseBadge from "../components/CompletedCourseBadge";
import UpcomingWork from "../components/UpcomingWork";
import ClassroomStreamCard from "../components/ClassroomStreamCard";
import { useParams } from "react-router-dom";
import { getClass  } from "../services/StudentService";

function Classroom() {
  const { classCode } = useParams();
  const [classroom, setClassroom] = React.useState({});
  const [classError, setClassError] = React.useState(null);
  const [classFetched, setClassFetched] = React.useState(false); //To check if classes have been fetched or not


  useEffect(() => {
    getClass(classCode).then((data) => {
      if (data.error) {
        setClassError(data.error);
        setClassFetched(true);
        return;
      } else {
        setClassroom(data.data);
        console.log("Classroom", classroom);
        console.log(data.data);
        setClassFetched(true);
      }
    });
  
  }, []);

  if (!classFetched) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
                {classroom ? classroom.name : ""}
              </Typography>
            </Box>
          </Box>
          <CardContent>
            {/* <CompletedCourseBadge /> */}
            {/* This will be displayed only if student is viewing classroom of an old course which he has already completed */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <UpcomingWork />
              </Grid>
              <Grid item xs={12} sm={9}>
                { classroom ?  classroom.announcements.map((card) => <ClassroomStreamCard card={card} />) : null  }
                </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </NavBar>
  );
}

export default Classroom;
 