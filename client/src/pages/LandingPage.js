import React, { useState, useEffect } from "react";
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
  Link,
} from "@mui/material";
import NavBar from "../components/Navbar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PostAddIcon from "@mui/icons-material/PostAdd";

import AlarmOnTwoToneIcon from "@mui/icons-material/AlarmOnTwoTone";
import PendingActionsTwoToneIcon from "@mui/icons-material/PendingActionsTwoTone";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [formOpen, setFormOpen] = useState(false);

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [file, setfile] = useState("");
  const [mode, setMode] = useState("");

  const [threadtitle, setThreadTitle] = useState("");
  const [displayedThreads, setDisplayedThreads] = useState([]);
  const [showAllThreads, setShowAllThreads] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);

  const [semesterModalOpen, setSemesterModalOpen] = useState(false);
  const [semesterModalContent, setSemesterModalContent] = useState("");
  const [semesterModalIcon, setSemesterModalIcon] = useState(null);

  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [updateTitle, setUpdateTitle] = useState("");

  const [threads, setThreads] = useState([
    {
      id: 1,
      title: "Thread 1",
      posts: [
        {
          id: 1,
          title: "Post 1",
          content: "This is the content of post 1.",
          creator: "Amir Rehman",
          date: "2023-01-01",
          file: null,
        },
        {
          id: 2,
          title: "Post 2",
          content: "This is the content of post 2.",
          creator: "Amir Rehman",
          date: "2023-01-02",
          file: null,
        },
      ],
    },
    {
      id: 2,
      title: "Thread 2",
      posts: [],
    },
  ]);

  useEffect(() => {
    setDisplayedThreads(threads.slice(0, showAllThreads ? threads.length : 3));
  }, [threads, showAllThreads]);

  //form open and close
  const handleFormOpen = (mode) => {
    setMode(mode);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setMode("");
    setFormOpen(false);
  };

  const handleViewThreadModalOpen = (thread) => {
    setSelectedThread(thread);
    setUpdateTitle(thread.title);
    setUpdateFormOpen(true);
  };

  const handleUpdateFormOpen = () => {
    setUpdateFormOpen(true);
  };

  const handleUpdateFormClose = () => {
    setUpdateFormOpen(false);
  };

  const handlePostToThread = (thread) => {
    setMode("post");
    setSelectedThread(thread);
    setFormOpen(true);
  };

  const handleViewThreadPosts = (thread) => {
    navigate(`/admin/threads/${thread.id}`);
  };

  const handlemodeforaddThread = () => {
    setMode("add");
    setFormOpen(true);
  };

  //handle delete
  const handleDelete = (thread) => {};
  //add thread
  const handleAddThread = () => {
    const newThread = {
      id: threads.length + 1,
      title: threadtitle,
    };

    setThreads([newThread, ...threads]);
    setFormOpen(false);
  };

  //add post to thread
  const handleAnnounce = () => {
    setTitle("");
    setfile("");
    setContent("");
    setFormOpen(false);
  };

  // Update the thread with new title and content
  const handleUpdateThread = () => {
    const updatedThreads = threads.map((t) =>
      t.id === selectedThread.id ? { ...t, title: updateTitle } : t
    );
    setThreads(updatedThreads);
    handleUpdateFormClose();
  };

  const handleSemesterModalOpen = (message, icon) => {
    setSemesterModalContent(message);
    setSemesterModalIcon(icon);
    setSemesterModalOpen(true);
  };

  const handleSemesterModalClose = () => {
    setSemesterModalOpen(false);
  };

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
        >
          {threads.length > 3 && (
            <Button
              variant="contained"
              style={{ margin: "10px" }}
              onClick={() => setShowAllThreads(!showAllThreads)}
            >
              {showAllThreads ? "Show Latest 3 Threads" : "View All Threads"}
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handlemodeforaddThread}
            style={{ margin: "10px" }}
          >
            Add Thread
          </Button>
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

        <div
          style={{ marginBottom: "20px", position: "relative", width: "100%" }}
        >
          <CardContent>
            <Typography variant="h5" style={{ marginBottom: "10px" }}>
              Threads
            </Typography>

            {displayedThreads.map((thread) => (
              <Card
                key={thread.id}
                sx={{
                  ...styles.threadCard,
                }}
              >
                <CardContent>
                  <Typography variant="h7">{thread.title}</Typography>
                  <Box sx={styles.threadOptions}>
                    <VisibilityIcon
                      variant="outlined"
                      color="primary"
                      sx={{
                        fontWeight: "bold",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleViewThreadPosts(thread)}
                    />

                    <DriveFileRenameOutlineIcon
                      variant="outlined"
                      color="primary"
                      sx={{
                        fontWeight: "bold",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleViewThreadModalOpen(thread)}
                    />

                    <PostAddIcon
                      variant="outlined"
                      color="primary"
                      sx={{
                        fontWeight: "bold",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => handlePostToThread(thread)}
                    />

                    <DeleteOutlineIcon
                      variant="outlined"
                      color="primary"
                      sx={{
                        fontWeight: "bold",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(thread)}
                    />
                  </Box>
                </CardContent>
              </Card>
            ))}
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

      {/* Dialog for Make Post */}
      <Dialog open={formOpen && mode === "post"} onClose={handleFormClose}>
        <DialogTitle>Make Post</DialogTitle>
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
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setfile(e.target.value)}
            style={{ margin: "10px 0" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose}>Cancel</Button>
          <Button onClick={handleAnnounce} variant="contained">
            Post
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Add Thread */}
      <Dialog open={formOpen && mode === "add"} onClose={handleFormClose}>
        <DialogTitle>Add Thread</DialogTitle>
        <DialogContent>
          <TextField
            label="Thread Title"
            variant="outlined"
            fullWidth
            value={threadtitle}
            onChange={(e) => setThreadTitle(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose}>Cancel</Button>
          <Button onClick={() => handleAddThread(title)} variant="contained">
            Add Thread
          </Button>
        </DialogActions>
      </Dialog>
      {/* Update Thread Form Modal */}
      <Dialog open={updateFormOpen} onClose={handleUpdateFormClose}>
        <DialogTitle>Update Thread</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={updateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateFormClose}>Cancel</Button>
          <Button onClick={handleUpdateThread} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </NavBar>
  );
};

export default LandingPage;
