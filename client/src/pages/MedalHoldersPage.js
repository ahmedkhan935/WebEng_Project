import React, { useState } from "react";
import CustomTable from "../components/CustomTable.js";
//the column names must be in camel case notation
const columns = ["studentId", "name", "medalType", "Batch", "Department"];

const MedalHoldersPage = () => {
  const rows = [
    {
      studentId: "34234",
      name: "Fatima Bilal",
      medalType: "Gold Medal",
      Batch: "2020",
      Department: "SE",
    },
    {
      studentId: "34240",
      name: "Ahmed Raza",
      medalType: "Golden Medal",
      Batch: "2021",
      Department: "CS",
    },
    {
      studentId: "34240",
      name: "Ahmed Raza",
      medalType: "Golden Medal",
      Batch: "2021",
      Department: "CS",
    },
    {
      studentId: "34240",
      name: "Ahmed Raza",
      medalType: "Golden Medal",
      Batch: "2021",
      Department: "CS",
    },
  ];

  return (
    <div style={{ margin: "20px" }}>
      <CustomTable columns={columns} rows={rows} title="Medal Holders" />
    </div>
  );
};

export default MedalHoldersPage;
