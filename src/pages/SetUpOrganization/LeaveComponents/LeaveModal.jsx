import {
  Box,
  Button,
  InputLabel,
  Modal,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { UseContext } from "../../../State/UseState/UseContext";
import { TestContext } from "../../../State/Function/Main";

const LeaveModal = ({ open, handleClose, id }) => {
  const [leaveTypes, setLeaveTypes] = useState([
    { leaveName: "Vacation", isActive: false, count: 0 },
    { leaveName: "Sick Leave", isActive: false, count: 0 },
    { leaveName: "Maternity Leave", isActive: false, count: 0 },
  ]);

  const [newLeaveType, setNewLeaveType] = useState("");
  const [newLeaveTypeEnabled, setNewLeaveTypeEnabled] = useState(false);
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
      setNewLeaveTypeEnabled(false);
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
    console.log(leaveTypes);
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
        className="border-none md:w-[40%] w-[40%] shadow-md outline-none rounded-md"
      >
        <header className="flex items-center mb-4 gap-2">
          <WorkHistoryIcon className="h-4 w-4 text-gray-700 !text-[1.7rem]" />
          <h1
            id="modal-modal-title"
            className="text-xl font-semibold leading-relaxed "
          >
            Add Leave Types
          </h1>
        </header>
        <ul className="mb-2 space-y-4">
          {leaveTypes.map((leaveType, index) => (
            <li key={index}>
              <FormControlLabel
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
                  label="Number of Leaves"
                  value={leaveType.count}
                  size="small"
                  onChange={(e) =>
                    handleLeaveCountChange(index, e.target.value)
                  }
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex gap-4 items-center">
          <div className="w-max p-2  cursor-pointer rounded-full border ring-sky-300 shadow-md">
            <AddIcon onClick={handleInput} className="!text-2xl" />
          </div>
          {isinputOpen && (
            // <TextField
            //   label="New Leave Type"
            //   fullWidth
            //   size="small"
            //   variant="outlined"
            //   value={newLeaveType}
            //   InputProps={{
            //     endAdornment: (
            //       <InputAdornment position="end">
            //         <IconButton
            //           onClick={() => console.log("hellow")}
            //           disabled={newLeaveType.length <= 0 ? true : false}
            //         >
            //           <SendIcon color="primary" />
            //         </IconButton>
            //       </InputAdornment>
            //     ),
            //   }}
            //   onChange={(e) => setNewLeaveType(e.target.value)}
            // />

            <Stack width="100%">
              <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Add leave type
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  size="small"
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
        <div className="flex gap-4 mt-4 justify-end">
          <Button
            size="small"
            onClick={handleClose}
            color="error"
            variant="contained"
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
