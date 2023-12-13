import * as React from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';


function Course() {
    return (
        <Card sx={{ marginBottom: '10px' }}>
            <CardActionArea onClick={() => { console.log('Card clicked!'); }}>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        Breaking news!
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        This is to inform everyone that no final exams will be held due to the undying mercy of the teachers. We have decided to give you all a 4.0 GPA.
                        Please do not thank us. We are just doing our job. If you have any complaints, please contact the Dean. However, we will not be held responsible for any consequences.
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default Course;

