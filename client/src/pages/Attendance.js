import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { Container, Table, Typography, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, TextField, Select, MenuItem, Collapse } from '@mui/material';
import NavBar from '../components/Navbar'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';


function Attendance() {
    const classCode = useParams();
    const [open, setOpen] = useState(false);
    const [students, setStudents] = useState([
        { rollNumber: '1', name: 'John Doe', status: 'P' },
        { rollNumber: '2', name: 'Jane Doe', status: 'P' },
    ]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [duration, setDuration] = useState(3);

    const handleClickOpen = () => {
        setOpen(!open);
    };

    const handleStatusChange = (event, index) => {
        const newStudents = [...students];
        newStudents[index].status = event.target.value;
        setStudents(newStudents);
    };

    // Placeholder data
    const rows = [
        { date: '2022-01-01', presents: 20, absents: 5 },
        { date: '2022-01-02', presents: 22, absents: 3 },
    ];

    return (
        <NavBar>
            <Container>
                <h1>Attendance for this class</h1>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'primary.main' }}>
                                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Date</TableCell>
                                <TableCell align="right" sx={{ color: '#fff', fontWeight: 'bold' }}>Presents</TableCell>
                                <TableCell align="right" sx={{ color: '#fff', fontWeight: 'bold' }}>Absents</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.date} onClick={() => console.log('Redirect to detail page')}>
                                    <TableCell component="th" scope="row">
                                        {row.date}
                                    </TableCell>
                                    <TableCell align="right">{row.presents}</TableCell>
                                    <TableCell align="right">{row.absents}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ marginTop: '20px' }}>
                    {open ? <CloseIcon /> : <AddIcon />}
                    Add Attendance
                </Button>
                <Collapse in={open}>
                    <Box sx={{ border: '1px solid gray', padding: '20px', marginTop: '20px' }}>
                        <Typography variant="h5" sx={{ width: '100%', marginBottom: '0px' }}>
                            Add new attendance
                        </Typography>
                        <Box display="flex" alignItems="baseline" >
                            <TextField
                                id="date"
                                label="Date"
                                type="date"
                                value={selectedDate}
                                onChange={(event) => setSelectedDate(event.target.value)}
                                inputProps={{ max: new Date().toISOString().split('T')[0] }}
                                sx={{ marginBottom: '10px', marginTop: '15px' }}
                            />
                            <TextField
                                id="duration"
                                label="Class Duration (hrs)"
                                type="number"
                                value={duration}
                                inputProps={{ min: 1 }}
                                sx={{ marginBottom: '10px', marginLeft: '10px' }}
                                onChange={(event) => setDuration(event.target.value)}
                                maxWidth='120px'
                            />
                        </Box>
                        <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Roll Number</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {students.map((student, index) => (
                                        <TableRow key={student.rollNumber}>
                                            <TableCell>{student.rollNumber}</TableCell>
                                            <TableCell>{student.name}</TableCell>
                                            <TableCell>
                                                <Select
                                                    value={student.status}
                                                    onChange={(event) => handleStatusChange(event, index)}
                                                >
                                                    <MenuItem value={'P'}>P</MenuItem>
                                                    <MenuItem value={'A'}>A</MenuItem>
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ marginTop: '20px' }}>
                            Save Attendance
                        </Button>
                    </Box>
                </Collapse>
            </Container>
        </NavBar>
    );
}

export default Attendance;