import React, { useState } from "react";

import CustomTable from "../components/CustomTable.js";

//the column names must be in camel case notation
const columns = ["studentId", "name", "Batch", "Department"];

const DeansList = () => {
  const rows = [
    {
      studentId: "34234",
      name: "Fatima Bilal",
      Batch: "2020",
      Department: "SE",
    },
    {
      studentId: "343",
      name: "Ahmed Raza",
      Batch: "2021",
      Department: "CS",
    },
    {
      studentId: "2132",
      name: "Ahmed Raza",
      Batch: "2021",
      Department: "CS",
    },
    {
      studentId: "324",
      name: "Ahmed Raza",
      Batch: "2021",
      Department: "CS",
    },
  ];

  return (
    <div style={{ margin: "20px" }}>
      <CustomTable columns={columns} rows={rows} title="Deans List" />
    </div>
  );
};

export default DeansList;
