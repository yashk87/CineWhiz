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
import {
  BorderColor,
  Delete,
  ManageAccountsOutlined,
  Warning,
} from "@mui/icons-material";
import { useMutation, useQuery, useQueryClient } from "react-query";
const DeleteEmployee = () => {
  const { handleAlert } = useContext(TestContext);
  const { cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [availableEmployee, setAvailableEmployee] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

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

  // Delete Query
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
  return (
    <>
      <section className="bg-gray-50 min-h-screen w-full">
        <Setup>
          <article className="SetupSection bg-white w-[80%]  h-max shadow-md rounded-sm border  items-center">
            <div className="p-4  border-b-[.5px] flex items-center justify-between  gap-3 w-full border-gray-300">
              <div className="flex items-center  gap-3 ">
                <div className="flex items-center  gap-3 ">
                  <TextField
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Employee Name...."
                    variant="outlined"
                    size="small"
                    sx={{ width: 300 }}
                  />
                </div>
              </div>
            </div>

            <div className="overflow-auto !p-0  border-[.5px] border-gray-200">
              <table className="min-w-full bg-white  text-left !text-sm font-light">
                <thead className="border-b bg-gray-200  font-medium dark:border-neutral-500">
                  <tr className="!font-semibold ">
                    <th scope="col" className="!text-left pl-8 py-3 ">
                      SR NO
                    </th>
                    <th scope="col" className="!text-left pl-8 py-3 ">
                      First Name
                    </th>
                    <th scope="col" className="!text-left pl-8 py-3 ">
                      Last Name
                    </th>{" "}
                    <th scope="col" className="!text-left pl-8 py-3 ">
                      Email
                    </th>
                    <th scope="col" className="!text-left pl-8 py-3 ">
                      Phone Number
                    </th>
                    <th scope="col" className="!text-left pl-8 py-3 ">
                      Address
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {availableEmployee
                    .filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.first_name.toLowerCase().includes(search);
                    })
                    .map((item, id) => (
                      <tr className="!font-medium border-b" key={id}>
                        <td className="!text-left pl-8 py-3 ">{id + 1}</td>
                        <td className="py-3 ">{item.first_name}</td>
                        <td className="py-3 ">{item.last_name}</td>
                        <td className="py-3 ">{item.email}</td>
                        <td className="py-3 ">{item.phone_number}</td>
                        <td className="py-3 ">{item.address}</td>
                        <td className="whitespace-nowrap px-6 py-2">
                          <IconButton
                            onClick={() => handleDeleteConfirmation(item._id)}
                          >
                            <Delete className="!text-xl" color="error" />
                          </IconButton>
                          <IconButton>
                            <BorderColor className="!text-xl" color="success" />
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
    </>
  );
};

export default DeleteEmployee;
