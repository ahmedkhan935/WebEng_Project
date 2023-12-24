import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import { Container, Table, TablePagination, Typography, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, TextField, Select, MenuItem, Collapse, useMediaQuery } from '@mui/material';
import NavBar from '../components/Navbar'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { getStudents,  addAttendance, getAttendance, getAllAttendance } from '../services/TeacherService';
import { read, utils } from 'xlsx';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


function Attendance() {
    const { classCode } = useParams();
    const [open, setOpen] = useState(false);
    const [students, setStudents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [duration, setDuration] = useState(1.5);
    const [rows, setRows] = useState([]);
    const fileInput = useRef(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const [buttonLabel, setButtonLabel] = useState('Save Attendance');



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

    const fetchAttendance = async () => {
        const response = await getAttendance(classCode, selectedDate);
        if (response.status === 200) {
            setStudents(response.data.attendance);
            setButtonLabel('Update Attendance');
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, [selectedDate]);


    const handleClickOpen = () => {
        setOpen(!open);
    };

    const handleStatusChange = (event, index) => {
        const newStudents = [...students];
        newStudents[index].status = event.target.value;
        setStudents(newStudents);
    };

    const handleSaveAttendance = () => {
        if(!selectedDate || !duration) {
            alert("Please fill all the fields");
            return;
        }
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
        setOpen(!open);

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

    //Pagination functions
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    return (
        <NavBar>
            <Container>
                <Typography variant="h5" sx={{ width: '100%', marginBottom: '10px' }}>
                    Attendance for this class
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'primary.main' }}>
                                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>S.No</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Date</TableCell>
                                {!isSmallScreen && <TableCell align="left" sx={{ color: '#fff', fontWeight: 'bold' }}>Day</TableCell>}
                                <TableCell sx={{ color: '#fff', fontWeight: 'bold', width: '15%' }}>Duration (Hrs)</TableCell>
                                {!isSmallScreen && <TableCell sx={{ color: '#fff', fontWeight: 'bold', width: '10%' }}>Presents</TableCell>}
                                {!isSmallScreen && <TableCell sx={{ color: '#fff', fontWeight: 'bold', width: '10%' }}>Absents</TableCell>}
                                <TableCell align="left" sx={{ color: '#fff', fontWeight: 'bold', width: '20%' }}>Ratio</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow key={index} onClick={() => console.log('Redirect to detail page')}>
                                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.date}
                                    </TableCell>
                                    {!isSmallScreen && <TableCell align="left">{new Date(row.date).toLocaleDateString('en-US', { weekday: 'long' })}</TableCell>}
                                    <TableCell align="left">{row.duration}</TableCell>
                                    {!isSmallScreen && <TableCell align="left">{row.presents}</TableCell>}
                                    {!isSmallScreen && <TableCell align="left">{row.absents}</TableCell>}
                                    <TableCell align="left">
                                        <Box
                                            sx={{
                                                width: '100%',
                                                height: '10px',
                                                borderRadius: '5px',
                                                background: `linear-gradient(to right, #b83d30 ${row.absents / (row.absents + row.presents) * 100}%, #7cbf6b ${row.absents / (row.absents + row.presents) * 100}%, #7cbf6b 100%)`
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
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
                        <Button variant="contained" color="primary" onClick={handleFileUpload} sx={{ marginTop: '20px', marginBottom: '20px', color: "#fff" }} startIcon={<FileUploadIcon />}> 
                            Import From Excel File
                        </Button>
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
                        <Button variant="contained" color="primary" onClick={handleSaveAttendance} sx={{ marginTop: '20px' }} startIcon={<CheckCircleIcon />}>
                            {buttonLabel}
                        </Button>
                        <input
                            type="file"
                            accept=".xlsx,.xls"
                            onChange={handleImportAttendance}
                            style={{ display: 'none' }}
                            ref={fileInput}
                        />
                       
                    </Box>
                </Collapse>
            </Container>
        </NavBar>
    );
}

export default Attendance;