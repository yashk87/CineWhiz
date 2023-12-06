import { Delete, Warning } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { TestContext } from "../../State/Function/Main";
import { UseContext } from "../../State/UseState/UseContext";
import Setup from "../SetUpOrganization/Setup";
import { Menu, MenuItem } from "@mui/material";
import * as XLSX from "xlsx";

const DeleteEmployee = () => {
  const { handleAlert } = useContext(TestContext);
  const { setAppAlert, cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];
  const queryClient = useQueryClient();
  const [nameSearch, setNameSearch] = useState("");
  const [deptSearch, setDeptSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [availableEmployee, setAvailableEmployee] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [deleteMultiEmpConfirmation, setDeleteMultiEmpConfirmation] =
    useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showConfirmationExcel, setShowConfirmationExcel] = useState(false);
  const fetchAvailableEmployee = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/route/employee/get-employee`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      setAvailableEmployee(response.data.employeeData);
    } catch (error) {
      console.error(error);
      handleAlert(true, "error", "Failed to fetch Available Employee");
    }
  };
  useEffect(() => {
    fetchAvailableEmployee();
    // eslint-disable-next-line
  }, []);

  // Delete Query for deleting single Employee
  const handleDeleteConfirmation = (id) => {
    setDeleteConfirmation(id);
  };

  const handleCloseConfirmation = () => {
    setDeleteConfirmation(null);
  };
  const handleDelete = (id) => {
    deleteMutation.mutate(id);
    handleCloseConfirmation();
  };
  const deleteMutation = useMutation(
    (id) =>
      axios.delete(`${process.env.REACT_APP_API}/route/employee/delete/${id}`, {
        headers: {
          Authorization: authToken,
        },
      }),
    {
      onSuccess: () => {
        // Invalidate and refetch the data after successful deletion
        queryClient.invalidateQueries("employee");
        handleAlert(true, "success", "Employee deleted succesfully");
      },
    }
  );
  // Delete Query for deleting Multiple Employee
  const handleEmployeeSelection = (id) => {
    const selectedIndex = selectedEmployees.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      // If the employee is not already selected, add it to the selectedEmployees array
      newSelected = [...selectedEmployees, id];
    } else {
      // If the employee is already selected, remove it from the selectedEmployees array
      newSelected = selectedEmployees.filter((employeeId) => employeeId !== id);
    }

    setSelectedEmployees(newSelected);
  };

  const handleDeleteMultiple = () => {
    // Check if any employees are selected
    if (selectedEmployees.length === 0) {
      handleAlert(true, "error", "Please select employees to delete");
      return;
    }

    // Display confirmation dialog for deleting multiple employees
    setDeleteMultiEmpConfirmation(true);
  };

  // Handle confirmation of deleting multiple employees
  const confirmDeleteMultiple = async () => {
    try {
      // Make a request to delete multiple employees using selectedEmployee array
      const response = await axios.delete(
        `${process.env.REACT_APP_API}/route/employee/delete-multiple`,
        {
          headers: {
            Authorization: authToken,
          },
          data: { ids: selectedEmployees }, // Send selected employee IDs to delete
        }
      );
      console.log(response);
      // Handle success message or any further action upon successful deletion
      queryClient.invalidateQueries("employee");
      handleAlert(true, "success", "Employees deleted successfully");
    } catch (error) {
      console.error(error);
      handleAlert(true, "error", "Failed to delete employees");
    } finally {
      // Close the confirmation dialog
      setDeleteMultiEmpConfirmation(false);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // generate excel sheet
  const generateExcel = () => {
    try {
      const wb = XLSX.utils.book_new();
      const wsData = [
        [
          "Employee Id",
          "First Name",
          "Last Name",
          "Email",
          "Phone Number",
          "Profile",
        ],
      ];
      // Add Employee information to the worksheet data
      availableEmployee.forEach((employee) => {
        wsData.push([
          employee._id, // Assuming _id is the Employee Id
          employee.first_name,
          employee.last_name,
          employee.email,
          employee.phone_number,
          employee.profile.join(", "), // Join profile array into a string
        ]);
      });
      // Create a worksheet and add data to workbook
      const ws = XLSX.utils.aoa_to_sheet(wsData);

      const columnWidths = [
        { wch: 30 }, // Employee Id
        { wch: 20 }, // First Name
        { wch: 20 }, // Last Name
        { wch: 35 }, // Email
        { wch: 15 }, // Phone Number
        { wch: 35 }, // Profile
      ];
      ws["!cols"] = columnWidths;
      XLSX.utils.book_append_sheet(wb, ws, "EmployeeSheet");
      // Save workbook to a file
      XLSX.writeFile(wb, "EmployeeDataTemplate.xlsx");
    } catch (error) {
      console.error("Error generating Excel:", error);
    }
  };
  // // Function to read Excel file data
  // const readExcelFile = (file) => {
  //   const fileReader = new FileReader();
  //   fileReader.onload = (event) => {
  //     const data = event.target.result;
  //     const workbook = XLSX.read(data, { type: "binary" });
  //     const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
  //     const worksheet = workbook.Sheets[sheetName];
  //     const excelData = XLSX.utils.sheet_to_json(worksheet);
  //     console.log("Excel Data:", excelData); // Do something with the read data
  //     setExcelDataToDelete(excelData);
  //   };
  //   fileReader.readAsBinaryString(file);
  // };
  // Function to handle file upload
  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   console.log(file);
  //   readExcelFile(file);
  // };
  // Function to handle delete button click
  // const handleDeleteExcelData = () => {
  //   if (excelDataToDelete) {
  //     setConfirmDeleteDialog(true);
  //   }
  // };

  const handleDeleteFromExcel = async () => {
    try {
      const fileInput = document.getElementById("fileInput");
      const file = fileInput.files[0];
      console.log(file);

      if (!file) {
        console.error("Please upload an Excel file.");
        setAppAlert({
          alert: true,
          type: "error",
          msg: "Please upload an Excel file.",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = async function (e) {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const ws = workbook.Sheets["EmployeeSheet"];
          const deleteColumnIndex = XLSX.utils.decode_range(ws["!ref"]).e.c;

          if (deleteColumnIndex === undefined) {
            console.error("Delete column not found in the Excel sheet.");
            setAppAlert({
              alert: true,
              type: "error",
              msg: "Delete column not found in the Excel sheet.",
            });
            return;
          }
          const employeesToDelete = [];

          for (
            let row = 1;
            row <= XLSX.utils.decode_range(ws["!ref"]).e.r;
            row++
          ) {
            const deleteCommand =
              ws[XLSX.utils.encode_cell({ r: row, c: deleteColumnIndex })];

            if (
              deleteCommand &&
              deleteCommand.v &&
              deleteCommand.v.toLowerCase() === "delete"
            ) {
              const employeeIdToDelete =
                ws[XLSX.utils.encode_cell({ r: row, c: 1 })].v;

              const employeeToDelete = availableEmployee.find(
                (employee) => employee._id === employeeIdToDelete
              );
              if (employeeToDelete) {
                employeesToDelete.push(employeeToDelete);
              }
            }
          }

          if (employeesToDelete.length === 0) {
            setAppAlert({
              alert: true,
              type: "error",
              msg: "Failed to delete employee from Excel. Please try again.",
            });
            setShowConfirmationExcel(false);
            return;
          }
        } catch (error) {
          console.error("Error processing Excel data:", error);
          setAppAlert({
            alert: true,
            type: "error",
            msg: "Error processing Excel data.",
          });
          setShowConfirmationExcel(false);
        }
      };
    } catch (error) {
      console.error("Error handling Excel delete:", error);
      setAppAlert({
        alert: true,
        type: "error",
        msg: "Error handling Excel delete.",
      });
      setShowConfirmationExcel(false);
    }
  };

  return (
    <>
      <section className="bg-gray-50 min-h-screen w-full">
        <Setup>
          <article className="SetupSection bg-white w-[80%]  h-max shadow-md rounded-sm border  items-center">
            <div className="p-4  border-b-[.5px] flex items-center justify-between  gap-3 w-full border-gray-300">
              <div className="flex items-center  gap-3 ">
                <TextField
                  onChange={(e) => setNameSearch(e.target.value)}
                  placeholder="Search Employee Name...."
                  variant="outlined"
                  size="small"
                  sx={{ width: 300 }}
                />
              </div>
              <div className="flex items-center  gap-3 ">
                <TextField
                  onChange={(e) => setDeptSearch(e.target.value)}
                  placeholder="Search Department Name...."
                  variant="outlined"
                  size="small"
                  sx={{ width: 300 }}
                />
              </div>
              <div className="flex items-center  gap-3 ">
                <TextField
                  onChange={(e) => setLocationSearch(e.target.value)}
                  placeholder="Search Location ...."
                  variant="outlined"
                  size="small"
                  sx={{ width: 300 }}
                />
              </div>
              <div>
                <IconButton onClick={handleMenuClick}>
                  <DeleteForeverIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={generateExcel}>Generate Excel </MenuItem>
                  <MenuItem>
                    <input
                      type="file"
                      accept=".xlsx, .xls"
                      id="fileInput"
                      className="w-full rounded"
                    />
                  </MenuItem>
                  <MenuItem onClick={() => setShowConfirmationExcel(true)}>
                    Delete
                  </MenuItem>
                </Menu>
              </div>

              <Button
                className="!font-semibold !bg-sky-500 flex items-center gap-2"
                variant="contained"
                onClick={handleDeleteMultiple}
              >
                Delete
              </Button>
            </div>

            <div className="overflow-auto !p-0  border-[.5px] border-gray-200">
              <table className="min-w-full bg-white  text-left !text-sm font-light">
                <thead className="border-b bg-gray-200  font-medium dark:border-neutral-500">
                  <tr className="!font-semibold">
                    <th scope="col" className="!text-left pl-8 py-3"></th>
                    <th scope="col" className="!text-left pl-8 py-3">
                      SR NO
                    </th>
                    <th scope="col" className="!text-left pl-8 py-3">
                      First Name
                    </th>
                    <th scope="col" className="!text-left pl-8 py-3">
                      Last Name
                    </th>
                    <th scope="col" className="!text-left pl-8 py-3">
                      Email
                    </th>
                    <th scope="col" className="!text-left pl-8 py-3">
                      Location
                    </th>
                    <th scope="col" className="!text-left pl-8 py-3">
                      Department
                    </th>
                    <th scope="col" className="!text-left pl-8 py-3">
                      Phone Number
                    </th>

                    <th scope="col" className="px-6 py-3 ">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {availableEmployee
                    .filter((item) => {
                      return (
                        (!nameSearch.toLowerCase() ||
                          (item.first_name &&
                            item.first_name
                              .toLowerCase()
                              .includes(nameSearch))) &&
                        (!deptSearch.toLowerCase() ||
                          (item.deptname &&
                            item.deptname
                              .toLowerCase()
                              .includes(deptSearch))) &&
                        (!locationSearch.toLowerCase() ||
                          item.worklocation.some(
                            (location) =>
                              location.city &&
                              location.city
                                .toLowerCase()
                                .includes(locationSearch)
                          ))
                      );
                    })
                    .map((item, id) => (
                      <tr className="!font-medium border-b" key={id}>
                        <td className="!text-left pl-8 py-3">
                          <Checkbox
                            checked={selectedEmployees.indexOf(item._id) !== -1}
                            onChange={() => handleEmployeeSelection(item._id)}
                          />
                        </td>
                        <td className="!text-left pl-8 py-3">{id + 1}</td>
                        <td className="py-3">{item.first_name}</td>
                        <td className="py-3">{item.last_name}</td>
                        <td className="py-3">{item.email}</td>
                        <td className="py-3">
                          {item.worklocation.map((location, index) => (
                            <span key={index}>{location.city}</span>
                          ))}
                        </td>
                        <td className="py-3">{item.deptname}</td>
                        <td className="py-3">{item.phone_number}</td>

                        <td className="whitespace-nowrap px-6 py-2">
                          <IconButton
                            onClick={() => handleDeleteConfirmation(item._id)}
                          >
                            <Delete className="!text-xl" color="error" />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </article>
        </Setup>
      </section>
      {/* this dialogue for deleting single employee */}
      <Dialog
        open={deleteConfirmation !== null}
        onClose={handleCloseConfirmation}
      >
        <DialogTitle color={"error"}>
          <Warning color="error" /> Are you sure to delete this Employee?
        </DialogTitle>
        <DialogContent>
          <p>
            Please confirm your decision to delete this employee, as this action
            cannot be undone
          </p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseConfirmation}
            variant="outlined"
            color="primary"
            size="small"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleDelete(deleteConfirmation)}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* This Dialogue for delting Multiple Employe */}
      <Dialog
        open={deleteMultiEmpConfirmation}
        onClose={() => setDeleteMultiEmpConfirmation(false)}
      >
        <DialogTitle color={"error"}>
          <Warning color="error" /> Are you sure to delete selected employees?
        </DialogTitle>
        <DialogContent>
          <p>
            Please confirm your decision to delete this selected employee, as
            this action cannot be undone
          </p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteMultiEmpConfirmation(false)}
            variant="outlined"
            color="primary"
            size="small"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={confirmDeleteMultiple}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* This Dialogue for delting Multiple Employe from excel sheet*/}
      <Dialog
        open={showConfirmationExcel}
        onClose={() => setShowConfirmationExcel(false)}
      >
        <DialogTitle color={"error"}>
          <Warning color="error" /> Are you sure to delete employee from excel
          sheet?
        </DialogTitle>
        <DialogContent>
          <p>
            Please confirm your decision to delete this employee, as this action
            cannot be undone
          </p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowConfirmationExcel(false)}
            variant="outlined"
            color="primary"
            size="small"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={handleDeleteFromExcel}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteEmployee;
