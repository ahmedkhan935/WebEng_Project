import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,Box, TextField, Select, MenuItem, Collapse } from '@mui/material';
import NavBar from '../components/Navbar'

function Attendance() {
    const classCode = useParams();
    const [open, setOpen] = useState(false);
    const [students, setStudents] = useState([
        { rollNumber: '1', name: 'John Doe', status: 'P' },
        { rollNumber: '2', name: 'Jane Doe', status: 'P' },
    ]);
    const [selectedDate, setSelectedDate] = useState(new Date());



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
                    Add Attendance
                </Button>

                <Collapse in={open}>
                    <Box sx={{ border: '1px solid gray', padding: '20px', marginTop: '20px' }}>
                        {/* <DatePicker
                            label="Attendance Date"
                            value={selectedDate}
                            onChange={(newValue) => {
                                setSelectedDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        /> */}
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