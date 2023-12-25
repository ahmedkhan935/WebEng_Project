import { useParams } from "react-router";
import NavBar from "../components/Navbar";
import { Typography, Container, Link, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Box, Button, Chip, Grid, Stack, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import { useNavigate } from "react-router-dom";
import {
  addCoursesToSemestersofDegree,
  getDegreeCourses,
  viewAllCourses,
} from "../services/AdminService";

function DegreeCourseSelection() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { degreeId } = useParams();
  const theme = useTheme();

  const [courses, setCourses] = useState([]); //courses for this degree

  const [semesters, setSemesters] = useState([
    { semester: "1", courses: [] },
    { semester: "2", courses: [] },
    { semester: "3", courses: [] },
    { semester: "4", courses: [] },
    { semester: "5", courses: [] },
    { semester: "6", courses: [] },
    { semester: "7", courses: [] },
    { semester: "8", courses: [] },
  ]); //semesters for this degree

  useEffect(async () => {
    var c = await viewAllCourses();
    setCourses(c);

    var coursesForSemesters = await getDegreeCourses({ degreeId });
    setSemesters((prev) =>
      prev.map((semester) => {
        const semesterData = coursesForSemesters.find(
          (item) => item.semester == semester.semester
        );
        return semesterData
          ? { ...semester, courses: semesterData.courses }
          : semester;
      })
    );

    console.log(semesters);
  }, []);

  const handleSave = async () => {
    console.log("degree" + degreeId);
    // Log all semesters and their courses
    const resp = await addCoursesToSemestersofDegree({ degreeId, semesters });
    if (resp.error) {
      alert("save not successfull");
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };
  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) return;

    // Dropped in the same list
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "courses") {
        const items = Array.from(courses);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);

        setCourses(items);
        console.log(`Course ${reorderedItem.courseCode} added to Courses list`);
      } else {
        const semester = semesters.find(
          (semester) => semester.semester === source.droppableId
        );
        const items = Array.from(semester.courses);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);

        setSemesters((prev) =>
          prev.map((semester) =>
            semester.semester === source.droppableId
              ? { ...semester, courses: items }
              : semester
          )
        );
        console.log(
          `Course ${reorderedItem.courseCode} added to Semester ${destination.droppableId}`
        );
      }
    } else {
      // Moving from one list to another
      if (source.droppableId === "courses") {
        const sourceItems = Array.from(courses);
        const [removed] = sourceItems.splice(source.index, 1);
        setCourses(sourceItems);

        const destinationItems = Array.from(
          semesters.find(
            (semester) => semester.semester === destination.droppableId
          ).courses
        );
        destinationItems.splice(destination.index, 0, removed);

        setSemesters((prev) =>
          prev.map((semester) =>
            semester.semester === destination.droppableId
              ? { ...semester, courses: destinationItems }
              : semester
          )
        );
        console.log(
          `Course ${removed.courseCode} moved from Courses list to Semester ${destination.droppableId}`
        );
      } else {
        const sourceSemester = semesters.find(
          (semester) => semester.semester === source.droppableId
        );
        const sourceItems = Array.from(sourceSemester.courses);
        const [removed] = sourceItems.splice(source.index, 1);

        const destinationSemester = semesters.find(
          (semester) => semester.semester === destination.droppableId
        );
        const destinationItems = Array.from(destinationSemester.courses);
        destinationItems.splice(destination.index, 0, removed);

        setSemesters((prev) =>
          prev.map((semester) => {
            if (semester.semester === source.droppableId) {
              return { ...semester, courses: sourceItems };
            } else if (semester.semester === destination.droppableId) {
              return { ...semester, courses: destinationItems };
            } else {
              return semester;
            }
          })
        );
        console.log(
          `Course ${removed.courseCode} moved from Semester ${source.droppableId} to Semester ${destination.droppableId}`
        );
      }
    }

    console.log("SEMESTERS");
    console.log(semesters);
  };

  const handleRemoveFromSemester = (courseCode, semesterName) => {
    console.log(courseCode, semesterName);
    const semester = semesters.find(
      (semester) => semester.semester == semesterName
    );
    const course = semester.courses.find(
      (course) => course.courseCode === courseCode
    );

    setSemesters((prev) =>
      prev.map((semester) =>
        semester.semester === semesterName
          ? {
              ...semester,
              courses: semester.courses.filter(
                (course) => course.courseCode !== courseCode
              ),
            }
          : semester
      )
    );
    // Only add the course to the courses list if it's not already present
    if (!courses.some((c) => c.courseCode === courseCode)) {
      setCourses((prev) => [...prev, course]);
    }
  };

  return (
    <NavBar>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Typography variant="h5">Select courses for this degree</Typography>

          <Button variant="outlined" color="primary" onClick={handleSave}>
            {loading ? (
              <CircularProgress size={24} style={{ marginRight: "10px" }} />
            ) : null}
            Save
          </Button>
        </Box>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ width: "100%", marginBottom: "10px" }}
        >
          Drag and drop your courses into the semesters below.
        </Typography>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="courses">
            {(provided) => (
              <Box {...provided.droppableProps} ref={provided.innerRef}>
                {courses.map(
                  (
                    { courseCode, courseName, courseType, courseCredits },
                    index
                  ) => (
                    <Draggable
                      key={courseCode}
                      draggableId={courseCode}
                      index={index}
                    >
                      {(provided) => (
                        <Chip
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          label={
                            <div>
                              <strong>
                                {courseCode} {courseName}
                              </strong>{" "}
                              | Type: {courseType} | courseCredits:{" "}
                              {courseCredits}
                            </div>
                          }
                          variant="outlined"
                          color="secondary"
                          sx={{
                            margin: "5px",
                            backgroundColor: theme.palette.background.default,
                          }}
                        />
                      )}
                    </Draggable>
                  )
                )}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
          <Grid container spacing={2}>
            {semesters.map(({ semester, courses }, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Typography
                  variant="h6"
                  sx={{ marginBottom: "10px", fontWeight: "bold" }}
                  color="primary"
                >
                  Semester {semester}
                </Typography>

                <Droppable droppableId={semester}>
                  {(provided) => (
                    <Box
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      sx={{
                        minHeight: "100px",
                        border: "none",
                        borderRadius: "5px",
                        padding: "10px",
                        marginBottom: "10px",
                        bgcolor: theme.palette.primary.main,
                      }}
                    >
                      <Stack direction="column" spacing={1}>
                        {courses.map(
                          (
                            { courseCode, courseName, courseType, crdHrs },
                            index
                          ) => (
                            <Draggable
                              key={courseCode}
                              draggableId={courseCode}
                              index={index}
                            >
                              {(provided) => (
                                <Chip
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  label={
                                    <div>
                                      <strong>
                                        {courseCode} {courseName}
                                      </strong>{" "}
                                      | Type: {courseType} | CrdHrs: {crdHrs}
                                    </div>
                                  }
                                  variant="filled"
                                  color="secondary"
                                  sx={{ margin: "5px", color: "#fff" }}
                                  deleteIcon={
                                    <IconButton
                                      onClick={() =>
                                        handleRemoveFromSemester(
                                          courseCode,
                                          semester
                                        )
                                      }
                                    >
                                      <DeleteOutlineTwoToneIcon
                                        sx={{ color: "#FFFFFF" }}
                                      />
                                    </IconButton>
                                  }
                                  onDelete={() =>
                                    handleRemoveFromSemester(
                                      courseCode,
                                      semester
                                    )
                                  }
                                />
                              )}
                            </Draggable>
                          )
                        )}
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
