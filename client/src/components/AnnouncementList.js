import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import AnnouncementCard from './AnnouncementCard';
import { Link } from 'react-router-dom';
import { useEffect } from 'react'
import { getThreads } from '../services/StudentService' 


function AnnouncementList({isFullList}) {
    const [announcements, setAnnouncements] = React.useState([]);
    const [announcementError, setAnnouncementError] = React.useState(null);
    const [announcementFetched, setAnnouncementFetched] = React.useState(false); //To check if classes have been fetched or not
    
    useEffect(() => {
        getThreads().then((data) => {
            if (data.data.length == 0 ) return;
                setAnnouncements(data.data[0].threadId.content);
        });
    }, []);

    

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', marginBottom: '20px'}}>
            <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="h5" sx={{ width: '100%', marginBottom: '10px' }}>
                    Latest Announcements
                </Typography>            
                {announcements.map(announcement => 
                    <AnnouncementCard key={announcement._id} announcement={announcement}></AnnouncementCard>
                )}
                {!isFullList && announcements.length > 3 ?
                <Button variant="contained" sx={{ alignSelf: 'flex-end', marginRight: '22px', marginTop: '10px' }}  component={Link} to='/student/threads'>View All</Button> : null}
            </Container>
        </Box>
    )
}

export default AnnouncementList;
