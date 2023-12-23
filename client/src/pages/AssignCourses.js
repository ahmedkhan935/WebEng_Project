import { useState } from "react";
import theme from "../assets/theme/theme";
import NavBar from "../components/Navbar";
import { CircularProgress, FormControl, InputLabel } from "@mui/material";

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
} from "@mui/material";

const AssignCourses = () => {
  const [loading, setLoading] = useState(false);
  const [selectedTeachers, setSelectedTeachers] = useState({});

  const Teachers = [
    { name: "Fatima", qualification: "PHd Taking tension" },
    { name: "Ahmed", qualification: "PHD not taking tension" },
    { name: "Haadiya", qualification: "PHD fast speaking" },
    { name: "Musa", qualification: "PHD slow speaking" },
  ];
  const Courses = [
    { name: "Operating systems", code: "HGSA73" },
    { name: "Web Engineering", code: "78YSKJD" },
    { name: "English", code: "KDJS767" },
    { name: "Moye moye", code: "JHDSK83" },
  ];

  const handleAssignCourse = (course) => {
    console.log("Course Data:", course);
    console.log("Selected Teacher:", selectedTeachers[course.code]);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleTeacherChange = (courseCode, teacherName) => {
    setSelectedTeachers((prevSelectedTeachers) => ({
      ...prevSelectedTeachers,
      [courseCode]: { name: teacherName },
    }));
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
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.code}</TableCell>
                <TableCell>
                  {/* Drop down for selecting teachers */}
                  <FormControl fullWidth>
                    <InputLabel id={`teacher-label-${course.code}`}>
                      Teacher
                    </InputLabel>
                    <Select
                      value={(selectedTeachers[course.code] || {}).name || ""}
                      onChange={(e) =>
                        handleTeacherChange(course.code, e.target.value)
                      }
                    >
                      {Teachers.map((teacher, index) => (
                        <MenuItem key={index} value={teacher.name}>
                          Name: {teacher.name}
                          <br />
                          Qualification: {teacher.qualification}
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
    </NavBar>
  );
};

export default AssignCourses;
