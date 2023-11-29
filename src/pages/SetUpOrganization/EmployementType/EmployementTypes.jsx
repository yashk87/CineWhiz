import React from "react";
import Setup from "../Setup";
import {
  Button,
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
import axios from "axios";
import { useContext } from "react";
import { UseContext } from "../../../State/UseState/UseContext";
import { useState } from "react";
import { TestContext } from "../../../State/Function/Main";
import EmpTypeModal from "../../../components/Modal/EmployeeTypesModal/EmpTypeModal";
import { useParams } from "react-router-dom";

const EmployementTypes = () => {
  const { cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];
  const queryClient = useQueryClient();
  const { handleAlert } = useContext(TestContext);
  const { id } = useParams;

  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  // Modal states and function
  const [open, setOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [empTypeId, setempTypeId] = useState(null);
  const handleOpen = () => {
    setOpen(true);
    setempTypeId(null);
  };

  const handleClose = () => {
    setOpen(false);
    setempTypeId(null);
    setEditModalOpen(false);
  };

  // Get Query
  const { data: empList, isLoading } = useQuery("empTypes", async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/route/employment-types`,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    return response.data;
  });

  // Delete Query
  const handleDeleteConfirmation = (id) => {
    setDeleteConfirmation(id);
  };

  const handleCloseConfirmation = () => {
    setDeleteConfirmation(null);
  };

  const handleEditModalOpen = (empTypeId) => {
    setEditModalOpen(true);
    queryClient.invalidateQueries(["shift", empTypeId]);
    setempTypeId(empTypeId);
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
    handleCloseConfirmation();
  };

  const deleteMutation = useMutation(
    (id) =>
      axios.delete(
        `${process.env.REACT_APP_API}/route/employment-types/${id}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      ),
    {
      onSuccess: () => {
        // Invalidate and refetch the data after successful deletion
        queryClient.invalidateQueries("empTypes");
        handleAlert(true, "success", "Employment Types deleted succesfully");
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
                <div className="rounded-full bg-sky-500 h-[30px] w-[30px] flex items-center justify-center">
                  <ManageAccountsOutlined className="!text-lg text-white" />
                </div>
                <h1 className="!text-lg tracking-wide">
                  Create Employment types for organization
                </h1>
              </div>
              <Button
                className="!font-semibold !bg-sky-500 flex items-center gap-2"
                onClick={handleOpen}
                variant="contained"
              >
                Create Employment Types
              </Button>
            </div>

            <div className="overflow-auto !p-0  border-[.5px] border-gray-200">
              <table className="min-w-full bg-white  text-left !text-md font-light">
                <thead className="border-b bg-gray-200  font-medium dark:border-neutral-500">
                  <tr className="!font-semibold ">
                    <th scope="col" className="!text-left pl-8 py-3 ">
                      SR NO
                    </th>
                    <th scope="col" className="py-3 ">
                      Employment Title
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {empList?.empTypes?.map((emptype, id) => (
                    <tr className="!font-medium border-b" key={id}>
                      <td className="!text-left pl-8 py-3 ">{id + 1}</td>
                      <td className="py-3 ">{emptype?.title}</td>
                      <td className="whitespace-nowrap px-6 py-2">
                        <IconButton
                          onClick={() => handleDeleteConfirmation(emptype._id)}
                        >
                          <Delete className="!text-xl" color="error" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleEditModalOpen(emptype._id)}
                        >
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

      {/* Delete Confirmation Dialog */}

      <EmpTypeModal id={id} open={open} handleClose={handleClose} />
      <EmpTypeModal
        handleClose={handleClose}
        id={id}
        open={editModalOpen}
        empTypeId={empTypeId}
      />

      <Dialog
        open={deleteConfirmation !== null}
        onClose={handleCloseConfirmation}
      >
        <DialogTitle color={"error"}>
          <Warning color="error" /> Are you sure to delete the shift?
        </DialogTitle>
        <DialogContent>
          <p>
            This action will delete the shift after deleting shift the shift
            will not retrived.
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

export default EmployementTypes;
