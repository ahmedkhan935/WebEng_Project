import { useEffect, useState } from "react";
import { getAttendance } from "../services/StudentService";
import { useLocation, useParams } from "react-router";
import NavBar from "../components/Navbar";
import { Alert, Container,Box, Typography, TablePagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TableHeaderCell } from '../assets/theme/StyledComponents';

const ATTENDANCE_THRESHOLD = 80;


function ViewAttendance() {
    const location = useLocation();
    const { classCode } = useParams();
    const [attendanceRecord, setAttendanceRecord] = useState([]);
    const [rows, setRows] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    let totalRecords, presentRecords, absentRecords;
    const COLORS = ['#7cbf6b', '#b83d30'];
    const [piechartData, setPiechartData] = useState([]);
    const [bunkableClasses, setBunkableClasses] = useState(0);

    useEffect(() => {
        getAttendance(classCode).then((data) => {
            setAttendanceRecord(data.data);
            setRows(data.data); // set rows state variable

        });
    }, []);

    useEffect(() => {
        totalRecords = attendanceRecord.length;
        presentRecords = attendanceRecord.filter(record => record.status === "P").length;
        absentRecords = totalRecords - presentRecords;
        setPiechartData([
            { name: 'Present', value: presentRecords },
            { name: 'Absent', value: absentRecords }
        ]);
        setBunkableClasses(Math.floor((totalRecords * ATTENDANCE_THRESHOLD / 100) - presentRecords));
    }, [attendanceRecord]);

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
                <Typography variant="h5" sx={{ marginTop: '20px', width: '100%', textAlign: 'center' }}>
                    Attendance Summary
                </Typography>

                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={piechartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                            {
                                piechartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                            }
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                {bunkableClasses > 0 ? (
                    <Typography variant="body1" sx={{ marginTop: '20px' }}>
                       At the moment, you can bunk this class {bunkableClasses} more times before you get debarred.
                    </Typography>
                ) : (
                    <Alert severity="warning" sx={{ marginTop: '20px' }}>
                        If exams commence, you will be debarred from this class. Bunking is for the weak. And you are very weak.
                    </Alert>
                )}

                <hr></hr>

                <Typography variant="h5" sx={{ marginTop: '20px', marginBottom: '20px' }}>
                    Attendance Records
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell>S. No</TableHeaderCell>
                                <TableHeaderCell>Date</TableHeaderCell>
                                <TableHeaderCell>Weekday</TableHeaderCell>
                                <TableHeaderCell>Duration</TableHeaderCell>
                                <TableHeaderCell>Status</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record, index) => (
                                <TableRow key={index} >
                                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                                    <TableCell>{new Date(record.date).toLocaleDateString(undefined, { weekday: 'long' })}</TableCell>
                                    <TableCell>{record.duration}</TableCell>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            {record.status === "P" ?
                                                <CheckCircleIcon style={{ color: '#7cbf6b', marginRight: '10px' }} /> :
                                                <CancelIcon style={{ color: '#b83d30 ', marginRight: '10px' }} />
                                            }
                                            {record.status}
                                        </Box>
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
            </Container>
        </NavBar>
    )
}

export default ViewAttendance;