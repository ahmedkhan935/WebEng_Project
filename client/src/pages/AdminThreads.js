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
  CardActionArea,
  Box,
  Link,
  Collapse,
  IconButton,
  CardActions,
  Menu,
  MenuItem,
} from "@mui/material";

import NavBar from "../components/Navbar";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useNavigate } from "react-router-dom";

const AdminThreads = () => {
  const navigate = useNavigate();
  const [formOpen, setFormOpen] = useState(false);

  const [mode, setMode] = useState("");

  const [threadtitle, setThreadTitle] = useState("");
  const [displayedThreads, setDisplayedThreads] = useState([]);
  const [showAllThreads, setShowAllThreads] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);

  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [updateTitle, setUpdateTitle] = useState("");

  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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

  const handleFormClose = () => {
    setMode("");
    setFormOpen(false);
  };

  const handleViewThreadModalOpen = (thread) => {
    setSelectedThread(thread);
    setUpdateTitle(thread.title);
    setUpdateFormOpen(true);
  };

  const handleUpdateFormClose = () => {
    setUpdateFormOpen(false);
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

  // Update the thread with new title and content
  const handleUpdateThread = () => {
    const updatedThreads = threads.map((t) =>
      t.id === selectedThread.id ? { ...t, title: updateTitle } : t
    );
    setThreads(updatedThreads);
    handleUpdateFormClose();
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
    h7: {
      fontSize: "15px",
      fontWeight: "bold",
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
        <div
          style={{ marginBottom: "20px", position: "relative", width: "100%" }}
        >
          <Button
            variant="contained"
            onClick={handlemodeforaddThread}
            style={{ margin: "10px", float: "right" }}
          >
            Add Thread
          </Button>
          <CardContent>
            <Typography variant="h5" style={{ marginBottom: "10px" }}>
              Admin Threads
            </Typography>

            {displayedThreads.map((thread) => (
              <Card
                key={thread.id}
                sx={{
                  ...styles.threadCard,
                }}
              >
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <CardActionArea onClick={() => handleViewThreadPosts(thread)}>
                    <CardContent>
                      <Typography
                        sx={
                          ({ fontWeight: "bold", marginLeft: "10px" },
                          styles.h7)
                        }
                      >
                        {thread.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>

                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <IconButton
                      onClick={(event) => {
                        event.stopPropagation(); // Prevent card click
                        handleMenuOpen(event);
                      }}
                      size="small"
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem
                        onClick={() => handleViewThreadModalOpen(thread)}
                      >
                        Update
                      </MenuItem>
                      <MenuItem onClick={() => handleDelete(thread)}>
                        Delete
                      </MenuItem>
                    </Menu>
                  </CardActions>
                </CardActions>
              </Card>
            ))}
          </CardContent>
        </div>
      </div>

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
          <Button
            onClick={() => handleAddThread(threadtitle)}
            variant="contained"
          >
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

export default AdminThreads;
