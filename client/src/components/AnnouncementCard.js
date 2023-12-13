import * as React from 'react';
import { Card, CardActionArea,  CardContent,  Typography } from '@mui/material';

//Announcement card represents a small tile containing announcement title and some announcement text.
function AnnouncementCard() {
    return (
        <Card sx={{ marginBottom: '10px' }}>
            <CardActionArea onClick={() => { console.log('Card clicked!'); }}>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        Breaking news!
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{fontSize: 'small', fontStyle: 'italic'}}>
                        Posted on 10-Dec-2023 by Amir Rehman
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

export default AnnouncementCard;

