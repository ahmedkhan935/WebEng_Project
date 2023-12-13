import { Container } from "@mui/material";
import React from "react";
import Course from "./CourseCard";
import { Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";


function CoursesList({ isFullList }) {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', marginBottom: '20px' }}>
            <Container sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '12px' }}>
                <Typography variant="h5" sx={{ width: '100%', marginBottom: '0px' }}>
                    Your Courses
                </Typography>
                <Course ></Course>
                <Course></Course>
                <Course></Course>
            </Container>
          { !isFullList ?  <Button variant="contained" sx={{ alignSelf: 'flex-end' , marginRight: '22px', marginTop: '10px'}}>View All</Button> : null} 
        </Box>
    )
}


export default CoursesList;