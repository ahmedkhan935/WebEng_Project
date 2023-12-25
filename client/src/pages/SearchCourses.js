import React, { useEffect, useState } from "react";
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
  Button,
  Link,
} from "@mui/material";
import LibraryAddTwoToneIcon from "@mui/icons-material/LibraryAddTwoTone";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NavBar from "../components/Navbar";
import { viewAllCourses, deleteCourse } from "../services/AdminService";

const SearchCourses = () => {
  const navigate = useNavigate();

  const [searchKeyword, setSearchKeyword] = useState("");
  const [rows, setRows] = useState([]);

  const handleDelete = (id) => {
    deleteCourse(id).then((res) => {
      if (!res.errorMessage) {
        alert("Course deleted successfully");
        setRows(rows.filter((row) => row._id !== id));
      } else {
        alert("Course could not be deleted");
      }
    });
  };

  const handleUpdate = (id) => {
    navigate("/admin/updateCourse/" + id);
  };

  const handleaddcourse = () => {
    navigate("/admin/createCourse");
  };
  useEffect(() => {
    viewAllCourses().then((res) => {
      const rows = res.map((row) => ({
        code: row.courseCode,
        name: row.courseName,
        credit: row.courseCredits,
        type: row.courseType,
        _id: row._id,
      }));
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
  //     code: "34G3A",
  //     name: "Programming Fundamental",
  //     credit: "4",
  //     type: "Theory",
  //   },
  //   {
  //     code: "23H3A",
  //     name: "Data Structure",
  //     credit: "3",
  //     type: "Lab",
  //   },
  // ];

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchKeyword.toLowerCase())
    )
  );

  return (
    <div>
      <NavBar>
        <h1 style={styles.h2}>Courses</h1>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Button
            component={Link}
            onClick={handleaddcourse}
            variant="outlined"
            color="primary"
            style={{
              zIndex: 2000,
              width: "150px",
              height: "40px",
            }}
            startIcon={<LibraryAddTwoToneIcon />}
          >
            Add Course
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
          style={{ width: "95%", float: "right", marginRight: "10px" }}
        >
          <Table>
            <TableHead>
              <TableRow style={{ background: "#22717d" }}>
                <TableCell style={{ color: "#FFFFFF" }}>Course code</TableCell>
                <TableCell style={{ color: "#FFFFFF" }}>Name</TableCell>
                <TableCell style={{ color: "#FFFFFF" }}>Credit</TableCell>
                <TableCell style={{ color: "#FFFFFF" }}>Type</TableCell>
                <TableCell style={{ color: "#FFFFFF" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.credit}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleUpdate(row._id)}>
                      <EditIcon color="secondary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row._id)}>
                      <DeleteIcon color="secondary" />
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

export default SearchCourses;
