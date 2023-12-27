import { useEffect } from "react";
import { getProfile as getStudentProfile } from "../services/StudentService";
import { getProfile as getTeacherProfile } from "../services/TeacherService";
import useStore from "../store/store";
import { useState } from "react";
import { Typography, CircularProgress, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, AlertTitle } from "@mui/material";
import { TableHeaderCell } from "../assets/theme/StyledComponents";
import NavBar from '../components/Navbar';
import { TablePagination, IconButton, Collapse, Box } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link } from 'react-router-dom';
import { Avatar, Alert, Card, CardContent, CardHeader } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';


function Profile() {
    const { userRole } = useStore();
    const [profile, setProfile] = useState({});
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (userRole == "student") {
            getStudentProfile().then((data) => {
                console.log(data);
                setProfile(data.data);
            })
                .catch((err) => {
                    console.log(err);
                }
                );
        } else if (userRole == "teacher") {
            getTeacherProfile().then((data) => {
                console.log(data);
                setProfile(data.data);
            })
                .catch((err) => {
                    console.log(err);
                }
                );
        }
        setLoading(false);
    }, []);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <NavBar>
            <Container sx={{ padding: '20px' }}>
                <Typography variant="h5" sx={{ width: '100%', marginBottom: '10px' }}>
                    Your profile
                </Typography>

                {
                    loading ?
                        <Box sx={{ width: '100%', height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CircularProgress />
                        </Box>
                        :
                        profile.classes &&
                        <Card sx={{ padding: '20px' }}>
                            <Alert severity="info" sx={{ marginBottom: '10px' }}>
                                <AlertTitle>You can only view your profile.</AlertTitle>
                                <Typography>
                                    Your profile is admin-assigned and cannot be edited by you. Contact your admin if you think there is a mistake in your details.
                                </Typography>
                            </Alert>
                            <CardHeader
                                avatar={
                                    <Avatar>
                                        <PersonIcon />
                                    </Avatar>
                                }
                                title={profile.name}
                                titleTypographyProps={{ variant: 'h4' }}
                            />
                            <CardContent>

                                <Typography variant="body1" sx={{ marginBottom: '10px' }}><b>Email:</b> {profile.email}</Typography>
                                <Typography variant="body1" sx={{ marginBottom: '10px' }}><b>CNIC:</b> {profile.CNIC}</Typography>
                                <Typography variant="body1" sx={{ marginBottom: '10px' }}><b>Contact Number:</b> {profile.contactNumber}</Typography>
                                <Typography variant="body1" sx={{ marginBottom: '10px' }}><b>Address:</b> {profile.address}</Typography>
                                <IconButton
                                    aria-label="expand row"
                                    sx={{ borderRadius: "2px", paddingLeft: '0px' }}
                                    onClick={() => setOpen(!open)}

                                >
                                    {open ? <KeyboardArrowUpIcon sx={{ marginLeft: '0px' }} /> : <KeyboardArrowDownIcon sx={{ marginLeft: '0px' }} />}

                                    <Typography variant="body1"> {userRole == "student" ? "View all classes attended" : "View all classes taught"} </Typography>
                                </IconButton>


                            </CardContent>

                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box margin={1}>
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableHeaderCell>Class Code</TableHeaderCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {profile.classes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((classroom) => (
                                                    <TableRow key={classroom._id}>
                                                        <TableCell component="th" scope="row">
                                                            <Link to={`/teacher/classes/${classroom.classCode}`}>{classroom.classCode}</Link>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25]}
                                            component="div"
                                            count={profile.classes.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </TableContainer>
                                </Box>
                            </Collapse>



                        </Card>
                }
            </Container>
        </NavBar >
    );
}


export default Profile;