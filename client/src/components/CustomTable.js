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
} from "@mui/material";

const CustomTable = ({ columns, rows, title }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchKeyword.toLowerCase())
    )
  );

  return (
    <div style={{ margin: "20px" }}>
      <h1
        style={{
          fontFamily: "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif",
          marginLeft: "550px",
        }}
      >
        {title}
      </h1>
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
        style={{ marginTop: "10px", marginBottom: "10px", float: "right" }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{column.toUpperCase()}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor:
                    index % 2 === 0
                      ? "linear-gradient(to right, #adbbde, #B6BCCA)"
                      : "#fff",
                }}
              >
                {columns.map((column, columnIndex) => (
                  <TableCell key={columnIndex}>{row[column]} </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomTable;
