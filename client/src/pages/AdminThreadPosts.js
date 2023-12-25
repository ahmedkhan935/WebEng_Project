import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import axios from "axios";
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
} from "@mui/material";
import NavBar from "../components/Navbar";

import MakeAnnouncementCard from "../components/MakeAnnouncementCard";
import {
  addAnnouncement,
  viewAnnouncements,
  deleteAnnouncement,
} from "../services/ThreadService";
import { viewAllStudents } from "../services/AdminService";

const AdminThread = () => {
  const [updatePostFormOpen, setUpdatePostFormOpen] = useState(false);
  const [updatePostTitle, setUpdatePostTitle] = useState("");
  const [updatePostContent, setUpdatePostContent] = useState("");
  const [updatePostFile, setUpdatePostFile] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [file, setfile] = useState();
  const [rows, setRows] = useState([]);

  const { id } = useParams();

  const sendEmail = async (email) => {
    try {
      const response = await fetch("http://127.0.0.1:3000/admin/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          subject: title,
          text: content,
        }),
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  //handle delete post of thread
  const handleDeletepost = (post) => {
    deleteAnnouncement(id, post._id).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setPosts(posts.filter((posts) => post._id !== posts._id));
        });
      }
    });
  };

  const handleEditpost = (post) => {
    setUpdatePostTitle(post.title);
    setUpdatePostContent(post.content);
    setUpdatePostFile(post.file);
    setUpdatePostFormOpen(true);
  };

  const handleUpdatePostFormOpen = () => {
    setUpdatePostFormOpen(true);
  };

  const handleUpdatePostFormClose = () => {
    setUpdatePostFormOpen(false);
  };

  // Update the post with new title and content
  const handleUpdatePost = () => {
    handleUpdatePostFormClose();
  };

  //posting to thread

  const handlePostToThread = () => {
    setFormOpen(true);
  };

  //form open and close
  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  //add post to thread
  const handleAnnounce = () => {
    var formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("file", file);
    addAnnouncement(id, formData).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setPosts([...posts, data]);
        });
      }
    });
    setTitle("");
    setfile("");
    setContent("");
    setFormOpen(false);
    //sending email here to all students
    rows.forEach((row) => {
      sendEmail(row.email);
    });
  };

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    viewAllStudents().then((res) => {
      const rows = res.map((row) => ({
        studentId: row.rollNumber,
        name: row.name,
        batch: row.batch,
        degree: row.degreeName,
        email: row.email,
        _id: row._id,
      }));

      setRows(rows);
    });

    viewAnnouncements(id).then((res) => {
      res.json().then((data) => {
        setPosts(data);
      });
    });
  }, []);

  return (
    <NavBar>
      <Button
        variant="outlined"
        onClick={() => handlePostToThread()}
        style={{ float: "right", marginRight: "20px" }}
      >
        Post to thread
      </Button>
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
          <Typography variant="h5" color="primary">
            Posts from this thread:
          </Typography>

          <CardContent>
            {posts.map((post) => (
              <div style={{ marginTop: "20px" }}>
                {post.attachments.originalName}
                <MakeAnnouncementCard
                  key={post._id}
                  title={post.title}
                  content={post.content}
                  date={new Date(post.date).toLocaleDateString()}
                  creator="Amir Rehman"
                  file={post.attachments ? post.attachments.orignalName : null}
                  downloadname={post.attachments ? post.attachments.name : null}
                  handleEdit={() => handleEditpost(post)}
                  handleDelete={() => handleDeletepost(post)}
                />
              </div>
            ))}
          </CardContent>
        </div>
      </div>

      {/* Update Post Form Modal */}
      <Dialog open={updatePostFormOpen} onClose={handleUpdatePostFormClose}>
        <DialogTitle>Update Post</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={updatePostTitle}
            onChange={(e) => setUpdatePostTitle(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Content"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={updatePostContent}
            onChange={(e) => setUpdatePostContent(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <input
            type="file"
            accept="image/*,application/pdf"
            value={updatePostFile}
            onChange={(e) => setUpdatePostFile(e.target.value)}
            style={{ margin: "10px 0" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdatePostFormClose}>Cancel</Button>
          <Button onClick={handleUpdatePost} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog for Make Post */}
      <Dialog open={formOpen} onClose={handleFormClose}>
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
            onChange={(e) => setfile(e.target.files[0])}
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
    </NavBar>
  );
};
export default AdminThread;
