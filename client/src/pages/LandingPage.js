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
  Container,
  CardActionArea,
  CardActions,
  CardMedia,
  CircularProgress,
  alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocation } from "react-router-dom";
import AnnouncementOutlined from "@mui/icons-material/AnnouncementOutlined";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import Face2Icon from "@mui/icons-material/Face2";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import NavBar from "../components/Navbar";
import { getThreads } from "../services/ThreadService";
import autumn from "../assets/images/autumnFalling.gif";
import spring from "../assets/images/spring.gif";

import AlarmOnTwoToneIcon from "@mui/icons-material/AlarmOnTwoTone";
import PendingActionsTwoToneIcon from "@mui/icons-material/PendingActionsTwoTone";
import { useNavigate } from "react-router-dom";
import { endSemester, startSemester } from "../services/AdminService";

const LandingPage = () => {
  const navigate = useNavigate();
  const [ongoing, setOngoing] = useState("");
  const [semesterModalOpen, setSemesterModalOpen] = useState(false);
  const [semesterModalContent, setSemesterModalContent] = useState("");
  const [semesterModalIcon, setSemesterModalIcon] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showfall, setShowfall] = useState(false);
  const [showspring, setShowspring] = useState(false);
  const [downloading, setDownloading] = React.useState(false);

  const [threads, setThreads] = useState([]);

  const styles = {
    threadCard: {
      position: "relative",
      padding: "20px",
      marginBottom: "10px",
    },
    threadOptions: {
      position: "absolute",
      top: "10px",
      right: "10px",
      display: "flex",
      gap: "5px",
      transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out",
    },
    h7: {
      fontSize: "15px",
    },
  };

  useEffect(() => {
    getThreads().then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setThreads(data.slice(0, 3));
        });
      }
    });
  }, []);

  const handleSemesterModalOpen = async (icon) => {
    try {
      setDownloading(true);

      const res = await startSemester({});

      if (res.error) {
        var message = res.error;
        setSemesterModalContent(message);
        setSemesterModalIcon(icon);
        setSemesterModalOpen(true);
      } else {
        console.log(res);
        if (res.success == true) {
          if (res.semester === "Fall") {
            setShowfall(true);
            setTimeout(() => {
              setShowfall(false);
            }, 5000);
          }
          if (res.semester === "Spring") {
            setShowspring(true);
            setTimeout(() => {
              setShowspring(false);
            }, 5000);
          }
          setSemesterModalContent(res.message);
          setSemesterModalIcon(icon);
          setSemesterModalOpen(true);
        } else {
          setSemesterModalContent(res.message);
          setSemesterModalIcon(icon);
          setSemesterModalOpen(true);
        }
      }
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error("Error setting semester:", error);
    } finally {
      setDownloading(false);
    }
  };

  const handleSemesterEndModalOpen = async (icon) => {
    try {
      setDownloading(true);
      const res = await endSemester({});
      setDownloading(true);
      if (res.error) {
        setDownloading(false);
        var message = res.error;
        setSemesterModalContent(message);
        setSemesterModalIcon(icon);
        setSemesterModalOpen(true);
      } else {
        setDownloading(false);
        console.log(res);
        var message = "Semester has Ended ";
        setSemesterModalContent(message);
        setSemesterModalIcon(icon);
        setSemesterModalOpen(true);
      }
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error("Error setting semester:", error);
    } finally {
      setDownloading(false);
    }
  };
  const handleSemesterModalClose = () => {
    setSemesterModalOpen(false);
  };

  const handleViewThreadPosts = (thread) => {
    navigate(`/admin/threads/${thread._id}`);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <NavBar>
      <Container>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {showfall && (
            <img
              src={autumn}
              alt="Fall"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 2,
              }}
            />
          )}
          {showspring && (
            <img
              src={spring}
              alt="Spring"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 2,
              }}
            />
          )}
        </div>
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
              color="secondary"
              startIcon={
                <VisibilityOutlinedIcon
                  color="primary"
                  style={{ fontSize: 25 }}
                />
              }
            >
              View Courses
            </Button>
            <Button
              component={Link}
              onClick={() => {
                navigate("/admin/viewStudents");
              }}
              variant="outlined"
              color="secondary"
              startIcon={<Face2Icon color="primary" style={{ fontSize: 25 }} />}
            >
              View Students
            </Button>
            <Button
              component={Link}
              onClick={() => {
                navigate("/admin/viewTeachers");
              }}
              variant="outlined"
              color="secondary"
              startIcon={
                <PersonSearchIcon color="primary" style={{ fontSize: 25 }} />
              }
            >
              View Teachers
            </Button>
            <Button
              component={Link}
              onClick={() => {
                navigate("/admin/viewDegrees");
              }}
              variant="outlined"
              color="secondary"
              startIcon={
                <WorkspacePremiumIcon
                  color="primary"
                  style={{ fontSize: 25 }}
                />
              }
            >
              View Degrees
            </Button>
          </Box>

          <CardContent style={{ width: "100%" }}>
            <Typography variant="h5" style={{ marginBottom: "10px" }}>
              Latest Threads
            </Typography>

            {threads.map((thread) => (
              <Card
                key={thread._id}
                sx={{
                  ...styles.threadCard,
                  backgroundColor: (theme) => `${theme.palette.primary.main}`,
                  color: "white",
                  position: "relative",
                }}
              >
                <CardActionArea onClick={() => handleViewThreadPosts(thread)}>
                  <CardContent>
                    <Typography sx={({ marginLeft: "10px" }, styles.h7)}>
                      {thread.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 30,
                    bottom: 0,
                    width: "100px",
                  }}
                >
                  {/* Icon inside the shadow box */}
                  <CampaignOutlinedIcon
                    className="rotate-icon" // Add a class for easier selection
                    sx={{
                      fontSize: 60,
                      color: "white",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      opacity: "0.9",
                      transition: "transform 0.3s ease-in-out",
                    }}
                  />
                </Box>
              </Card>
            ))}
            {threads.length >= 3 && (
              <Button
                variant="contained"
                sx={{ float: "right" }}
                onClick={() => {
                  navigate("/admin/threads");
                }}
              >
                {" "}
                View All
              </Button>
            )}
          </CardContent>

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
                    handleSemesterEndModalOpen(
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
      </Container>
      <Dialog open={downloading}>
        <Box
          sx={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "48px",
          }}
        >
          <DialogTitle>Setting Semester, please wait...</DialogTitle>
          <CircularProgress color="secondary" />
        </Box>
      </Dialog>
    </NavBar>
  );
};

export default LandingPage;
