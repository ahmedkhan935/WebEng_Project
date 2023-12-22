import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";
import CustomTable from "../components/CustomTable.js";
import NavBar from "../components/Navbar.js";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const columns = ["studentId", "name", "debarCourse", "Batch", "Degree"];

const DebarList = () => {
  const [selectedBatch, setSelectedBatch] = useState("2021");
  const [selectedDegree, setSelectedDegree] = useState("SE");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2; // Adjust as needed

  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
  };

  const handleDegreeChange = (event) => {
    setSelectedDegree(event.target.value);
  };
  const rows = [
    {
      studentId: "23544",
      name: "Fatima Bilal",
      debarCourse: "Maths",
      Batch: "2020",
      Degree: "SE",
    },
    {
      studentId: "34240",
      name: "Ahmed Raza",
      debarCourse: "Marketing",
      Batch: "2021",
      Degree: "CS",
    },
    {
      studentId: "34323",
      name: "Ahmed Raza",
      debarCourse: "English",
      Batch: "2021",
      Degree: "CS",
    },
    {
      studentId: "32434",
      name: "Ahmed Raza",
      debarCourse: "CPS",
      Batch: "2021",
      Degree: "CS",
    },
  ];

  const batches = ["2020", "2021", "2022"];
  const degrees = ["SE", "CS"];
  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = rows.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <NavBar>
      <h1
        style={{
          fontFamily: "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif",
          color: "#22717d",
        }}
      >
        Debar List
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
          <InputLabel id="degree-label">Degree</InputLabel>
          <Select
            labelId="degree-label"
            id="degree-select"
            value={selectedDegree}
            onChange={handleDegreeChange}
            sx={{ height: "40px" }}
          >
            {degrees.map((degree) => (
              <MenuItem key={degree} value={degree}>
                {degree}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <div style={{ margin: "20px" }}>
        <CustomTable
          columns={columns}
          rows={paginatedRows}
          title="Debar List"
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

export default DebarList;
