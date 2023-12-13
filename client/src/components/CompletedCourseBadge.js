import { Card, CardContent, Typography, Box, Icon } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarIcon from '@mui/icons-material/Star';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useMediaQuery, useTheme } from '@mui/material';

function InfoBox({ icon: Icon, text }) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box bgcolor="secondary.main" p={1} borderRadius={2} display="flex" alignItems="center" mx={1}>
            <Icon />
            <Typography variant="body1" ml={1} align={isSmallScreen ? 'center' : 'inherit'}>
                {text}
            </Typography>
        </Box>
    );
}
function CompletedCourseBadge() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    
    return (
        <Card sx={{ width: '100%', bgcolor: 'primary.main', color: 'white', padding: '20px', marginBottom: '20px' }}>
            <CardContent>
                <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                    <CheckCircleOutlineIcon />
                    <Typography variant="h5" component="div" color="white" align={isSmallScreen ? 'center' : 'inherit'}>
                   You have completed this course
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="center">
                    <InfoBox icon={StarIcon} text="Credit Hours: 3" />
                    <InfoBox icon={BarChartIcon} text="Grade: A+" />
                    <InfoBox icon={AssignmentTurnedInIcon} text="Points: 4" />
                </Box>
            </CardContent>
        </Card>
    );
}

export default CompletedCourseBadge;