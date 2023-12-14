import React from 'react';
import { Box, Typography } from '@mui/material';

function UpcomingWork() {
    return (
        <Box sx={{ border: '1px solid gray',width: '100%', borderRadius: '5px', mt: '10px',pt: '-20px', pb: '20px', pl: '20px', pr: '20px' }}>
            <Typography variant="h6" color="text.secondary" bgcolor="white" display="inline-block"  sx= {{ mt: '-40px'}}>
                Upcoming Work
            </Typography>
            <Typography variant="body2" color="text.secondary" my={1}>
                Assignment 1
            </Typography>
            <Typography variant="body2" color="text.secondary" >
                Due: 10/10/2021
            </Typography>
            <Typography variant="body2" color="text.secondary" my={1}>
                Assignment 2
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Due: 11/10/2021
            </Typography>
        </Box>
    )
}

export default UpcomingWork;