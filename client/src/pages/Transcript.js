import { TableHeaderCell } from '../assets/theme/StyledComponents';
import NavBar from '../components/Navbar';
import { useTheme } from "@mui/material/styles";
import { Typography, Container, Table, TableBody, TableContainer, CircularProgress,
        TableCell, Box, TableHead, TableRow, Paper, Grid } from '@mui/material';
import ParkIcon from '@mui/icons-material/Park';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import { useState , useEffect } from 'react';

function Transcript() {
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [transcriptData, setTranscriptData] = useState([]);

    useEffect(() => {
        setLoading(true);
        setTranscriptData([
            {
                semesterName: 'Fall 2020', semesterGPA: 3.8, semesterCredits: 15, semesterCreditsEarned: 15,
                courses: [
                    { courseCode: 'CSE 201', courseName: 'Data Structures', grade: 'A', credits: 3, creditsEarned: 3 },
                    { courseCode: 'CSE 202', courseName: 'Discrete Mathematics', grade: 'A', credits: 3, creditsEarned: 3 },
                    { courseCode: 'CSE 203', courseName: 'Digital Logic Design', grade: 'A', credits: 3, creditsEarned: 3 },
                ]
            },
            {
                semesterName: 'Spring 2020', semesterGPA: 3.8, semesterCredits: 15, semesterCreditsEarned: 15,
                courses: [
                    { courseCode: 'CSE 201', courseName: 'Data Structures', grade: 'A', credits: 3, creditsEarned: 3 },
                    { courseCode: 'CSE 202', courseName: 'Discrete Mathematics', grade: 'A', credits: 3, creditsEarned: 3 },
                    { courseCode: 'CSE 203', courseName: 'Digital Logic Design', grade: 'A', credits: 3, creditsEarned: 3 },
                ]
            },
        ]);
        setLoading(false);
    }, [])


    return (
        <NavBar>
            <Container sx={{ padding: '20px' }}>
                <Typography variant="h5" sx={{ width: '100%', marginBottom: '10px' }}>
                    Transcript
                </Typography>
                {
                    loading ?
                        <Box sx={{ width: '100%', height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CircularProgress />
                        </Box>
                        :
                        transcriptData && transcriptData.length == 0 ?
                            <Typography variant="body1" sx={{ width: '100%', marginBottom: '10px' }}>
                                Transcript Data not available. Please contact your admin if you think this is an error.
                            </Typography>
                            :
                            <Grid container spacing={2}>
                                {transcriptData.length === 0 ? (
                                    <Typography variant="h6">No data found.</Typography>
                                ) : (
                                    transcriptData.map((semester, index) => (
                                        <Grid item xs={12} sm={6} key={index}>
                                            <Paper>
                                                <Box p={2}>
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                        {semester.semesterName.toLowerCase().includes('fall') && <ParkIcon sx={{ color: theme.palette.secondary.main, marginRight: '5px' }} />}
                                                        {semester.semesterName.toLowerCase().includes('spring') && <LocalFloristIcon sx={{ color: theme.palette.secondary.main, marginRight: '5px' }} />}
                                                        {semester.semesterName}
                                                    </Typography>
                                                    <TableContainer>
                                                        <Table>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableHeaderCell>Course Code</TableHeaderCell>
                                                                    <TableHeaderCell>Course Name</TableHeaderCell>
                                                                    <TableHeaderCell>Grade</TableHeaderCell>
                                                                    <TableHeaderCell>Credits</TableHeaderCell>
                                                                    <TableHeaderCell>Credits Earned</TableHeaderCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {semester.courses.map((course, index) => (
                                                                    <TableRow key={index}>
                                                                        <TableCell>{course.courseCode}</TableCell>
                                                                        <TableCell>{course.courseName}</TableCell>
                                                                        <TableCell>{course.grade}</TableCell>
                                                                        <TableCell>{course.credits}</TableCell>
                                                                        <TableCell>{course.creditsEarned}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                    <br></br>
                                                    <Typography variant="subtitle1"  >Credits: {semester.semesterCredits}</Typography>
                                                    <Typography variant="subtitle1">Credits Earned: {semester.semesterCreditsEarned}</Typography>
                                                    <Typography variant="subtitle1" >Semester GPA: {semester.semesterGPA}</Typography>
                                                </Box>
                                            </Paper>
                                        </Grid>
                                    ))
                                )}
                            </Grid>
                }
            </Container>
        </NavBar>
    );
}

export default Transcript;