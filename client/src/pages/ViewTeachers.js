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
  FormControl,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NavBar from "../components/Navbar";
import Pagination from "@mui/material/Pagination";

const ViewTeachers = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Set the number of rows per page
  // Add your filter states here if needed

  const handleDelete = (teacherId) => {
    console.log(`Deleting teacher with ID: ${teacherId}`);
  };

  const handleUpdate = (teacherId) => {
    console.log(`Updating teacher with ID: ${teacherId}`);
  };

  const styles = {
    h2: {
      color: "#22717d",
      float: "left",
    },
  };

  const rows = [
    {
      teacherId: "123",
      name: "Ahmed",
      email: "abc@gmail.com",
    },
    {
      teacherId: "124",
      name: "Fatima",
      email: "def@gmail.com",
    },
    // Add more rows as needed
  ];

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = rows.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const filteredRows = paginatedRows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchKeyword.toLowerCase())
    )
  );

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <NavBar>
      <h1 style={styles.h2}>Teachers</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
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
              <TableCell style={{ color: "#FFFFFF" }}>Teacher ID</TableCell>
              <TableCell style={{ color: "#FFFFFF" }}>Name</TableCell>
              <TableCell style={{ color: "#FFFFFF" }}>Email</TableCell>
              <TableCell style={{ color: "#FFFFFF" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.teacherId}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleUpdate(row.teacherId)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(row.teacherId)}>
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
  );
};

export default ViewTeachers;
