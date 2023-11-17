import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
} from "@mui/material";
import { MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";
import React, { useState } from "react";

const ShiftModal = ({ handleClose, open }) => {
  const [startDateTime, setStartDateTime] = useState(dayjs(new Date()));
  const [endDateTime, setEndDateTime] = useState(startDateTime.add(9, "hour"));
  const [validationError, setValidationError] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    p: 4,
  };

  const handleStartDateTimeChange = (newDateTime) => {
    setStartDateTime(newDateTime);
    // Adjust end time when start time changes
    setEndDateTime(newDateTime.add(9, "hour"));
    // Reset validation error
    setValidationError(false);
  };

  const handleEndDateTimeChange = (newDateTime) => {
    // Check if the time difference is at least 9 hours
    const timeDifference = newDateTime.diff(startDateTime, "hour");

    if (timeDifference >= 9) {
      setEndDateTime(newDateTime);
      // Reset validation error
      setValidationError(false);
    } else {
      // Set validation error
      setValidationError(true);
    }
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
        className="border-none !z-10 !pt-0 !px-0 md:w-[40%] w-[40%] shadow-md outline-none rounded-md"
      >
        <div className="flex justify-between py-4 items-center  px-4">
          <h1 id="modal-modal-title" className="text-lg pl-2 font-semibold">
            Create a shift
          </h1>
          <IconButton onClick={handleClose}>
            <CloseIcon className="!text-[16px]" />
          </IconButton>
        </div>

        <div className="w-full">
          <Divider variant="fullWidth" orientation="horizontal" />
        </div>

        <div className="px-5 space-y-4 mt-4">
          <div className="space-y-2 ">
            <label className="text-sm" htmlFor="demo-simple-select-label">
              Select shift type
            </label>
            <FormControl size="small" fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Leave Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select Leave Type"
              >
                <MenuItem value={"remote"}>Remote</MenuItem>
                <MenuItem value={"office"}>Office</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="space-y-2 ">
            <label className="text-sm" htmlFor="demo-simple-select-label">
              Enter shift name
            </label>
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
                label="Add leave type"
              />
            </FormControl>
          </div>

          <div className="space-y-2 ">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker"]}>
                <MobileTimePicker
                  label=" Select Start Time of Shift"
                  value={startDateTime}
                  onChange={handleStartDateTimeChange}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <div className="space-y-2 ">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker"]}>
                <MobileTimePicker
                  label=" Select End Time of Shift"
                  value={endDateTime}
                  onChange={handleEndDateTimeChange}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                />
              </DemoContainer>
              {validationError && (
                <div className="text-red-500">
                  Minimum time difference of 9 hours required
                </div>
              )}
            </LocalizationProvider>
          </div>
          <div className="flex gap-4  mt-4 justify-end">
            <Button
              onClick={handleClose}
              size="small"
              color="error"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              // onClick={createLeave}
              size="small"
              variant="contained"
              color="primary"
              disabled={validationError}
            >
              Apply
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ShiftModal;
