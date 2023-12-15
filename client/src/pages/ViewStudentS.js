import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
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

import Pagination from "@mui/material/Pagination";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NavBar from "../components/Navbar";
import { viewAllStudents,deleteStudent } from "../services/AdminService";

const ViewStudents = () => {
  
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterBatch, setFilterBatch] = useState("");
  const [filterDegree, setFilterDegree] = useState("");
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    viewAllStudents().then((res) => {
      const rows = res.map((row) => ({
        studentId: row.rollNumber,
        name: row.name,
        batch: row.batch,
        degree: row.degreeName,
        _id: row._id,
      }));
      setRows(rows);
    });
  }, []);

  const handleDelete = (studentId) => {
    console.log(`Deleting student with ID: ${studentId}`);
    deleteStudent(studentId).then((res) => {
      console.log(res);
      if (res.status === 200) {
        alert("Student deleted successfully");
        window.location.reload();
      } else {
        alert("Student could not be deleted");
      }
    });
  };
  const handleUpdate = (studentId) => {
    console.log(`Updating student with ID: ${studentId}`);
    navigate(`/admin/updateStudent/${studentId}`);
    // Add your navigation logic here
  };

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

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = filteredRows.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <NavBar>
        <h1 style={{ color: "#22717d", float: "left" }}>Students</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
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
              {/* Add your degree options here */}
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
          style={{ width: "95%", marginRight: "10px" }}
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
              {paginatedRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.studentId}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.batch}</TableCell>
                  <TableCell>{row.degree}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleUpdate(row._id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
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

export default ViewStudents;
