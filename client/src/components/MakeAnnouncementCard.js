import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Collapse,
} from "@mui/material";

function MakeAnnouncementCard({ title, content, date, creator }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ marginBottom: "10px" }}>
      <CardActionArea onClick={handleExpandClick}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
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
          </Collapse>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MakeAnnouncementCard;
