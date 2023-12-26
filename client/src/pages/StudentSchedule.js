import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import NavBar from "../components/Navbar";
import { Container, Box, Typography } from "@mui/material";
import { getAllTodos } from "../services/StudentService";
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


function StudentSchedule() {
    const theme = useTheme();
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        getAllTodos().then(data => {
            console.log(data);
            setTodos(data.data);
        });
    }, []);
    const events = todos.map(todo => ({
        title: todo.title,
        date: todo.dueDate,
    }));

    return (
        <NavBar>
            <Container>
                <Typography variant="h5" sx={{ marginTop: '20px', width: '100%', textAlign: 'center' }}>
                    Your Schedule
                </Typography>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    eventContent={({ event }) => {
                        const todo = todos.find(todo => {
                            const eventDate = new Date(event.startStr);
                            const todoDueDate = new Date(todo.dueDate);
                            return todo.title === event.title &&
                                eventDate.getFullYear() === todoDueDate.getFullYear() &&
                                eventDate.getMonth() === todoDueDate.getMonth() &&
                                eventDate.getDate() === todoDueDate.getDate();
                        });

                        // If no matching todo is found, return a default content
                        if (!todo) {
                            return (
                                <Box sx={{ p: 1 }}>
                                    {event.title}
                                </Box>
                            );
                        }

                        return (
                            <Link to={`/student/classes/${todo.classCode}`}>
                                <Box sx={{ p: 1, position: 'absolute' }}>                                    {todo.done && <CheckCircleIcon sx={{ color: '#7cbf6b' }} />}
                                    <br />
                                    <Typography variant="body2" sx={{ color: theme.palette.primary.main, textDecoration: 'none' }}>
                                        {event.title}
                                        <br />
                                        {"Due: " + new Date(todo.dueDate).toLocaleDateString()}
                                    </Typography>

                                </Box>
                            </Link>
                        );
                    }}
                />
            </Container>
        </NavBar>
    );
};

export default StudentSchedule;