import React, { useState } from "react";

import CustomTable from "../components/CustomTable.js";
import NavBar from "../components/Navbar.js";
//the column names must be in camel case notation
const columns = ["code", "name", "credit", "type"];

const SearchCourses = () => {
  const rows = [
    {
      code: "34G3A",
      name: "Programming Fundamental",
      credit: "4",
      type: "Theory",
    },
    {
      code: "23H3A",
      name: "Data Structure",
      credit: "3",
      type: "Lab",
    },
  ];

  return (
    <NavBar>
      <div style={{ margin: "20px" }}>
        <CustomTable columns={columns} rows={rows} title="Courses List" />
      </div>
    </NavBar>
  );
};

export default SearchCourses;
