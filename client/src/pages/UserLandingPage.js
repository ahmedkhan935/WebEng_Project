import NavBar from "../components/Navbar";
import React from 'react';
import Button from '@material-ui/core/Button';

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