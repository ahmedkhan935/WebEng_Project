import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Card,
  CardContent,
  Typography,
  Box,
  Link,
} from "@mui/material";
import NavBar from "../components/Navbar";

import AlarmOnTwoToneIcon from "@mui/icons-material/AlarmOnTwoTone";
import PendingActionsTwoToneIcon from "@mui/icons-material/PendingActionsTwoTone";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [semesterModalOpen, setSemesterModalOpen] = useState(false);
  const [semesterModalContent, setSemesterModalContent] = useState("");
  const [semesterModalIcon, setSemesterModalIcon] = useState(null);

  useEffect(() => {}, []);

  const handleSemesterModalOpen = (message, icon) => {
    setSemesterModalContent(message);
    setSemesterModalIcon(icon);
    setSemesterModalOpen(true);
  };

  const handleSemesterModalClose = () => {
    setSemesterModalOpen(false);
  };


  return (
    <NavBar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="flex-end"
          gap={2}
          sx={{ marginBottom: "20px" }}
        >
          <Button
            component={Link}
            onClick={() => {
              navigate("/admin/searchCourses");
            }}
            variant="outlined"
            color="primary"
          >
            View Courses
          </Button>
          <Button
            component={Link}
            onClick={() => {
              navigate("/admin/viewStudents");
            }}
            variant="outlined"
            color="primary"
          >
            View Students
          </Button>
          <Button
            component={Link}
            onClick={() => {
              navigate("/admin/viewTeachers");
            }}
            variant="outlined"
            color="primary"
          >
            View Teachers
          </Button>
        </Box>

        <Card style={{ width: "100%" }}>
          <CardContent>
            <Typography variant="h5" style={{ marginBottom: "10px" }}>
              Semester Schedule
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                onClick={() =>
                  handleSemesterModalOpen(
                    "New semester has started!",
                    <AlarmOnTwoToneIcon
                      sx={{ fontSize: "4rem", mb: "1rem", color: "primary" }}
                    />
                  )
                }
                style={{ margin: "10px" }}
              >
                Start Semester
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  handleSemesterModalOpen(
                    "Semester has ended!",
                    <PendingActionsTwoToneIcon
                      sx={{ fontSize: "4rem", mb: "1rem", color: "primary" }}
                    />
                  )
                }
                style={{ margin: "10px" }}
              >
                End Semester
              </Button>
            </Box>
          </CardContent>
        </Card>
      </div>

      {/* semester modal */}
      <Dialog open={semesterModalOpen} onClose={handleSemesterModalClose}>
        <DialogTitle style={{ textAlign: "center" }}>
          {semesterModalIcon}
          {semesterModalContent}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleSemesterModalClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </NavBar>
  );
};

export default LandingPage;
