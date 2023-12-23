import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import VideoCallIcon from '@mui/icons-material/VideoCall';

import { Link } from 'react-router-dom';

function StudentClassroomBtns({classCode}) {
    return (
        <Box sx={{ border: '1px solid gray', width: '100%', borderRadius: '5px', mt: '10px', pb: '20px', pl: '20px', pr: '20px' }}>
            <Typography variant="h6" color="text.secondary" display="inline-block" sx={{ marginTop: '10px' }}>
               Classroom Actions
            </Typography>
            <Button component={Link} to={`/student/classes/${classCode}/attendance`} variant="contained" color="primary" startIcon={<ChecklistIcon color="secondary" style={{fontSize: 25 }} />} fullWidth sx={{ mt: '10px' }}>
                View Attendance
            </Button>
            <Button component={Link} to={`/student/classes/${classCode}/evaluations`} variant="contained" color="primary" startIcon={<AssignmentTurnedInIcon color="secondary" style={{ fontSize: 25 }} />} fullWidth sx={{ mt: '10px' }}>
                View Evaluations
            </Button>
            <Button component={Link} to={`/student/classes/${classCode}/videoCall`} variant="contained" color="primary" startIcon={<VideoCallIcon color="secondary" style={{ fontSize: 25 }} />} fullWidth sx={{ mt: '10px' }}>
                Join Video Call
            </Button>
            
            
        </Box>
    )
}

export default StudentClassroomBtns;