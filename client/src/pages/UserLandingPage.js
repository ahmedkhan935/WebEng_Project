import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import ClassesList from '../components/ClassesList';
import NavBar from '../components/Navbar';
import AnnouncementList from '../components/AnnouncementList'; 

//Landing page for student/teacher, can be customized accordingly
function UserLandingPage({role}) {

    return (
        <NavBar>
            <Container>
                <AnnouncementList></AnnouncementList>
                <ClassesList></ClassesList>
            </Container>
        </NavBar>
    )
}

export default UserLandingPage;