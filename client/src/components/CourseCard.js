import * as React from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import classroomHeader from '../assets/images/classroomHeader.jpg'; // import the image


//Course card represents a small tile containing brief info about the course.
function CourseCard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Card sx={{ maxWidth: isSmallScreen ? '100%' : 345 }}>
      <CardActionArea onClick={() => { console.log('Card clicked!'); }}>
        <CardMedia
          sx={{ height: 100 }}
          image={classroomHeader}
          title="courseimg"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            Programming Fundamnetals
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Course Code <br />
            Course Teacher <br />
            Course Description <br />
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small">View To-Do</Button>
        <Button size="small">Unregister</Button>
      </CardActions>
    </Card>
  );
}

export default CourseCard;
