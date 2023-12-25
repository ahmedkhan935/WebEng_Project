import React from 'react';
import { Container, Typography, Button, Box, Skeleton } from '@mui/material';
import AnnouncementCard from './AnnouncementCard';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react'
import { getThreads as getStudentThreads } from '../services/StudentService';
import { getThreads as getTeacherThreads } from '../services/TeacherService';
//import { getThreadsTeacher } from '../services/TeacherService'

function AnnouncementList({ isFullList, thread }) {
    const [announcements, setAnnouncements] = React.useState([]);
    const [announcementFetched, setAnnouncementFetched] = React.useState(false); //To check if classes have been fetched or not
    const [announcementsError, setAnnouncementsError] = React.useState(null); //To check if classes have been fetched or not
    const location = useLocation();
    const userRole = location.pathname.split('/')[1]; // Extract userRole from the URL

    let threadsUrl = "/" + userRole + "/threads";


    useEffect(() => {
        //If thread object is passed, set announcements of that thread.
        if (thread) {
            setAnnouncements(thread)
            setAnnouncementFetched(true)
        } else {
            if (userRole == "student") {
                //Else, it means it's the home page, set top 3 announcements of the main thread.
                getStudentThreads().then((data) => {
                    handleData(data);
                });
            } else if (userRole == "teacher") {
                getTeacherThreads().then((data) => {
                  handleData(data);  
                });
            }
        }
    }, []);

    const handleData = (data) => {
        if (data.data.length == 0) {
            return;
        }
        if (data.error) { //data contains an erorr property
            setAnnouncementsError(data.error);
            alert(data.error)
            setAnnouncementFetched(true);
            return;
        } else {
            const content = data.data[0].threadId.content; //every user is subscribed to this thread when user is created
            setAnnouncements(isFullList ? content : content.slice(0, 3)); //first 3 elements
            setAnnouncementFetched(true);
        }
    }



    if(announcementsError) {
        return <Typography variant="subtitle" color="warning">Sorry! An error occurred.</Typography>
    }

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
                {!isFullList &&
                    <Button variant="contained" sx={{ alignSelf: 'flex-end', marginTop: '10px' }} component={Link} to={threadsUrl}>
                        View All
                    </Button>}
            </Container>
        </Box>
    )
}

export default AnnouncementList;
