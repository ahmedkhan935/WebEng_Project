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
import theme from "../assets/theme/theme";

const CustomTable = ({ columns, rows, title }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchKeyword.toLowerCase())
    )
  );

  return (
    <div style={{ margin: "20px" }}>
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
          <TableHead style={{ background: "#22717d" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column} style={{ color: "#FFFFFF" }}>
                  {column.toUpperCase()}
                </TableCell>
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
