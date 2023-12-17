import { useParams } from "react-router";
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
} from "@mui/material";
import NavBar from "../components/Navbar";

import MakeAnnouncementCard from "../components/MakeAnnouncementCard";

const AdminThread = () => {
  const [updatePostFormOpen, setUpdatePostFormOpen] = useState(false);
  const [updatePostTitle, setUpdatePostTitle] = useState("");
  const [updatePostContent, setUpdatePostContent] = useState("");
  const [updatePostFile, setUpdatePostFile] = useState(null);
  const { id } = useParams();

  //handle delete post of thread
  const handleDeletepost = () => {};

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

  const [posts, setPosts] = useState([
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
      content: "This is the content of post 1.",
      creator: "Amir Rehman",
      date: "2023-01-02",
      file: null,
    },
  ]);

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
          <Typography variant="h5" color="primary">
            Posts from this thread:
          </Typography>

          <CardContent>
            {posts.map((post) => (
              <div style={{ marginTop: "20px" }}>
                <MakeAnnouncementCard
                  key={post.id}
                  title={post.title}
                  content={post.content}
                  date={post.date}
                  creator={post.creator}
                  file={post.file}
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
    </NavBar>
  );
};
export default AdminThread;
