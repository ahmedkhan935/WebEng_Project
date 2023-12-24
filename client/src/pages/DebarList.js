import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";
import CustomTable from "../components/CustomTable.js";
import NavBar from "../components/Navbar.js";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { viewDebarList, viewDegrees } from "../services/AdminService.js";

const columns = [
  "studentId",
  "name",
  "courseName",
  "attendance",
  "batch",
  "degree",
];

const DebarList = () => {
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2; // Adjust as needed
  const [degrees, setDegrees] = useState([]);
  const [rows, setrows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);

  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
  };

  const handleDegreeChange = (event) => {
    setSelectedDegree(event.target.value);
  };

  useEffect(() => {
    viewDebarList().then((res) => {
      res.json().then((data) => {
        setrows(data);
        const filtered = data.filter(
          (row) =>
            selectedBatch === "" ||
            row.batch === selectedBatch ||
            selectedDegree === "" ||
            row.degree === selectedDegree
        );
        console.log(filtered);
        setFilteredRows(filtered);
      });
    });

    viewDegrees().then((res) => {
      res.json().then((data) => {
        setDegrees(data);
      });
    });
  }, [selectedBatch, selectedDegree]);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = filteredRows.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

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
            <MenuItem value="">All</MenuItem>
            <MenuItem value="2019">2019</MenuItem>
            <MenuItem value="2020">2020</MenuItem>
            <MenuItem value="2021">2021</MenuItem>
            <MenuItem value="2022">2022</MenuItem>
            <MenuItem value="2023">2023</MenuItem>
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
            <MenuItem value="">All</MenuItem>
            {degrees.map((degree) => (
              <MenuItem key={degree.name} value={degree.name}>
                {degree.name}
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
