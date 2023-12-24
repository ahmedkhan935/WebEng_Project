import { useEffect, useState } from "react";
import theme from "../assets/theme/theme";
import NavBar from "../components/Navbar";
import { CircularProgress, FormControl, InputLabel } from "@mui/material";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import {
  assignCourse,
  viewAllCourses,
  viewAllTeachers,
} from "../services/AdminService";

const AssignCourses = () => {
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [submitmsg, setsubmitmsg] = useState("");
  const [status, setstatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedTeachers, setSelectedTeachers] = useState({});
  const [Teachers, setTeachers] = useState([]);
  const [Courses, setCourses] = useState([]);
  useEffect(async () => {
    const c = await viewAllCourses();
    setCourses(c);
    const t = await viewAllTeachers();
    setTeachers(t);
    console.log(t);
  }, []);

  const handleAssignCourse = async (course) => {
    const teacherId = selectedTeachers[course.courseCode]._id;
    const courseId = course._id;
    const resp = await assignCourse({
      teacherId,
      courseId,
    });

    if (resp.error) {
      setstatus(false);
      setsubmitmsg(resp.error);
    } else {
      setstatus(true);
      setsubmitmsg(resp.message);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const handleTeacherChange = (courseCode, selectedTeacher) => {
    setSelectedTeachers((prevSelectedTeachers) => ({
      ...prevSelectedTeachers,
      [courseCode]: selectedTeacher,
    }));
  };

  const handleModalClose = () => {
    setFormSubmitted(false);
  };

  return (
    <NavBar>
      <h1 style={{ color: "#22717d", float: "left" }}>Assign Courses</h1>

      <TableContainer
        component={Paper}
        style={{ width: "95%", marginRight: "10px" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
              <TableCell style={{ color: "#FFFFFF" }}>Course Name</TableCell>
              <TableCell style={{ color: "#FFFFFF" }}> Course code</TableCell>
              <TableCell style={{ color: "#FFFFFF" }}>Select Teacher</TableCell>
              <TableCell style={{ color: "#FFFFFF" }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Courses.map((course, index) => (
              <TableRow key={index}>
                <TableCell>{course.courseName}</TableCell>
                <TableCell>{course.courseCode}</TableCell>
                <TableCell>
                  {/* Drop down for selecting teachers */}
                  <FormControl fullWidth>
                    <InputLabel id={`teacher-label-${course.courseCode}`}>
                      Teacher
                    </InputLabel>
                    <Select
                      value={
                        (selectedTeachers[course.courseCode] || {}).name || ""
                      }
                      onChange={(e) =>
                        handleTeacherChange(
                          course.courseCode,
                          Teachers.find(
                            (teacher) => teacher.name === e.target.value
                          )
                        )
                      }
                    >
                      {Teachers.map((teacher, index) => (
                        <MenuItem key={index} value={teacher.name}>
                          Name: {teacher.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleAssignCourse(course)}
                  >
                    {loading ? (
                      <CircularProgress
                        size={24}
                        style={{ marginRight: "10px" }}
                      />
                    ) : null}
                    Save
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isFormSubmitted && (
        <Modal
          open={isFormSubmitted}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              borderRadius: "10px",
              bgcolor: "background.paper",
              boxShadow: "2px 2px 2px 1px #ffffff",
              p: 4,
              textAlign: "center",
            }}
          >
            {status ? (
              <TagFacesIcon style={{ fontSize: "100px", color: "#de8a57" }} />
            ) : (
              <SentimentVeryDissatisfiedIcon
                style={{ fontSize: "100px", color: "#de8a57" }}
              />
            )}
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {isFormSubmitted && <>{submitmsg}</>}
            </Typography>
            <Button onClick={handleModalClose} style={{ marginTop: "10px" }}>
              Close
            </Button>
          </Box>
        </Modal>
      )}
    </NavBar>
  );
};

export default AssignCourses;
