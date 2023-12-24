import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  TextField,
  InputAdornment,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { InputLabel, MenuItem, Select, Box } from "@mui/material";

import NavBar from "../components/Navbar";

import { useParams } from "react-router";
import { getCourseName, getFeedback } from "../services/AdminService";

const ViewFeedback = () => {
  const [selectedBatch, setSelectedBatch] = useState("2021");
  const [selectedSemester, setSelectedSemester] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2;
  const [rows, setRows] = useState([]);

  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
  };

  const handleSemesterChange = (event) => {
    getFeedback(event.target.value).then((res) => {
      res.json().then((data) => {
        console.log(data);
        setRows(data);
      });
    });

    setSelectedSemester(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const [searchKeyword, setSearchKeyword] = useState("");

  const styles = {
    h2: {
      color: "#22717d",
      float: "left",
    },
  };

  // const rows = [
  //   {
  //     StudentId: "983291",
  //     CourseCode: "32df23",
  //     teacher: "Fatima",
  //     feedback: "very good",
  //   },
  //   {
  //     StudentId: "324332",
  //     CourseCode: "dfyt32",
  //     teacher: "Ahmed",
  //     feedback: "very bad",
  //   },
  // ];
  const [course, setCourses] = useState([]); // [
  const { classCode } = useParams();
  const getCourses = async () => {
    const response = await getCourseName();
    const data = await response.json();

    setCourses(data);
    setSelectedSemester(data[0].code);
  };

  useEffect(() => {
    getCourses();
  }, []);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchKeyword.toLowerCase())
    )
  );
  const paginatedRows = filteredRows.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  return (
    <div>
      <NavBar>
        <h1 style={styles.h2}>Courses Feebacks</h1>
        <br />
        <br />
        <br />

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <FormControl sx={{ minWidth: "120px" }}>
            <InputLabel id="semester-label">Course</InputLabel>
            <Select
              labelId="semester-label"
              id="semester-select"
              value={selectedSemester}
              onChange={handleSemesterChange}
              sx={{ height: "40px" }}
            >
              {course.map((semester) => (
                <MenuItem key={semester.code} value={semester.code}>
                  {semester.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <FormControl variant="outlined" style={{ marginRight: "10px" }}>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              onChange={(e) => setSearchKeyword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">&#128269;</InputAdornment>
                ),
              }}
              style={{ marginBottom: "10px" }}
            />
          </FormControl>
        </div>

        <TableContainer
          component={Paper}
          style={{ width: "95%", marginRight: "10px" }}
        >
          <Table>
            <TableHead>
              <TableRow style={{ background: "#22717d" }}>
                <TableCell style={{ color: "#FFFFFF" }}>Student Id</TableCell>
                <TableCell style={{ color: "#FFFFFF" }}>Course Code</TableCell>

                <TableCell style={{ color: "#FFFFFF" }}>Feedback</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.studentId.name}</TableCell>
                  <TableCell>{selectedSemester}</TableCell>

                  <TableCell>{row.feedback}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
          />
        </div>
      </NavBar>
    </div>
  );
};

export default ViewFeedback;
