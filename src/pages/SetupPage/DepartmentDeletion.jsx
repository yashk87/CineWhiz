import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { UseContext } from "../../State/UseState/UseContext";

const DepartmentDeletion = () => {
  const { setAppAlert } = useContext(UseContext);
  const [departments, setDepartments] = useState([]);
  const [deptLocationId, setDeptLocationId] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const { cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmationExcel, setShowConfirmationExcel] = useState(false);

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
      await axios.delete(`http://localhost:4000/route/department/delete/${deptLocationId}`, {
        headers: { Authorization: authToken },
      }).then((response) =>{
        setAppAlert({
          alert: true,
          type: 'success',
          msg: 'Department deleted successfully!',
        })
        setShowConfirmation(false);
      }).catch((error) =>{
        console.error("Error deleting department:", error);
        setAppAlert({
          alert: true,
          type: 'error',
          msg: 'Error deleting department. Please try again.',
        });
        setShowConfirmation(false);
      })

      const response = await axios.get(
        "http://localhost:4000/route/department/get"
      );
      setDepartments(response.data.department);
      setSelectedLocation("");
      setFilteredDepartments([]);
    } catch (error) {
      console.error("Error deleting department:", error);
    }
    setShowConfirmation(false);
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

  const handleDeleteFromExcel = async () => {
    try {
      const fileInput = document.getElementById('fileInput');
      const file = fileInput.files[0];

  //     if (!file) {
  //       console.error("Please upload an Excel file.");
  //       return;
  //     }

      const reader = new FileReader();
      reader.onload = async function (e) {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const ws = workbook.Sheets['DepartmentSheet'];

          const deleteColumnIndex = XLSX.utils.decode_range(ws['!ref']).e.c;

          if (deleteColumnIndex === undefined) {
            console.error('Delete column not found in the Excel sheet.');
            return;
          }

          const departmentsToDelete = [];

          // Iterate through rows starting from the second row (index 1)
          for (let row = 1; row <= XLSX.utils.decode_range(ws['!ref']).e.r; row++) {
            const deleteCommand = ws[XLSX.utils.encode_cell({ r: row, c: deleteColumnIndex })];

            if (
              deleteCommand &&
              deleteCommand.v &&
              deleteCommand.v.toLowerCase() === 'delete'
            ) {
              const departmentIdToDelete = ws[XLSX.utils.encode_cell({ r: row, c: 1 })].v;

              // Find the department with the matching ID
              const departmentToDelete = departments.find(
                (dept) => dept._id === departmentIdToDelete
              );

              if (departmentToDelete) {
                departmentsToDelete.push(departmentToDelete);
              }
            }
          }

          // Perform the deletion logic for each department
          for (const department of departmentsToDelete) {
            try {
              // Delete from the database
              await axios.delete(
                `http://localhost:4000/route/department/delete/${department._id}`,
                {
                  headers: { Authorization: authToken },
                }
              ).then((response) =>{
                console.log("Designation added successfully:", response.data);
                setSelectedLocation("");
                setFilteredDepartments([]);
                setAppAlert({
                  alert: true,
                  type: 'success',
                  msg: 'Departments deleted from the excel sheet!',
                })
                setShowConfirmationExcel(false)

              }).catch((error) => {
                console.error("Error deleting departments from excel:", error);
                setShowConfirmationExcel(false)
                setAppAlert({
                  alert: true,
                  type: 'error',
                  msg: 'Error deleting departments from excel Please try again.',

                });
                setSelectedLocation("");
                setFilteredDepartments([]);


              });


              // Optional: Remove the deleted department from the state
              setDepartments((prevDepartments) =>
                prevDepartments.filter((dept) => dept._id !== department._id)

              );
            } catch (error) {
              console.error('Error deleting department:', error);
            }
          }
        } catch (error) {
          console.error('Error processing Excel data:', error);
        }
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error handling Excel delete:', error);
    }
  };
  const handleConfirmation = async (confirmed) => {
    // Close the confirmation dialog
    setShowConfirmation(false);

    // If confirmed is true, proceed with deletion
    if (confirmed) {
      try {
        // Existing delete logic
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
        setAppAlert({
          alert: true,
          type: "success",
          msg: "Department deleted successfully!",
        });
      } catch (error) {
        console.error("Error deleting department:", error);
        setAppAlert({
          alert: true,
          type: "error",
          msg: "Error deleting department. Please try again.",
        });
      }
    } else {
      // If canceled, reset state or perform any other action
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
      <TextField
        type="file"
        id="fileInput"
        className="w-full rounded"
        onChange={() => setShowConfirmationExcel(true)}
      />
      <div className="flex justify-between w-full my-5">
        <Button
          color="error"
          variant="contained"
          style={{ marginBottom: "2rem" }}
          onClick={() => setShowConfirmation(true)}
        >
          Delete
        </Button>

        <Button
          variant="contained"
          color="warning"
          style={{ marginBottom: "2rem" }}
          onClick={generateExcel}
        >
          Generate Excel
        </Button>
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        open={showConfirmation}
        onClose={() => handleConfirmation(false)}
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this department?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleConfirmation(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="primary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showConfirmationExcel}
        onClose={() => handleConfirmation(false)}
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this departments?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowConfirmationExcel(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteFromExcel}
            color="primary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DepartmentDeletion;