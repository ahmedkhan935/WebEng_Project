import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NavBar from "../components/Navbar";

const ViewStudents = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterBatch, setFilterBatch] = useState("");
  const [filterDegree, setFilterDegree] = useState("");

  const handleDelete = (studentId) => {
    console.log(`Deleting student with ID: ${studentId}`);
  };

  const handleUpdate = (studentId) => {
    console.log(`Updating student with ID: ${studentId}`);
  };

  const rows = [
    {
      studentId: "34234",
      name: "Fatima Bilal",
      batch: "2020",
      degree: "CS",
    },
    {
      studentId: "8799",
      name: "Ahmed Raza",
      batch: "2021",
      degree: "SE",
    },
  ];

  const filteredRows = rows
    .filter(
      (row) =>
        (filterBatch === "" || row.batch === filterBatch) &&
        (filterDegree === "" || row.degree === filterDegree)
    )
    .filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchKeyword.toLowerCase())
      )
    );

  return (
    <div>
      <NavBar></NavBar>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <FormControl variant="outlined" style={{ marginRight: "10px" }}>
          <InputLabel>Batch</InputLabel>
          <Select
            value={filterBatch}
            onChange={(e) => setFilterBatch(e.target.value)}
            label="Batch"
            style={{ zIndex: 2000, width: "200px", height: "40px" }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="2020">2020</MenuItem>
            <MenuItem value="2021">2021</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined">
          <InputLabel>Degree</InputLabel>
          <Select
            value={filterDegree}
            onChange={(e) => setFilterDegree(e.target.value)}
            label="Degree"
            style={{ zIndex: 2000, width: "200px", height: "40px" }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="SE">SE</MenuItem>
            <MenuItem value="CS">CS</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          style={{ marginLeft: "10px", marginRight: "10px" }}
        >
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
        style={{ width: "95%", float: "right", marginRight: "10px" }}
      >
        <Table>
          <TableHead>
            <TableRow style={{ background: "#22717d" }}>
              <TableCell style={{ color: "#FFFFFF" }}>Student ID</TableCell>
              <TableCell style={{ color: "#FFFFFF" }}>Name</TableCell>
              <TableCell style={{ color: "#FFFFFF" }}>Batch</TableCell>
              <TableCell style={{ color: "#FFFFFF" }}>Degree</TableCell>
              <TableCell style={{ color: "#FFFFFF" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.studentId}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.batch}</TableCell>
                <TableCell>{row.degree}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleUpdate(row.studentId)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(row.studentId)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewStudents;
