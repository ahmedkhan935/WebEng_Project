import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import Announcement from './AnnouncementCard';
import { Link } from 'react-router-dom';


function AnnouncementList() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', marginBottom: '20px'}}>
            <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="h5" sx={{ width: '100%', marginBottom: '10px' }}>
                    Latest Announcements
                </Typography>            
                <Announcement> </Announcement>
                <Announcement> </Announcement>
                <Announcement> </Announcement>
                <Button variant="contained" sx={{ alignSelf: 'flex-end' }} component={Link} to='/student/threads'>View All</Button>
            </Container>
        </Box>
    )
}

export default AnnouncementList;
