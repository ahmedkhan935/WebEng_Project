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

import NavBar from "../components/Navbar";

const ViewFeedback = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const styles = {
    h2: {
      color: "#22717d",
      float: "left",
    },
  };

  const rows = [
    {
      StudentId: "983291",
      CourseCode: "32df23",
      teacher: "Fatima",
      feedback: "very good",
    },
    {
      StudentId: "324332",
      CourseCode: "dfyt32",
      teacher: "Ahmed",
      feedback: "very bad",
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
        <h1 style={styles.h2}>Courses Feebacks</h1>

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
                <TableCell style={{ color: "#FFFFFF" }}>Student Id</TableCell>
                <TableCell style={{ color: "#FFFFFF" }}>Course Code</TableCell>
                <TableCell style={{ color: "#FFFFFF" }}>Teacher</TableCell>
                <TableCell style={{ color: "#FFFFFF" }}>Feedback</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.StudentId}</TableCell>
                  <TableCell>{row.CourseCode}</TableCell>
                  <TableCell>{row.teacherSS}</TableCell>
                  <TableCell>{row.feedback}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </NavBar>
    </div>
  );
};

export default ViewFeedback;
