//page to view all threads
import React from "react";
import { Box, Typography, Card, CardContent,Skeleton, Container, alpha, CardActionArea } from "@mui/material";
import NavBar from "../components/Navbar";
import AnnouncementOutlined from '@mui/icons-material/AnnouncementOutlined';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { getThreads } from "../services/StudentService";
import { useLocation } from 'react-router-dom'; 


function ThreadCard({thread}) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const location = useLocation();
    const userRole = location.pathname.split('/')[1];

    const url = "/" + userRole + "/threads/" + thread._id;

    return (
        <Card sx={{
            width: isSmallScreen ? '100%' : '70%',
            maxHeight: '115px', ///max height of the card
            bgcolor: 'primary.main',
            color: 'white',
            marginBottom: '20px',
            overflow: 'hidden', // Hide overflow
            position: 'relative' // Needed for absolute positioning of child elements
        }}>
            <CardActionArea component={Link} to={url} >
                <CardContent sx={{ padding: '20px' }}>
                    <Box display="flex" alignItems="center" mb={2}>
                        <AnnouncementOutlined sx={{
                            color: alpha(theme.palette.secondary.main, 0.5),
                            position: 'absolute',
                            left: '0', // Adjust this value
                            transform: 'translateY(19%) translateX(-12%) ', // Adjust this value
                            fontSize: '120px',
                        }} />
                        <Typography variant="h5" component="div" color="white" sx={{ marginLeft: '10px', zIndex: 2 }}>
                            {thread.title}
                        </Typography> <br></br>
                        <Typography variant="subtitle2" component="div" color="white" sx={{ marginLeft: '10px', zIndex: 2 }}>
                            {thread.description}    
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
function Threads() {
    const [threads, setThreads] = React.useState([]);
    const [threadsError, setThreadsError] = React.useState("");
    const [threadsFetched, setThreadsFetched] = React.useState(false); //To check if classes have been fetched or not

    useEffect(() => {
        getThreads().then((data) => {
            if (data.error) {
                setThreadsError(data.error);
                setThreadsFetched(true);
                return;
            }
            else {
                setThreads(data.data.map((thread) => {
                    return thread.threadId; //will return object with content (array of posts),description,title,id of the htread
                }));
                setThreadsFetched(true);
            }

        });
    }, []);


    return (
        <NavBar>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', marginBottom: '20px' }}>
                <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Typography variant="h5" sx={{ width: '100%', marginBottom: '10px' }}>
                        Threads You Are Subscribed To
                    </Typography>
                    <Typography variant="subtitle2" sx={{ width: '100%', marginBottom: '10px' }}>
                        Click on any thread to view posts.
                    </Typography>
                   { !threadsFetched ? //If not fetched display skeleton
                        Array.from(new Array(3)).map((_, index) => (
                        <Box key={index} sx={{ marginBottom: '10px' }}>
                            <Skeleton variant="rectangular" height={70} width="70%" />
                        </Box> )) 
                        :
                        threads.length === 0 ?  //if no threads
                            <Typography variant="subtitle2" sx={{ width: '100%', marginBottom: '10px', color: 'red' }}>
                            You are not subscribed to any threads. Please contact admin for more information.
                            </Typography> 
                            :
                            threadsError ? //if error
                                <Typography variant="subtitle2" sx={{ width: '100%', marginBottom: '10px', color: 'red' }}>
                                Sorry! An error occurred.
                                </Typography> 
                                : //succes case
                                threads.map(thread=> <ThreadCard thread={thread}/>)
                   }

                </Container>
            </Box>
        </NavBar>
    )
}

export default Threads;