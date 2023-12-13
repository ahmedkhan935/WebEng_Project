import * as React from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';


function Course() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => { console.log('Card clicked!'); }}>

        <CardMedia
          sx={{ height: 100 }}
          image="https://www.freevector.com/uploads/vector/preview/28054/Time-to-Study.jpg"
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

export default Course;

