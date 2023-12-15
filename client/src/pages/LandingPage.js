import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import MakeAnnouncementCard from "../components/MakeAnnouncementCard";
import NavBar from "../components/Navbar";
import AlarmOnTwoToneIcon from "@mui/icons-material/AlarmOnTwoTone";
import PendingActionsTwoToneIcon from "@mui/icons-material/PendingActionsTwoTone";

const LandingPage = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [viewAllOpen, setViewAllOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [announcements, setAnnouncements] = useState([
    // Hardcoded announcements
    {
      title: "Welcome to the New Semester!",
      content:
        "We are excited to start the new semester. Get ready for a great learning experience!",
      date: "2023-01-15",
      creator: "Admin",
    },
    {
      title: "Reminder: Society Application Due Date",
      content:
        "Don't forget, the first society interviews are on monday 30 june, Make sure to submit your applications on time.",
      date: "2023-01-20",
      creator: "Admin",
    },
    // Add more announcements as needed
  ]);
  const [semesterModalOpen, setSemesterModalOpen] = useState(false);
  const [semesterModalContent, setSemesterModalContent] = useState("");
  const [semesterModalIcon, setSemesterModalIcon] = useState(null);

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const handleViewAllOpen = () => {
    setViewAllOpen(true);
  };

  const handleViewAllClose = () => {
    setViewAllOpen(false);
  };

  const handleAnnounce = () => {
    const newAnnouncement = {
      title: title,
      content: content,
      date: new Date().toLocaleDateString(),
      creator: "Amir Rehman",
    };

    setAnnouncements([newAnnouncement, ...announcements]);

    setTitle("");
    setContent("");

    setFormOpen(false);
  };

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
        <Button
          variant="contained"
          onClick={handleFormOpen}
          style={{ margin: "10px" }}
        >
          Make Announcement
        </Button>

        <div
          style={{ marginBottom: "20px", position: "relative", width: "100%" }}
        >
          <CardContent>
            <Typography variant="h5" style={{ marginBottom: "10px" }}>
              Latest Announcements
            </Typography>

            {announcements.slice(0, 3).map((announcement, index) => (
              <MakeAnnouncementCard key={index} {...announcement} />
            ))}

            {announcements.length > 3 && (
              <Button
                variant="contained"
                onClick={handleViewAllOpen}
                style={{ float: "right", margin: "5px" }}
              >
                View All
              </Button>
            )}
          </CardContent>
        </div>

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
                    <AlarmOnTwoToneIcon sx={{ fontSize: "4rem", mb: "1rem" }} />
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
                      sx={{ fontSize: "4rem", mb: "1rem" }}
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

      <Dialog open={semesterModalOpen} onClose={handleSemesterModalClose}>
        <DialogTitle style={{ textAlign: "center" }}>
          {semesterModalIcon}
          {semesterModalContent}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleSemesterModalClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={viewAllOpen} onClose={handleViewAllClose}>
        <DialogTitle variant="h5" style={{ marginBottom: "10px" }}>
          Announcements
        </DialogTitle>
        <DialogContent>
          {announcements.map((announcement, index) => (
            <MakeAnnouncementCard key={index} {...announcement} />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewAllClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={formOpen} onClose={handleFormClose}>
        <DialogTitle>Make Announcement</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Content"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose}>Cancel</Button>
          <Button onClick={handleAnnounce} variant="contained">
            Announce
          </Button>
        </DialogActions>
      </Dialog>
    </NavBar>
  );
};

export default LandingPage;
