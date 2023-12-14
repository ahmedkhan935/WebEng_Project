import * as React from 'react';
import { Card, CardActionArea, CardContent, Typography, Collapse } from '@mui/material';

function AnnouncementCard() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ marginBottom: '10px' }}>
            <CardActionArea onClick={handleExpandClick}>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        Breaking news!
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{fontSize: 'small', fontStyle: 'italic'}}>
                        Posted on 10-Dec-2023 by Amir Rehman
                    </Typography>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Typography variant="body2" color="text.secondary">
                            This is to inform everyone that no final exams will be held due to the undying mercy of the teachers. We have decided to give you all a 4.0 GPA.
                            Please do not thank us. We are just doing our job. If you have any complaints, please contact the Dean. However, we will not be held responsible for any consequences.
                        </Typography>
                    </Collapse>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default AnnouncementCard;