import React, { useState } from "react";

import CustomTable from "../components/CustomTable.js";
import NavBar from "../components/Navbar.js";
//the column names must be in camel case notation
const columns = ["studentId", "name", "Batch", "Department"];

const WarningList = () => {
  const rows = [
    {
      studentId: "34234",
      name: "Fatima Bilal",
      Batch: "2020",
      Department: "SE",
    },
    {
      studentId: "34240",
      name: "Ahmed Raza",
      Batch: "2021",
      Department: "CS",
    },
    {
      studentId: "34240",
      name: "Ahmed Raza",
      Batch: "2021",
      Department: "CS",
    },
    {
      studentId: "34240",
      name: "Ahmed Raza",
      Batch: "2021",
      Department: "CS",
    },
  ];

  return (
    <NavBar>
      <div style={{ margin: "20px" }}>
        <CustomTable columns={columns} rows={rows} title="Warning List" />
      </div>
    </NavBar>
  );
};

export default WarningList;
