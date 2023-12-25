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
  FormControl,
  TextField,
  InputAdornment,
  Link,
  Button,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";

import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { viewDegrees } from "../services/AdminService";

const ViewDegrees = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [rows, setRows] = useState([]);
  useEffect(async () => {
    viewDegrees().then((res) => {
      res.json().then((data) => {
        console.log(data);
        setRows(data);
      });
    });
  }, []);

  const styles = {
    h2: {
      color: "#22717d",
      float: "left",
    },
  };

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
    <div>
      <NavBar>
        <h1 style={styles.h2}>Degrees</h1>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Button
            component={Link}
            onClick={() => {
              navigate("/admin/addDegree");
            }}
            variant="outlined"
            color="primary"
            style={{
              height: "40px",
            }}
          >
            Add Degree
          </Button>
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
                <TableCell style={{ color: "#FFFFFF" }}>Abbreviation</TableCell>
                <TableCell style={{ color: "#FFFFFF" }}>Credit Hours</TableCell>
                <TableCell style={{ color: "#FFFFFF" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.abbreviation}</TableCell>
                  <TableCell>{row.totalCredits}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        navigate(`addDegree/${row._id}/selectCourses`);
                      }}
                    >
                      Add Courses
                    </Button>
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

export default ViewDegrees;
