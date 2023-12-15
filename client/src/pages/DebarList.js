import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";

import CustomTable from "../components/CustomTable.js";
import NavBar from "../components/Navbar.js";

const columns = ["studentId", "name", "debarCourse", "Batch", "Department"];

const DebarList = () => {
  const [selectedBatch, setSelectedBatch] = useState("2021");
  const [selectedSemester, setSelectedSemester] = useState("Spring");

  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
  };

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  const rows = [
    {
      studentId: "23544",
      name: "Fatima Bilal",
      debarCourse: "Maths",
      Batch: "2020",
      Department: "SE",
    },
    {
      studentId: "34240",
      name: "Ahmed Raza",
      debarCourse: "Marketing",
      Batch: "2021",
      Department: "CS",
    },
    {
      studentId: "34323",
      name: "Ahmed Raza",
      debarCourse: "English",
      Batch: "2021",
      Department: "CS",
    },
    {
      studentId: "32434",
      name: "Ahmed Raza",
      debarCourse: "CPS",
      Batch: "2021",
      Department: "CS",
    },
  ];

  const batches = ["2020", "2021", "2022"];
  const semesters = ["Spring", "Fall", "Summer"];

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
        <CustomTable columns={columns} rows={rows} title="Debar List" />
      </div>
    </NavBar>
  );
};

export default DebarList;
