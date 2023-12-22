import React from 'react';
import { Container, Typography, Button, Box, Skeleton } from '@mui/material';
import AnnouncementCard from './AnnouncementCard';
import { Link } from 'react-router-dom';
import { useEffect } from 'react'
import { getThreads } from '../services/StudentService'


function AnnouncementList({ isFullList, thread }) {
    const [announcements, setAnnouncements] = React.useState([]);
    const [announcementFetched, setAnnouncementFetched] = React.useState(false); //To check if classes have been fetched or not

    useEffect(() => {
        console.log("announcementlist isfulllist", isFullList);
        console.log("announcementlist thread", thread);

        //If thread object is passed, set announcements of that thread.
        if (thread) {
            setAnnouncements(thread)
            setAnnouncementFetched(true)
        } else {
            //Else, it means it's the home page, set top 3 announcements of the main thread.
            getThreads().then((data) => {
                if (data.data.length == 0) return;
                const content = data.data[0].threadId.content; //every user is subscribed to this thread when user is created
                setAnnouncements(isFullList ? content : content.slice(0, 3)); //first 3 elements
                setAnnouncementFetched(true);
            });
        }
    }, []);



    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', marginBottom: '20px' }}>
            <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="h5" sx={{ width: '100%', marginBottom: '10px' }}>
                  {!thread ? "Latest Announcements" : thread.title }
                </Typography> 
               <Typography variant="subtitle" sx={{ color: 'gray', marginBottom: '10px' }}>
                  {!thread ? "Click on any announcement to view details." : thread.description}
                </Typography> 

                {!announcementFetched ?
                    Array.from(new Array(3)).map((_, index) => (
                        <Box key={index} sx={{ marginBottom: '10px' }}>
                            <Skeleton variant="rectangular" height={100} />
                        </Box>
                    )) :
                    announcements.length === 0 ?
                        <Typography variant="subtitle" sx={{ width: '100%', marginBottom: '10px', color: 'red' }}>
                            No announcements found.
                        </Typography> :
                    announcements.map(announcement =>
                        <AnnouncementCard key={announcement._id} announcement={announcement}></AnnouncementCard>
                    )
                }
                {!isFullList ?
                    <Button variant="contained" sx={{ alignSelf: 'flex-end', marginTop: '10px' }} component={Link} to='/student/threads'>View All</Button> : null}
            </Container>
        </Box>
    )
}

export default AnnouncementList;
