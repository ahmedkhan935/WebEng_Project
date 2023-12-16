import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import Announcement from './AnnouncementCard';
import { Link } from 'react-router-dom';


function AnnouncementList({isFullList}) {
    const [announcements, setAnnouncements] = React.useState([]);
    const [announcementError, setAnnouncementError] = React.useState(null);
    const [announcementFetched, setAnnouncementFetched] = React.useState(false); //To check if classes have been fetched or not

    //Get all announcements from threads
    

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', marginBottom: '20px'}}>
            <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="h5" sx={{ width: '100%', marginBottom: '10px' }}>
                    Latest Announcements
                </Typography>            
                <Announcement> </Announcement>
                <Announcement> </Announcement>
                <Announcement> </Announcement>
                {!isFullList && announcements.length > 3 ?
                <Button variant="contained" sx={{ alignSelf: 'flex-end', marginRight: '22px', marginTop: '10px' }}  component={Link} to='/student/threads'>View All</Button> : null}
            </Container>
        </Box>
    )
}

export default AnnouncementList;
