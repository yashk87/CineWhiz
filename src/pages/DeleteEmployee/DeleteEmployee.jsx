import React, { useContext, useEffect, useState } from "react";
import Setup from "../SetUpOrganization/Setup";
import { Button, TextField } from "@mui/material";
import { UseContext } from "../../State/UseState/UseContext";
import { TestContext } from "../../State/Function/Main";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Delete, Warning } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
const DeleteEmployee = () => {
  const { handleAlert } = useContext(TestContext);
  const { cookies } = useContext(UseContext);
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
              <Button
                className="!font-semibold !bg-sky-500 flex items-center gap-2"
                variant="contained"
              >
                Bulk Delete
              </Button>
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
            This action will delete the Employee after deleting Employee it will
            not retrived.
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
            This action will delete the selected employees, and they cannot be
            retrieved.
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
    </>
  );
};

export default DeleteEmployee;
