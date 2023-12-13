import { Container } from "@mui/material";
import React from "react";
import Course from "./CourseCard";
import { Typography, Button, Box } from "@mui/material";


function CoursesList() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', marginBottom: '20px' }}>

            <Container sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <Typography variant="h5" sx={{ width: '100%', marginBottom: '10px' }}>
                    Your Courses
                </Typography>
                <Course></Course>
                <Course></Course>
                <Course></Course>
              
            </Container>
            <Button variant="contained" sx={{ alignSelf: 'flex-end' , marginRight: '22px', marginTop: '10px'}}>View All</Button>
        </Box>
    )
}


export default CoursesList;