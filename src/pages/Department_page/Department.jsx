import { Card } from "@mui/material";
import React from "react";
import DepartmentForm from "./Components/Department-form";

const Department = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        padding: "60px 40px",
        boxSizing: "border-box",
      }}
    >
      <Card variant="outlined" style={{ width: "95%", height: 450 }} className="grid grid-cols-2">
        <div className=" bg-blue-500"></div>
        <div className="flex justify-center items-center bg-[#F8F8F8]">
          <DepartmentForm />
        </div>
      </Card>
    </div>
  );
};

export default Department;
