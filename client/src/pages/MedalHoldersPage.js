import React, { useState } from "react";
import CustomTable from "../components/CustomTable.js";
import NavBar from "../components/Navbar.js";
import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

//the column names must be in camel case notation
const columns = ["studentId", "name", "medalType", "Batch", "Degree"];

const MedalHoldersPage = () => {
  const [selectedBatch, setSelectedBatch] = useState("2021"); // Initial selected batch
  const [selectedSemester, setSelectedSemester] = useState("Spring"); // Initial selected semester
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2;

  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
  };

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  const batches = ["2020", "2021", "2022"];
  const semesters = ["Spring", "Fall", "Summer"];

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const rows = [
    {
      studentId: "34234",
      name: "Fatima Bilal",
      medalType: "Gold Medal",
      Batch: "2020",
      Degree: "SE",
    },
    {
      studentId: "34240",
      name: "Ahmed Raza",
      medalType: "Golden Medal",
      Batch: "2021",
      Degree: "CS",
    },
    {
      studentId: "34240",
      name: "Ahmed Raza",
      medalType: "Golden Medal",
      Batch: "2021",
      Degree: "CS",
    },
    {
      studentId: "34240",
      name: "Ahmed Raza",
      medalType: "Golden Medal",
      Batch: "2021",
      Degree: "CS",
    },
  ];

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = rows.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  return (
    <NavBar>
      <h1
        style={{
          fontFamily: "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif",
          color: "#22717d",
        }}
      >
        Medal Holders
      </h1>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginLeft: "40px",
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
      <div style={{ margin: "20px" }}>
        <CustomTable
          columns={columns}
          rows={paginatedRows}
          title="Medal Holders"
        />
        <Stack spacing={2} sx={{ marginTop: "20px" }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
          />
        </Stack>
      </div>
    </NavBar>
  );
};

export default MedalHoldersPage;
