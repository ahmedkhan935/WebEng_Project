//page to view all threads
import React from "react";
import { Box, Typography, Card, CardContent, Container, alpha, CardActionArea } from "@mui/material";
import NavBar from "../components/Navbar";
import AnnouncementOutlined from '@mui/icons-material/AnnouncementOutlined';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';


function ThreadCard() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

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
            <CardActionArea component={Link} to="/student/threads/1" >
                <CardContent sx = {{ padding: '20px'}}>
                    <Box display="flex" alignItems="center" mb={2}>
                        <AnnouncementOutlined sx={{
                            color: alpha(theme.palette.secondary.main, 0.5),
                            position: 'absolute',
                            left: '0', // Adjust this value
                            transform: 'translateY(19%) translateX(-12%) ', // Adjust this value
                            fontSize: '120px',
                        }} />
                        <Typography variant="h5" component="div" color="white" sx={{ marginLeft: '10px', zIndex: 2 }}>
                            Thread Title
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>

        </Card>
    );
}
function Threads() {
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
                    <ThreadCard> </ThreadCard>
                    <ThreadCard> </ThreadCard>
                    <ThreadCard> </ThreadCard>
                </Container>
            </Box>
        </NavBar>
    )
}

export default Threads;