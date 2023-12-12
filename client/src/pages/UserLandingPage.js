import NavBar from "../components/Navbar";
import React from 'react';
import { Button } from 'react-daisyui';

function UserLandingPage() {
    return (
        <div>
            <Button tag="a" color="primary" className="normal-case text-xl"> Helo! </Button>
            <NavBar />
            <h1>User Landing Page</h1>
        </div>
    )
}

export default UserLandingPage;