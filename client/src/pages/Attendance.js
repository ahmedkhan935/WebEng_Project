import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import { Container, Table, Typography, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, TextField, Select, MenuItem, Collapse } from '@mui/material';
import NavBar from '../components/Navbar'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { getStudents, addAttendance, getAllAttendance } from '../services/TeacherService';
import { read, utils } from 'xlsx';


function Attendance() {
    const { classCode } = useParams();
    const [open, setOpen] = useState(false);
    const [students, setStudents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [duration, setDuration] = useState(3);
    const [rows, setRows] = useState([]);
    const fileInput = useRef(null);

    useEffect(() => {
        try {
            getStudents(classCode).then((data) => {
                if (data.data) {
                    console.log(data.data);
                    setStudents(data.data.map(student => ({ ...student, status: 'P' })));
                }
                else {
                    console.log(data.error);
                }
            });

            getAllAttendance(classCode).then((data) => {
                if (data.data) {
                    console.log(data.data);
                    setRows(data.data.map(item => ({
                        ...item,
                        date: new Date(item.date).toISOString().split('T')[0]
                    })));
                }
                else {
                    console.log(data.error);
                }
            });

            // can call get attendance here for the changed date on in a new useEffect

        } catch (err) {
            console.log(err);
        }

    }, [])
        

    const handleClickOpen = () => {
        setOpen(!open);
    };

    const handleStatusChange = (event, index) => {
        const newStudents = [...students];
        newStudents[index].status = event.target.value;
        setStudents(newStudents);
    };

    const handleSaveAttendance = () => {

        addAttendance(classCode, selectedDate, duration, students).then((data) => {
            if (data.data) {
                console.log(data.data.attendanceData);
                alert("Attendance added successfully");
                setRows([...rows, data.data.attendanceData]);
            }
            else {
                console.log(data.error);
            }
        });
    };

    const handleFileUpload = () => {
        fileInput.current.click();
    };

    const handleImportAttendance = (event) => {
        console.log('Starting file upload...');
        const fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        const file = event.target.files[0];
        if (fileTypes.indexOf(file.type) === -1) {
            console.log('Invalid file type');
            alert('Invalid file type. Please select an excel file.');
            return;
        }
        console.log('File type is valid');
        const fileReader = new FileReader();
        fileReader.onload = (fileLoadedEvent) => {
            console.log('File loaded');
            /* Parse data */
            const binaryString = fileLoadedEvent.target.result;
            const workbook = read(binaryString, { type: 'binary' });
            /* Get first worksheet */
            const firstWorksheetName = workbook.SheetNames[0];
            const firstWorksheet = workbook.Sheets[firstWorksheetName];
            /* Check headings */
            const headings = utils.sheet_to_json(firstWorksheet, { header: 1, range: 'A1:C1' })[0];
            if (!headings || headings.length !== 3 || headings[0] !== 'Rno' || headings[1] !== 'Name' || headings[2] !== 'Status') {
                console.log('Invalid headings');
                alert('Invalid headings. Please make sure the headings are "Rno", "Name", and "Status".');
                return;
            }
            console.log('Headings are valid');
            /* Convert array of arrays, ignoring header row */
            const dataFromExcel = utils.sheet_to_json(firstWorksheet, { header: 1, range: 1 });
            /* Update state */
            setStudents(dataFromExcel.map(row => ({ rollNumber: row[0], name: row[1], status: row[2] })));
            console.log('Attendance imported');
            alert('Attendance imported successfully');
        };
        console.log('Reading file...');
        fileReader.readAsBinaryString(file);
    };

    // Placeholder data
    // const rows = [
    //     { date: '2022-01-01', presents: 20, absents: 5 },
    //     { date: '2022-01-02', presents: 22, absents: 3 },
    // ];

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
                        <Button variant="contained" color="primary" onClick={handleSaveAttendance} sx={{ marginTop: '20px' }}>
                            Save Attendance
                        </Button>
                        <input
                            type="file"
                            accept=".xlsx,.xls"
                            onChange={handleImportAttendance}
                            style={{ display: 'none' }}
                            ref={fileInput}
                        />
                        <Button variant="contained" color="primary" onClick={handleFileUpload} sx={{ marginTop: '20px' }}>
                            Import Attendance
                        </Button>
                    </Box>
                </Collapse>
            </Container>
        </NavBar>
    );
}

export default Attendance;