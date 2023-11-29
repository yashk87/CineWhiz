import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useQueryClient } from "react-query";
import { TestContext } from "../../../../State/Function/Main";
import { UseContext } from "../../../../State/UseState/UseContext";
import LeaveTypeModal from "../../../../components/Modal/LeaveTypeModal/leave-type-modal";

const LeaveTypeEditBox = ({ leaveType, index }) => {
  const { handleAlert } = useContext(TestContext);
  const { cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const handleEditType = (id) => {
    setOpen(true);
  };
  const handleDeleteTypeConfirmation = () => {
    setConfirmOpen(true);
  };
  const handleDeleteType = async (id) => {
    try {
      // Make the DELETE request using axios
      const response = await axios.delete(
        `${process.env.REACT_APP_API}/route/leave-types-details/${id}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      // Handle success
      console.log(`Leave type with ID ${id} deleted successfully`);
      console.log(`🚀 ~ response:`, response);

      // Show success alert
      handleAlert(true, "success", response.data.message);

      // Invalidate the query to refetch the data
      queryClient.invalidateQueries("leaveTypes");

      // Close the modal
      handleClose();
    } catch (error) {
      // Handle error
      console.error("Failed to delete leave type:", error);

      // Show error alert
      handleAlert(
        true,
        "error",
        error?.response?.data?.message ||
          "Failed to delete leave type. Please try again."
      );
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <li
        className="flex gap-4 flex-col  py-2 px-6 border-gray-200 border-b-[.5px]"
        key={index}
      >
        <div className="flex justify-between gap-0">
          <Typography
            variant="body2"
            className="!text-bold !text-lg"
            color="textSecondary"
          >
            {leaveType.leaveName}
          </Typography>
          {leaveType.isActive && (
            <Chip
              // disabled
              variant="contained"
              color="info"
              label={leaveType.isActive ? "Active" : "In-Active"}
            />
          )}
        </div>
        <div className="flex justify-between gap-0">
          {leaveType.isActive && (
            <div
              className={`rounded-full overflow-hidden relative`}
              style={{
                height: "40px",
                width: "40px",
                background: leaveType.color,
              }}
            ></div>
          )}
          <Typography
            variant="body2"
            className="underline !text-lg"
            color="textSecondary"
          >
            yearly leave count: {leaveType.count}
          </Typography>
          <div>
            <Button
              onClick={() => handleEditType(leaveType._id)}
              color="success"
            >
              <Edit />
            </Button>
            <Button onClick={handleDeleteTypeConfirmation} color="warning">
              <Delete />
            </Button>
          </div>
        </div>
      </li>
      <LeaveTypeModal
        Modal
        open={open}
        handleClose={handleClose}
        id={leaveType._id}
        leaveType={leaveType}
      />
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this leave type?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteType(leaveType._id)}
            color="primary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LeaveTypeEditBox;
