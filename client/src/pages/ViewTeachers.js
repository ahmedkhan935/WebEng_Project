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

const ViewTeachers = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterBatch, setFilterBatch] = useState("");
  const [filterDegree, setFilterDegree] = useState("");

  const handleDelete = (teacherId) => {
    console.log(`Deleting teacher with ID: ${teacherId}`);
  };

  const handleUpdate = (teacherId) => {
    console.log(`Updating teacher with ID: ${teacherId}`);
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
    </div>
  );
};

export default ViewTeachers;
