import { useParams } from "react-router";
import NavBar from "../components/Navbar";
import { Typography, Container } from "@mui/material";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box,Button, Chip, Grid, Stack, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';



function DegreeCourseSelection() {
    const { degreeid } = useParams;
    const theme = useTheme();


    const [courses, setCourses] = useState([
        //DUMMY DATA - USE USEEFFECT TO FETCH ACTUAL COURSES
        { courseCode: 'CSC 101', courseName: 'Calculus', courseType: 'Core', crdHrs: 3 },
        { courseCode: 'CSC 102', courseName: 'Introduction to Programming', courseType: 'Core', crdHrs: 3 },
        { courseCode: 'CSC 103', courseName: 'Data Structures and Algorithms', courseType: 'Core', crdHrs: 3 },
        { courseCode: 'CSC 104', courseName: 'Object Oriented Programming', courseType: 'Core', crdHrs: 3 },
        { courseCode: 'CSC 105', courseName: 'Operating Systems', courseType: 'Core', crdHrs: 3 },
    ]); //courses for this degree

    const [semesters, setSemesters] = useState([
        { semesterName: 'Semester 1', courses: [] },
        { semesterName: 'Semester 2', courses: [] },
        { semesterName: 'Semester 3', courses: [] },
        { semesterName: 'Semester 4', courses: [] },
        { semesterName: 'Semester 5', courses: [] },
        { semesterName: 'Semester 6', courses: [] },
        { semesterName: 'Semester 7', courses: [] },
        { semesterName: 'Semester 8', courses: [] },
    ]); //semesters for this degree

    const handleOnDragEnd = (result) => {
        const { source, destination } = result;

        // Dropped outside the list
        if (!destination) return;

        // Dropped in the same list
        if (source.droppableId === destination.droppableId) {
            if (source.droppableId === 'courses') {
                const items = Array.from(courses);
                const [reorderedItem] = items.splice(source.index, 1);
                items.splice(destination.index, 0, reorderedItem);

                setCourses(items);
            } else {
                const semester = semesters.find(semester => semester.semesterName === source.droppableId);
                const items = Array.from(semester.courses);
                const [reorderedItem] = items.splice(source.index, 1);
                items.splice(destination.index, 0, reorderedItem);

                setSemesters(prev => prev.map(semester => semester.semesterName === source.droppableId ? { ...semester, courses: items } : semester));
            }
        } else {
            // Moving from one list to another
            if (source.droppableId === 'courses') {
                const sourceItems = Array.from(courses);
                const [removed] = sourceItems.splice(source.index, 1);
                setCourses(sourceItems);

                const destinationItems = Array.from(semesters.find(semester => semester.semesterName === destination.droppableId).courses);
                destinationItems.splice(destination.index, 0, removed);

                setSemesters(prev => prev.map(semester => semester.semesterName === destination.droppableId ? { ...semester, courses: destinationItems } : semester));
            } else {
                const sourceSemester = semesters.find(semester => semester.semesterName === source.droppableId);
                const sourceItems = Array.from(sourceSemester.courses);
                const [removed] = sourceItems.splice(source.index, 1);

                const destinationSemester = semesters.find(semester => semester.semesterName === destination.droppableId);
                const destinationItems = Array.from(destinationSemester.courses);
                destinationItems.splice(destination.index, 0, removed);

                setSemesters(prev => prev.map(semester => {
                    if (semester.semesterName === source.droppableId) {
                        return { ...semester, courses: sourceItems };
                    } else if (semester.semesterName === destination.droppableId) {
                        return { ...semester, courses: destinationItems };
                    } else {
                        return semester;
                    }
                }));
            }
        }

        console.log("SEMESTERS")
        console.log(semesters)
    }

    const handleRemoveFromSemester = (courseCode, semesterName) => {
        const semester = semesters.find(semester => semester.semesterName === semesterName);
        const course = semester.courses.find(course => course.courseCode === courseCode);

        setSemesters(prev => prev.map(semester => semester.semesterName === semesterName ? { ...semester, courses: semester.courses.filter(course => course.courseCode !== courseCode) } : semester));
        setCourses(prev => [...prev, course]);
    }

    const handleAddNewCourse = () => {
        //either navigate to addnew course page OR open a dialog box
    }


    return (
        <NavBar>
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <Typography variant="h5">
                        Select courses for this degree
                    </Typography>
                    <Button variant="outlined" color="primary" onClick={handleAddNewCourse}>
                        ADD NEW COURSE
                    </Button>
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ width: '100%', marginBottom: '10px' }}>
                    Drag and drop your courses into the semesters below.
                </Typography>

                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="courses">
                        {(provided) => (
                            <Box {...provided.droppableProps} ref={provided.innerRef}>
                                {courses.map(({ courseCode, courseName, courseType, crdHrs }, index) => (
                                    <Draggable key={courseCode} draggableId={courseCode} index={index}>
                                        {(provided) => (
                                            <Chip
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                label={
                                                    <div>
                                                        <strong>{courseCode} {courseName}</strong>   |   Type: {courseType}   |   CrdHrs: {crdHrs}
                                                    </div>
                                                }
                                                variant="outlined"
                                                color="secondary"
                                                sx={{ margin: '5px', backgroundColor: theme.palette.background.default }}
                                            />
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </Box>
                        )}
                    </Droppable>
                    <Grid container spacing={2} >
                        {semesters.map(({ semesterName, courses }, index) => (
                            <Grid item xs={12} sm={6} key={index} >
                                <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 'bold' }} color="primary">
                                    {semesterName}
                                </Typography>

                                <Droppable droppableId={semesterName}>
                                    {(provided) => (
                                        <Box
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            sx={{ minHeight: '100px', border: 'none', borderRadius: '5px', padding: '10px', marginBottom: '10px', bgcolor: theme.palette.primary.main }}
                                        >
                                            <Stack direction="column" spacing={1}>
                                                {courses.map(({ courseCode, courseName, courseType, crdHrs }, index) => (
                                                    <Draggable key={courseCode} draggableId={courseCode} index={index}>
                                                        {(provided) => (
                                                            <Chip
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                label={
                                                                    <div>
                                                                        <strong>{courseCode} {courseName}</strong>   |   Type: {courseType}   |   CrdHrs: {crdHrs}
                                                                    </div>
                                                                }
                                                                variant="filled"
                                                                color="secondary"
                                                                sx={{ margin: '5px', color: '#fff' }}
                                                                deleteIcon={
                                                                    <IconButton onClick={() => handleRemoveFromSemester(courseCode, semesterName)}>
                                                                        <CloseIcon sx={{ color: "#a60000" }} />
                                                                    </IconButton>
                                                                }
                                                                onDelete={() => handleRemoveFromSemester(courseCode, semesterName)}
                                                            />
                                                        )}
                                                    </Draggable>
                                                ))}
                                            </Stack>
                                            {provided.placeholder}
                                        </Box>
                                    )}
                                </Droppable>
                            </Grid>
                        ))}
                    </Grid>
                </DragDropContext>
            </Container>
        </NavBar>
    );
}

export default DegreeCourseSelection;