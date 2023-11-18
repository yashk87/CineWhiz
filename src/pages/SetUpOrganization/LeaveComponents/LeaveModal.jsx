import {
  Box,
  Button,
  InputLabel,
  Modal,
  OutlinedInput,
  Stack,
} from "@mui/material";
import React, { useContext, useState } from "react";

import SendIcon from "@mui/icons-material/Send";
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { TestContext } from "../../../State/Function/Main";
import { UseContext } from "../../../State/UseState/UseContext";

const LeaveModal = ({ open, handleClose, id }) => {
  const [leaveTypes, setLeaveTypes] = useState([
    { leaveName: "Vacation", isActive: false, count: 0 },
    { leaveName: "Sick Leave", isActive: false, count: 0 },
    { leaveName: "Maternity Leave", isActive: false, count: 0 },
  ]);

  const [newLeaveType, setNewLeaveType] = useState("");
  const [isinputOpen, setIsinputOpen] = useState(false);
  const { cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];
  const { handleAlert } = useContext(TestContext);

  const handleInput = () => {
    setIsinputOpen(true);
  };

  const addLeaveType = () => {
    if (newLeaveType.trim() !== "") {
      setLeaveTypes([
        ...leaveTypes,
        { leaveName: newLeaveType, isActive: true },
      ]);
      setNewLeaveType("");
    }
    setIsinputOpen(false);
  };

  const handleLeaveTypeChange = (index) => {
    const updatedLeaveTypes = [...leaveTypes];
    updatedLeaveTypes[index].isActive = !updatedLeaveTypes[index].isActive;
    if (!updatedLeaveTypes[index].isActive) {
      updatedLeaveTypes[index].count = 0; // Reset leave count when not active
    }
    setLeaveTypes(updatedLeaveTypes);
  };

  const handleLeaveCountChange = (index, count) => {
    const updatedLeaveTypes = [...leaveTypes];
    updatedLeaveTypes[index].count = parseInt(count);
    setLeaveTypes(updatedLeaveTypes);
  };

  const createLeave = async () => {
    try {
      const createLeave = await axios.post(
        `${process.env.REACT_APP_API}/route/leave-types/create/${id}`,
        { leaveTypes: leaveTypes },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      handleClose();
      handleAlert(true, "success", createLeave.data.message);
    } catch (error) {
      console.log(error, "err");
      handleAlert(
        true,
        "error",
        error?.response?.data?.message || "Failed to sign in. Please try again."
      );
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        className="border-none !pt-0 !px-0 md:w-[40%] w-[40%] shadow-md outline-none rounded-md"
      >
        <div className="flex justify-between py-4 items-center  px-4">
          <h1 id="modal-modal-title" className="text-lg pl-2 font-semibold">
            Add Leave Types
          </h1>
          <IconButton onClick={handleClose}>
            <CloseIcon className="!text-[16px]" />
          </IconButton>
        </div>

        <div className="w-full">
          <Divider variant="fullWidth" orientation="horizontal" />
        </div>
        <ul className="my-2 px-8 space-y-4">
          {leaveTypes.map((leaveType, index) => (
            <li key={index}>
              <FormControlLabel
                size="small"
                control={
                  <Checkbox
                    checked={leaveType.isActive}
                    onChange={() => handleLeaveTypeChange(index)}
                  />
                }
                label={leaveType.leaveName}
              />
              {leaveType.isActive && (
                <TextField
                  type="number"
                  size="small"
                  label="Number of Leaves"
                  value={leaveType.count}
                  onChange={(e) =>
                    handleLeaveCountChange(index, e.target.value)
                  }
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex gap-4 px-8 items-center">
          <div className="w-max p-2  cursor-pointer rounded-full border ring-sky-300 shadow-md">
            <AddIcon onClick={handleInput} className="!text-2xl" />
          </div>
          {isinputOpen && (
            <Stack width="100%" className="px-8">
              <FormControl
                size="small"
                sx={{ m: 1, width: "100%" }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Add leave type
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        sx={{
                          display:
                            newLeaveType === undefined || newLeaveType === ""
                              ? "none"
                              : "block",
                        }}
                        onClick={addLeaveType}
                      >
                        <SendIcon color="primary" />
                      </IconButton>
                    </InputAdornment>
                  }
                  onChange={(e) => setNewLeaveType(e.target.value)}
                  value={newLeaveType}
                  label="Add leave type"
                />
              </FormControl>
            </Stack>
          )}
        </div>
        <div className="flex gap-4 px-8 mt-4 justify-end">
          <Button
            onClick={handleClose}
            size="small"
            color="error"
            variant="outlined"
          >
            cancal
          </Button>
          <Button
            onClick={createLeave}
            size="small"
            variant="contained"
            color="primary"
          >
            Apply
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default LeaveModal;
