import React from "react";
import {
  Card,
  Dialog,
  DialogTitle,
  CircularProgress,
  CardContent,
  Typography,
  Collapse,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import AttachmentIcon from "@mui/icons-material/Attachment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { downloadFile } from "../services/ThreadService";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function AnnouncementCard({
  post,
  handleEdit,
  handleDelete,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [downloading, setDownloading] = React.useState(false);

  const file = post.attachments ? post.attachments.orignalName : null;
  const downloadname = post.attachments ? post.attachments.name : null;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    handleMenuClose();
    handleEdit();
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    handleDelete();
  };
  // const handleDownload = async () => {
  //   setDownloading(true);
  //   try {
  //     const response = await downloadFile(post.attachments.name);
  //     if (!response.ok) {
  //       throw new Error("HTTP error " + response.status);
  //     }

  //     const blob = await response.blob();
  //     console.log(blob);
  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download =post.attachments.originalName;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } catch (error) {
  //     console.error("Fetch error: ", error);
  //   } finally {
  //     setDownloading(false);
  //   }
  // };

  //to download card attachment
  const download = async () => {
    setDownloading(true);
    try {
      const response = await downloadFile(downloadname);
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }

      const blob = await response.blob();
      console.log(blob);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Fetch error: ", error);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <Card sx={{ marginBottom: "10px", position: 'relative', padding: '10px' }}>
      <CardContent>
        <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }} >
          {post.title}
        </Typography>

        <Typography
          variant="subtitle"
          color="text.secondary"
          sx={{ fontSize: "small" }}
        >
          Posted on {new Date(post.date).toLocaleDateString()} by {post.createdBy ? post.createdBy : "Amir Rehman"}
        </Typography>

        {handleEdit && handleDelete &&
          <>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              sx={{ position: 'absolute', top: '10px', right: '10px' }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}

              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
            </Menu>
          </>
        }
        <br></br>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          sx={{ borderRadius: '2px', paddingLeft: '0px' }}

        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          <Typography variant="body2" color="textSecondary">
            {expanded ? 'View Less' : 'View More'}
          </Typography>
        </IconButton>




        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography sx={{ marginTop: '10px' }}>{post.content}</Typography>
          {file &&
            <>
              <hr></hr>
              <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bolder', zIndex: 1, position: 'relative' }}>
                Attachments
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                <Tooltip title="Click to download attachment" placement="right">
                  {/* <Chip
                    icon={<AttachmentIcon />}
                    label={file}
                    clickable
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    sx={{
                      margin: "5px",
                      backgroundColor: (theme) =>
                        `${theme.palette.secondary.main}1A`,
                    }}
                    onClick={() => handleDownload(file)}
                  /> */}
                  <Chip
                    key={downloadname}
                    icon={<AttachmentIcon />}
                    label={file}
                    clickable
                    component="a"
                    onClick={() => download(downloadname)}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    sx={{
                      margin: '5px',
                      backgroundColor: theme => `${theme.palette.secondary.main}1A` // 33 is hex for 20% opacity
                    }}
                  />
                </Tooltip>
              </Box>
            </>
          }
        </Collapse>
      </CardContent>
      <Dialog open={downloading}>
        <Box sx={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: '48px' }}>
          <DialogTitle>Downloading file, please wait...</DialogTitle>
          <CircularProgress color="secondary" />
        </Box>
      </Dialog>
    </Card>
  );
}

export default AnnouncementCard;
