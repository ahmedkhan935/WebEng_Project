import React, { useState } from "react";
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

const ViewFeedback = () => {
  const [selectedBatch, setSelectedBatch] = useState("2021");
  const [selectedSemester, setSelectedSemester] = useState("1");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2;

  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
  };

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  const batches = ["2020", "2021", "2022"];
  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
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

  const rows = [
    {
      StudentId: "983291",
      CourseCode: "32df23",
      teacher: "Fatima",
      feedback: "very good",
    },
    {
      StudentId: "324332",
      CourseCode: "dfyt32",
      teacher: "Ahmed",
      feedback: "very bad",
    },
  ];

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = rows.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchKeyword.toLowerCase())
    )
  );

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
          <FormControl sx={{ minWidth: "120px", marginRight: "20px" }}>
            <InputLabel id="batch-label">Batch</InputLabel>
            <Select
              labelId="batch-label"
              id="batch-select"
              value={selectedBatch}
              onChange={handleBatchChange}
              sx={{ height: "40px" }}
            >
              {batches.map((batch) => (
                <MenuItem key={batch} value={batch}>
                  {batch}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: "120px" }}>
            <InputLabel id="semester-label">Semester</InputLabel>
            <Select
              labelId="semester-label"
              id="semester-select"
              value={selectedSemester}
              onChange={handleSemesterChange}
              sx={{ height: "40px" }}
            >
              {semesters.map((semester) => (
                <MenuItem key={semester} value={semester}>
                  {semester}
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
                <TableCell style={{ color: "#FFFFFF" }}>Teacher</TableCell>
                <TableCell style={{ color: "#FFFFFF" }}>Feedback</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.StudentId}</TableCell>
                  <TableCell>{row.CourseCode}</TableCell>
                  <TableCell>{row.teacher}</TableCell>
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
