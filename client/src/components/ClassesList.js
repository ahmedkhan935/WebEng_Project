import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import ClassCard from "./ClassCard";
import { Typography, Button, Box } from "@mui/material";
import { getClasses } from '../services/StudentService';
import { Link } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import { useLocation } from 'react-router-dom'; 

function ClassesList({ isFullList }) {
    const [classes, setClasses] = React.useState([]);
    const [classesError, setClassesError] = React.useState(null);
    const [classesFetched, setClassesFetched] = React.useState(false); //To check if classes have been fetched or no

    const location = useLocation();
    const userRole = location.pathname.split('/')[1];

    let classesUrl = "/" + userRole + "/classes";

    useEffect(() => {
        getClasses().then((data) => {
            if (data.error) { //data contains an erorr property
                setClassesError(data.error);
                setClassesFetched(true);
                return;
            } else {
                setClasses(data.data);
                setClassesFetched(true);
                console.log(data.data);
            }
        });
    }, []);


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', marginBottom: '20px' }}>
            <Container sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '12px' }}>
                <Typography variant="h5" sx={{ width: '100%', marginBottom: '0px' }}>
                    Your Classes
                </Typography>

                { 
                   !classesFetched ? 
                    <Grid container spacing={2}>
                        {Array.from(new Array(3)).map((_, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Skeleton variant="rectangular" width="100%" height={200} /> {/* Adjust height as needed */}
                                <Skeleton height={40} /> {/* Adjust height as needed */}
                                <Skeleton width="60%" height={40} /> {/* Adjust height as needed */}
                            </Grid>
                        ))}
                    </Grid> :
                        classes.length == 0 ? <Typography variant="subtitle">No classes found.</Typography> :
                            classesError ? <Typography variant="subtitle" color="warning">Sorry! An error occurred.</Typography> :
                                classes.map((classroom) => {
                                    return <ClassCard classroom={classroom} key={classroom.code}></ClassCard>
                                })
                }
            </Container>
            {!isFullList && classes.length > 3  ?
                <Button variant="contained" sx={{ alignSelf: 'flex-end', marginRight: '22px', marginTop: '10px' }} component={Link} to={classesUrl}>View All</Button> : null}
        </Box>
    )
}


export default ClassesList;