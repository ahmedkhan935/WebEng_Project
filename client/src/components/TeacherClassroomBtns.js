import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import VideoCallIcon from '@mui/icons-material/VideoCall';

import { Link } from 'react-router-dom';

function TeacherClassroomBtns({classCode}) {
    return (
        <Box sx={{ border: '1px solid gray', width: '100%', borderRadius: '5px', mt: '10px', pb: '20px', pl: '20px', pr: '20px' }}>
            <Typography variant="h6" color="text.secondary" bgcolor="white" display="inline-block" sx={{ mt: '-40px' }}>
                Classroom Options
            </Typography>
            <Button component={Link} to={`/teacher/classes/${classCode}/attendance`} variant="contained" color="primary" startIcon={<ChecklistIcon color="secondary" sx={{ fontSize: 60 }} />} fullWidth sx={{ mt: '10px' }}>
                Attendance
            </Button>
            <Button component={Link} to={`/teacher/classes/${classCode}/evaluations`} variant="contained" color="primary" startIcon={<AssignmentTurnedInIcon color="secondary" sx={{ fontSize: 60 }} />} fullWidth sx={{ mt: '10px' }}>
                Evaluations
            </Button>
            <Button component={Link} to={`/teacher/classes/${classCode}/videoCall`} variant="contained" color="primary" startIcon={<VideoCallIcon color="secondary" sx={{ fontSize: 60 }} />} fullWidth sx={{ mt: '10px' }}>
                Video Call
            </Button>
            
        </Box>
    )
}

export default TeacherClassroomBtns;