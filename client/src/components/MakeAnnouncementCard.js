import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Collapse,
  IconButton,
  CardActions,
} from "@mui/material";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ marginBottom: "10px" }}>
      <CardActionArea onClick={handleExpandClick}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h7"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ fontSize: "small", fontStyle: "italic" }}
          >
            Posted on {date} by {creator}
          </Typography>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography variant="body2" color="text.secondary">
              {content}
            </Typography>
            {file && (
              <Typography variant="body2" color="text.secondary">
                File: {file}
              </Typography>
            )}
          </Collapse>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <IconButton onClick={handleEdit} size="small">
          <BorderColorTwoToneIcon />
        </IconButton>
        <IconButton onClick={handleDelete} size="small">
          <DeleteTwoToneIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default MakeAnnouncementCard;
