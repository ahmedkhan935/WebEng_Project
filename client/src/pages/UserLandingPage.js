import React from 'react';
import { Button  } from '@mui/material';
import NavBar from '../components/Navbar';

function UserLandingPage() {
    return (
        <div>
            <NavBar />
            <Button variant="contained" color="primary">
                Hello World
            </Button>
            <h1>User Landing Page</h1>
        </div>
    )
}

export default UserLandingPage;