import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NavBar from "../components/Navbar";
import {viewAllStudents,deleteStudent} from "../services/AdminService"

const ViewStudents = () => {
  const navigate = useNavigate();

  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterBatch, setFilterBatch] = useState("");
  const [filterDegree, setFilterDegree] = useState("");

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
    navigate("/admin/updateStudent/"+ studentId);

  };
  const [rows, setRows] = useState([]);
  useEffect(() => {
    viewAllStudents().then((res) => {
      console.log(res);
      const rows = res.map((row) => {
        return {
          studentId: row.rollNumber,
          name: row.name,
          batch: row.batch,
          degree: row.degreeName,
          _id: row._id,
        };
      });
      setRows(rows);

    });
  }, []);



  const styles = {
    h2: {
      color: "#22717d",
      float: "left",
    },
  };
  // const rows = [
  //   {
  //     studentId: "34234",
  //     name: "Fatima Bilal",
  //     batch: "2020",
  //     degree: "CS",
  //   },
  //   {
  //     studentId: "8799",
  //     name: "Ahmed Raza",
  //     batch: "2021",
  //     degree: "SE",
  //   },
  // ];

  // const filteredRows = rows
  //   .filter(
  //     (row) =>
  //       (filterBatch === "" || row.batch === filterBatch) &&
  //       (filterDegree === "" || row.degree === filterDegree)
  //   )
  //   .filter((row) =>
  //     Object.values(row).some((value) =>
  //       String(value).toLowerCase().includes(searchKeyword.toLowerCase())
  //     )
  //   );

  return (
    <div>
      <NavBar>
        <h1 style={styles.h2}>Students</h1>
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
              <option value="Bachelor of Business Administration">
                Bachelor of Business Administration
              </option>
              <option value="Bachelor of Science (Accounting and Finance)">
                Bachelor of Science (Accounting and Finance)
              </option>
              <option value="Bachelor of Science (Artificial Intelligence)">
                Bachelor of Science (Artificial Intelligence)
              </option>
              <option value="Bachelor of Science (Business Analytics)">
                Bachelor of Science (Business Analytics)
              </option>
              <option value="Bachelor of Science (Civil Engineering)">
                Bachelor of Science (Civil Engineering)
              </option>
              <option value="Bachelor of Science (Computer Science)">
                Bachelor of Science (Computer Science)
              </option>
              <option value="Bachelor of Science (Cyber Security)">
                Bachelor of Science (Cyber Security)
              </option>
              <option value="Bachelor of Science (Data Science)">
                Bachelor of Science (Data Science)
              </option>
              <option value="Bachelor of Science (Electrical Engineering)">
                Bachelor of Science (Electrical Engineering)
              </option>
              <option value="Bachelor of Science (Financial Technologies)">
                Bachelor of Science (Financial Technologies)
              </option>
              <option value="Bachelor of Science (Software Engineering)">
                Bachelor of Science (Software Engineering)
              </option>
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
          style={{ width: "95%", float: "right", marginRight: "10px" }}
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
              {rows && rows.map((row, index) => (
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
      </NavBar>
    </div>
  );
};

export default ViewStudents;
