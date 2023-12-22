import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Collapse,
  IconButton,
  CardActions,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import AttachmentIcon from "@mui/icons-material/Attachment";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function MakeAnnouncementCard({
  title,
  content,
  date,
  creator,
  file,
  handleEdit,
  handleDelete,
}) {
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

  const handleEditClick = () => {
    handleMenuClose();
    handleEdit();
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    handleDelete();
  };

  return (
    <Card sx={{ marginBottom: "10px" }}>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          gutterBottom
          variant="h7"
          component="div"
          sx={{ fontWeight: "bold", marginLeft: "10px" }}
        >
          {title}
        </Typography>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <IconButton onClick={handleMenuOpen} size="small">
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {/* <MenuItem onClick={handleEditClick}>Update</MenuItem> */}
            <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
          </Menu>
        </CardActions>
      </CardActions>
      <CardActionArea onClick={handleExpandClick}>
        <CardContent>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ fontSize: "small" }}
          >
            Posted on {date} by {creator}
          </Typography>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <br />
            <Typography>{content}</Typography>
            <br />

            {file && (
              <div style={{ marginTop: "10px" }}>
                <Typography
                  variant="h7"
                  color="secondary"
                  sx={{
                    fontWeight: "bolder",
                    zIndex: 1,
                    position: "relative",
                  }}
                >
                  Attachments
                </Typography>
                <Box
                  sx={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}
                >
                  <Chip
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
                  />
                </Box>
              </div>
            )}
          </Collapse>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MakeAnnouncementCard;
