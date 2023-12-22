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

import AlarmOnTwoToneIcon from "@mui/icons-material/AlarmOnTwoTone";
import PendingActionsTwoToneIcon from "@mui/icons-material/PendingActionsTwoTone";
import { useNavigate } from "react-router-dom";
import { addThread, deleteThread, getThreads, updateThread } from "../services/ThreadService";

const AdminThreads = () => {
  const navigate = useNavigate();
  const [formOpen, setFormOpen] = useState(false);

  const [mode, setMode] = useState("");

  const [threadtitle, setThreadTitle] = useState("");
  const [selectedThread, setSelectedThread] = useState(null);

  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [updateTitle, setUpdateTitle] = useState("");

  const [threads, setThreads] = useState([
  ]);

  useEffect(() => {
    getThreads().then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {

          setThreads(data);
        });
      }
    });
    //setDisplayedThreads(threads.slice(0, showAllThreads ? threads.length : 3));
  }, []);

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
    navigate(`/admin/threads/${thread._id}`);
  };

  const handlemodeforaddThread = () => {
    setMode("add");
    setFormOpen(true);
  };

  //handle delete
  const handleDelete = (thread) => {
    console.log(thread._id);
    deleteThread(thread._id).then((res) => {
      if (res.status === 200) {
        setThreads(threads.filter((t) => t._id !== thread._id));
      }
    }
    );

  };
  //add thread
  const handleAddThread = () => {
    // const newThread = {
    //   id: threads.length + 1,
    //   title: threadtitle,
    // };

    addThread(threadtitle).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setThreads([data, ...threads]);
        });
      }
    });



    //setThreads([newThread, ...threads]);
    setFormOpen(false);
  };

  // Update the thread with new title and content
  const handleUpdateThread = () => {
    // const updatedThreads = threads.map((t) =>
    //   t.id === selectedThread.id ? { ...t, title: updateTitle } : t
    // );
    //setThreads(updatedThreads);
    updateThread(selectedThread._id, updateTitle).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setThreads(
            threads.map((t) =>
              t._id === selectedThread._id ? { ...t, title: updateTitle } : t
            )
          );
        });
      }
    }); 
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
              Threads
            </Typography>

            {threads.map((thread) => (
              <Card
                key={thread._id}
                sx={{
                  ...styles.threadCard,
                }}
              >
                <CardContent>
                  <Typography variant="h6">{thread.title}</Typography>
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
