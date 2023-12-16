import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import ClassesList from '../components/ClassesList';
import NavBar from '../components/Navbar';
import { getClasses, getThreads } from '../services/StudentService'
import AnnouncementList from '../components/AnnouncementList'; 
import useStore from '../store/store';


//Landing page for student/teacher, can be customized accordingly
function UserLandingPage({role}) {
    const { userRole, setUserRole } = useStore();

    useEffect(() => {
        setUserRole(role); //Update zustand store here, now it will be accessible everywhere
    }, []);

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