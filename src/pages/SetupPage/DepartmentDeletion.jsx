import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import axios from "axios";
import { UseContext } from "../../State/UseState/UseContext";
import * as XLSX from "xlsx";

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
        console.log(locations);
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

      const departmentsWithSelectedLocation = departments.filter((data) => {
        const hasLocation = data.organizationLocationId.some(
          (locationId) => locationId === location._id
        );
        console.log(
          `Checking ${data.departmentName} - Has Location: ${hasLocation}`
        );
        return hasLocation;
      });
      console.log("Filtered Departments:", departmentsWithSelectedLocation);
      setFilteredDepartments(departmentsWithSelectedLocation);
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
      const data = [
        ["John Smith", 20],
        ["Bob Johnson", 22],
      ];
      const ws = XLSX.utils.aoa_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "DepartmentTemplate.xlsx");
    } catch (error) {
      console.error("Error generating Excel:", error);
    }
  };

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
