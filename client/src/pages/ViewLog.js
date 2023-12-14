import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  FormControl,
  TextField,
  InputAdornment,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import NavBar from "../components/Navbar";

const ViewLogs = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleDelete = (id) => {
    console.log(`Deleting Log with ID: ${id}`);
  };

  const styles = {
    h2: {
      color: "#22717d",
      float: "left",
    },
  };

  const rows = [
    {
      name: "Fatima Bilal",
      userType: "Student",
      sessionType: "Login",
      date: "15/12/2023",
      time: "09:30:00",
    },
    {
      name: "Ahmed Raza",
      userType: "Teacher",
      sessionType: "Logout",
      date: "20/12/2023",
      time: "09:30:30",
    },
  ];

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchKeyword.toLowerCase())
    )
  );

  return (
    <div>
      <NavBar>
        <h1 style={styles.h2}>Session Log</h1>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
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
                <TableCell style={{ color: "#FFFFFF" }}>Name</TableCell>
                <TableCell style={{ color: "#FFFFFF" }}>User Type</TableCell>
                <TableCell style={{ color: "#FFFFFF" }}>Session Type</TableCell>
                <TableCell style={{ color: "#FFFFFF" }}>Date</TableCell>
                <TableCell style={{ color: "#FFFFFF" }}>Time</TableCell>
                <TableCell style={{ color: "#FFFFFF" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.userType}</TableCell>
                  <TableCell>{row.sessionType}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(row.code)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </NavBar>
    </div>
  );
};

export default ViewLogs;
