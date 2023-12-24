import React, { useState } from "react";
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
} from "@mui/material";
import Pagination from "@mui/material/Pagination";

import { InputLabel, MenuItem, Select, Box } from "@mui/material";

import NavBar from "../components/Navbar";
import { useEffect } from "react";
import { useParams } from "react-router";
import { getFeedback } from "../services/TeacherService";

const TeacherFeedback = () => {
  const [selectedBatch, setSelectedBatch] = useState("2021");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2;

  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
  };

  const batches = ["2020", "2021", "2022"];

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const [searchKeyword, setSearchKeyword] = useState("");

  const styles = {
    h2: {
      color: "#22717d",
      float: "left",
    },
  };

  // const rows = [
  //   {
  //     StudentId: "983291",
  //     CourseCode: "32df23",
  //     feedback: "very good",
  //   },
  //   {
  //     StudentId: "324332",
  //     CourseCode: "dfyt32",
  //     feedback: "very bad",
  //   },
  // ];
  const [rows, setRows] = useState([]);
  const {classCode} = useParams();

  useEffect(() => {
    getFeedback(classCode).then((res) => {
      console.log(res);
      setRows(res.data);
    });
  }, []);
  

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = rows.slice(startIndex, endIndex);

  //Calculating the total number of pages
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchKeyword.toLowerCase())
    )
  );

  return (
    <div>
      <NavBar>
        <h1 style={styles.h2}>Courses Feebacks</h1>
        <br />
        <br />
        <br />

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
        </Box>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <FormControl variant="outlined" style={{ marginRight: "10px" }}>
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
                <TableCell style={{ color: "#FFFFFF" }}>Student Id</TableCell>
                <TableCell style={{ color: "#FFFFFF" }}>Course Code</TableCell>

                <TableCell style={{ color: "#FFFFFF" }}>Feedback</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.studentId.name}</TableCell>
                  <TableCell>{classCode}</TableCell>

                  <TableCell>{row.feedback}</TableCell>
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

export default TeacherFeedback;
