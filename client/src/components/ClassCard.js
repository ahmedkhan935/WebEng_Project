import * as React from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import classroomHeader from '../assets/images/classroomHeader.jpg'; // import the image
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'; 


//Course card represents a small tile containing brief info about the course.
function ClassCard({classroom}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const location = useLocation();
  const userRole = location.pathname.split('/')[1]; 

  let url = "/"+userRole+"/classes/"+classroom.code;

  return (
    <Card sx={{ maxWidth: isSmallScreen ? '100%' : 345, minWidth: isSmallScreen ? '100%' : 345, marginTop: '10px'}}>
      <CardActionArea component={Link} to={url} >
        <CardMedia
          sx={{ height: 100 }}
          image={classroomHeader}
          title="courseimg"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
          {  classroom.name }
          </Typography>
          <Typography variant="body2" color="text.secondary">
           {"Classroom code: " + classroom.code  } <br />
           { "Welcome to the "+ classroom.courseId.courseType+" Class of "+classroom.courseId.courseName  } <br />
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small">{ userRole == "student" ? "View To-Do" : "Attendance"}</Button>
        <Button size="small">Unregister</Button>
      </CardActions>
    </Card>
  );
}

export default ClassCard;

