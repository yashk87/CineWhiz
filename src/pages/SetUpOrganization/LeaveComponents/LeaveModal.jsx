import {
  Box,
  Button,
  InputLabel,
  Modal,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

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

const LeaveModal = ({ open, handleClose }) => {
  const [leaveTypes, setLeaveTypes] = useState([
    { name: "Vacation", enabled: false },
    { name: "Sick Leave", enabled: false },
    { name: "Maternity Leave", enabled: false },
  ]);

  const [newLeaveType, setNewLeaveType] = useState("");
  const [newLeaveTypeEnabled, setNewLeaveTypeEnabled] = useState(false);
  const [isinputOpen, setIsinputOpen] = useState(false);

  const handleInput = () => {
    setIsinputOpen(true);
  };

  const addLeaveType = () => {
    if (newLeaveType.trim() !== "") {
      setLeaveTypes([...leaveTypes, { name: newLeaveType, enabled: true }]);
      setNewLeaveType("");
      setNewLeaveTypeEnabled(false);
    }

    setIsinputOpen(false);
  };

  const handleLeaveTypeChange = (index) => {
    const updatedLeaveTypes = [...leaveTypes];
    updatedLeaveTypes[index].enabled = !updatedLeaveTypes[index].enabled;
    setLeaveTypes(updatedLeaveTypes);
  };

  const createLeave = () => {
    console.log(leaveTypes);
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
        <ul className="mb-2">
          {leaveTypes.map((leaveType, index) => (
            <li key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={leaveType.enabled}
                    onChange={() => handleLeaveTypeChange(index)}
                  />
                }
                label={leaveType.name}
              />
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
            size="medium"
            onClick={handleClose}
            color="error"
            variant="contained"
          >
            cancal
          </Button>
          <Button
            onClick={createLeave}
            size="medium"
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
