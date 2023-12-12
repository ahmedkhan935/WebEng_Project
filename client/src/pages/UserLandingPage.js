import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NavBar from "../components/Navbar"

function UserLandingPage() {
    return (
        <Box>
            <NavBar />
            <Box>
                <Button variant="contained" color="primary">Helo!</Button>
                <Typography variant="h1">User Landing Page</Typography>
            </Box>
        </Box>
    )
}

export default UserLandingPage;