import React from 'react';
import { Button, Container } from '@mui/material';
import CoursesList from '../components/CoursesList';
import NavBar from '../components/Navbar';
import AnnouncementList from '../components/AnnouncementList';

function UserLandingPage() {
    return (
        <NavBar >
            <Container>
                <AnnouncementList></AnnouncementList>
                <CoursesList></CoursesList>
            </Container>
        </NavBar>
    )
}

export default UserLandingPage;