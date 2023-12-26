import React, { useState } from "react";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  IconButton,
  FormControl,
  TextField,
  InputAdornment,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import NavBar from "../components/Navbar";
import { getLogs } from "../services/AdminService";

const ViewLogs = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [rows, setRows] = useState([]);
  useEffect(() => {
    getLogs().then((res) => {
      res.json().then((data) => {
        setRows(data);
      });
    });
  }, []);

  const handleDelete = (id) => {
    console.log(`Deleting Log with ID: ${id}`);
  };

  const styles = {
    h2: {
      color: "#22717d",
      float: "left",
    },
  };

  // const rows = [
  //   {
  //     name: "Fatima Bilal",
  //     userType: "Student",
  //     sessionType: "Login",
  //     date: "15/12/2023",
  //     time: "09:30:00",
  //   },
  //   {
  //     name: "Ahmed Raza",
  //     userType: "Teacher",
  //     sessionType: "Logout",
  //     date: "20/12/2023",
  //     time: "09:30:30",
  //   },
  //   Add more rows as needed
  // ];

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
        <Container>
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
          style={{ width: "95%", marginRight: "10px" }}
        >
          <Table>
            <TableHead>
              <TableRow style={{ background: "#22717d" }}>
                <TableCell style={{ color: "#FFFFFF" }}>Name</TableCell>
                <TableCell style={{ color: "#FFFFFF" }}>User Type</TableCell>
                <TableCell style={{ color: "#FFFFFF" }}>Session Type</TableCell>
                <TableCell style={{ color: "#FFFFFF" }}>Date</TableCell>
                <TableCell style={{ color: "#FFFFFF" }}>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.action}</TableCell>
                  <TableCell>
                    {new Date(row.timestamp).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(row.timestamp).toLocaleTimeString()}
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
        </Container>
      </NavBar>

  );
};

export default ViewLogs;
