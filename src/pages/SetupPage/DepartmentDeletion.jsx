import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { UseContext } from "../../State/UseState/UseContext";

const DepartmentDeletion = () => {
  const [departments, setDepartments] = useState([]);
  const [deptLocationId, setDeptLocationId] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const { cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/route/department/get"
        );
        setDepartments(response.data.department);
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    };
    fetchDepartments();
  }, [authToken]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/route/location/getOrganizationLocations",
          {
            headers: { Authorization: authToken },
          }
        );
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };
    fetchLocations();
  }, [authToken]);

  const handleLocationChange = async (event) => {
    setSelectedLocation(event.target.value);

    try {
      const response = await axios.get(
        "http://localhost:4000/route/location/getOrganizationLocations",
        {
          headers: { Authorization: authToken },
        }
      );

      const location = response.data.find(
        (obj) => obj.shortName === event.target.value
      );
      const singleDept = departments.filter(
        (dept) => dept.departmentLocation === location._id
      );
      setFilteredDepartments(singleDept);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (!selectedLocation) {
        console.error("Please select a department to delete.");
        return;
      }
      await axios.delete(
        `http://localhost:4000/route/department/delete/${deptLocationId}`,
        {
          headers: { Authorization: authToken },
        }
      );

      const response = await axios.get(
        "http://localhost:4000/route/department/get"
      );
      setDepartments(response.data.department);
      setSelectedLocation("");
      setFilteredDepartments([]);
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  const getDepartmentId = (e) => {
    setDeptLocationId(e.target.value);
  };

  const generateExcel = () => {
    try {
      const wb = XLSX.utils.book_new();
      const wsData = [["Department Name", "Department ID"]];

      // Add department information to the worksheet data
      filteredDepartments.forEach((department) => {
        wsData.push([department.departmentName, department._id]);
      });

      const ws = XLSX.utils.aoa_to_sheet(wsData);

      // Set column width for the 'Department Name' column
      const columnWidths = [{ wch: 20 }, { wch: 15 }];
      ws["!cols"] = columnWidths;

      XLSX.utils.book_append_sheet(wb, ws, "DepartmentSheet");
      XLSX.writeFile(wb, "DepartmentTemplate.xlsx");
    } catch (error) {
      console.error("Error generating Excel:", error);
    }
  };

  // const handleExcelDelete = async () => {
  //   try {
  //     // Load the uploaded Excel file
  //     const fileInput = document.getElementById("fileInput");
  //     const file = fileInput.files[0];

  //     if (!file) {
  //       console.error("Please upload an Excel file.");
  //       return;
  //     }

  //     const reader = new FileReader();
  //     reader.onload = function (e) {
  //       const data = new Uint8Array(e.target.result);
  //       const workbook = XLSX.read(data, { type: "array" });

  //       // Assuming the first sheet is named 'DepartmentSheet'
  //       const ws = workbook.Sheets["DepartmentSheet"];

  //       // Iterate through rows starting from the second row (index 1)
  //       for (let row = 1; row < ws["!rows"].length; row++) {
  //         const deleteCommand = ws[XLSX.utils.encode_cell({ r: row, c: 2 })]; // Assuming "Delete" column is at index 2

  //         if (
  //           deleteCommand &&
  //           deleteCommand.v &&
  //           deleteCommand.v.toLowerCase() === "delete"
  //         ) {
  //           const departmentIdToDelete =
  //             ws[XLSX.utils.encode_cell({ r: row, c: 1 })].v; // Assuming "Department ID" column is at index 1

  //           // Perform the deletion logic
  //           axios.delete(
  //             `http://localhost:4000/route/department/delete/${departmentIdToDelete}`,
  //             {
  //               headers: { Authorization: authToken },
  //             }
  //           );
  //         }
  //       }
  //     };

  //     reader.readAsArrayBuffer(file);
  //   } catch (error) {
  //     console.error("Error handling Excel delete:", error);
  //   }
  // };

  return (
    <Container
      style={{
        width: "500px",
        position: "relative",
        top: "5rem",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        paddingTop: "1rem",
      }}
    >
      <Typography style={{ fontSize: "1.5rem" }}>Delete Department</Typography>

      <FormControl
        required
        style={{
          width: "100%",
          height: "10px",
          marginBottom: 30,
          marginTop: 20,
        }}
        size="small"
      >
        <InputLabel id="location-label">Select Location</InputLabel>
        <Select
          labelId="location-label"
          id="location"
          name="location"
          value={selectedLocation}
          onChange={handleLocationChange}
        >
          {locations.map((data, index) => (
            <MenuItem key={index} value={data.shortName}>
              {data.shortName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        required
        style={{
          width: "100%",
          height: "10px",
          marginBottom: 50,
          marginTop: 20,
        }}
        size="small"
      >
        <InputLabel id="department-label">Select Department</InputLabel>
        <Select
          labelId="department-label"
          id="department"
          name="department"
          onChange={getDepartmentId}
        >
          {filteredDepartments.length === 0 && (
            <h1 className="p-2">dept's not found!!</h1>
          )}
          {filteredDepartments.map((data, index) => (
            <MenuItem key={index} value={data._id}>
              {data.departmentName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="flex gap-4 w-full">
        <Button
          variant="contained"
          style={{ marginBottom: "2rem" }}
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          style={{ marginBottom: "2rem" }}
          onClick={generateExcel}
        >
          Generate Excel
        </Button>
      </div>
    </Container>
  );
};

export default DepartmentDeletion;
