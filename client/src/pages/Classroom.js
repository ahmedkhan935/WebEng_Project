import React, { useEffect, useState, useContext } from "react";

import {
  Card,
  Box,
  Typography,
  CardContent,
  CardMedia,
  Container,
  alpha,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";

import classroomHeader from "../assets/images/classroomHeader.jpg"; // import the image
import NavBar from "../components/Navbar";
import CompletedCourseBadge from "../components/CompletedCourseBadge";
import UpcomingWork from "../components/UpcomingWork";
import ClassroomStreamCard from "../components/ClassroomStreamCard";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getClass as getStudentClass } from "../services/StudentService";
import { getClass as getTeacherClass } from "../services/TeacherService";
import TeacherClassroomBtns from "../components/TeacherClassroomBtns";
import StudentClassroomBtns from "../components/StudentClassroomBtns";
import { ClassroomContext } from "../context/ClassroomContext";
import useStore from "../store/store";

function Classroom() {
  const navigate = useNavigate();
  const { classCode } = useParams();
  const [classroom, setClassroom] = useState({});
  const [classError, setClassError] = useState(null);
  const [classFetched, setClassFetched] = useState(false); //To check if classes have been fetched or not
  const { classroomAnnouncements, setClassroomAnnouncements } =
    useContext(ClassroomContext);

  const location = useLocation();
  const {userRole} = useStore();

  useEffect(() => {
    if (userRole == "student") {
      getStudentClass(classCode).then((data) => {
        handleData(data);
      });
    } else if (userRole == "teacher") {
      getTeacherClass(classCode).then((data) => {
        handleData(data);
      });
    }
  }, []);

  const handleData = (data) => {
    if (data.error) {
      console.log("no class");
      setClassError(data.error);
      setClassFetched(true);
      return;
    } else {
      setClassroom(data.data);
      setClassroomAnnouncements(data.data.announcements);
      setClassFetched(true);
    }
  };

  if (!classFetched) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const handlefeedbackbutton = () => {
    if (userRole == "student")
      navigate(`/student/classes/${classCode}/feedback`);
    else navigate(`/teacher/classes/${classCode}/feedback`);
  };

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
            <Button
              onClick={handlefeedbackbutton}
              variant="contained"
              color="secondary"
              sx={{
                position: "absolute",
                top: 2,
                right: 2,
                color: "#ffffff",
                marginTop: "10px",
                marginRight: "10px",
              }}
            >
              {userRole == "student" ? "Give Feedback" : "View Feedback"}
            </Button>
            <Box position="absolute" bottom={0} left={0} p={1}>
              <Typography variant="h3" color="white" margin="10px">
                {classroom ? classroom.name : ""}
              </Typography>
              <Typography
                variant="body1"
                color="white"
                margin="10px"
                marginBottom="10px"
              >
                {"Taught by " +
                  classroom.teachers
                    .map((teacher) => teacher.teacherId.name)
                    .join(", ")}
              </Typography>
            </Box>
          </Box>
          <CardContent>
            {/* <CompletedCourseBadge /> */}
            {/* This will be displayed only if student is viewing classroom of an old course which he has already */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                {userRole == "student" ? (
                  <>
                    <UpcomingWork classCode={classroom.code} />
                    <StudentClassroomBtns classCode={classroom.code} />
                  </>
                ) : (
                  <TeacherClassroomBtns classCode={classroom.code} />
                )}
              </Grid>
              <Grid item xs={12} sm={9}>
                {classroom && classroomAnnouncements
                  ? classroomAnnouncements.map((card) => (
                      <ClassroomStreamCard card={card} />
                    ))
                  : null}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </NavBar>
  );
}

export default Classroom;
