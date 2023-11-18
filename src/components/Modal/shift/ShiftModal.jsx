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
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import moment from "moment";

const ShiftModal = ({ handleClose, open, id }) => {
  const daysOfWeek = [
    { label: "Mon", value: "Monday" },
    { label: "Tus", value: "Tuesday" },
    { label: "Wed", value: "Wednesday" },
    { label: "Thur", value: "Thursday" },
    { label: "Fri", value: "Friday" },
    { label: "Sat", value: "Saturday" },
    { label: "Sun", value: "Sunday" },
  ];
  const [startDateTime, setStartDateTime] = useState(dayjs(new Date()));
  const [endDateTime, setEndDateTime] = useState(startDateTime.add(9, "hour"));
  const [validationError, setValidationError] = useState(false);
  const [workingFrom, setWorkingFrom] = useState("");
  const [shiftName, setShiftName] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [error, setError] = useState("");

  console.log(dayjs(startDateTime).format("HH:mm"));

  const handleStartDateTimeChange = (newDateTime) => {
    setStartDateTime(newDateTime);
    // Adjust end time when start time changes
    setEndDateTime(newDateTime.add(9, "hour"));
    // Reset validation error
    setValidationError(false);
    // Reset validation error
    setValidationError(false);
  };

  const mutation = useMutation((data) =>
    axios.post(`${process.env.REACT_APP_API}/route/shifts/create`, data)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        startTime: dayjs(startDateTime).format("HH:mm"),
        endTime: dayjs(endDateTime).format("HH:mm"),
        selectedDays,
        workingFrom,
        shiftName,
        organizationId: id,
      };

      // Use the mutation function from React Query
      await mutation.mutateAsync(data);

      // Reset form state
      setError("");
      setStartDateTime("");
      setEndDateTime("");
      setWorkingFrom("");
      setShiftName("");
    } catch (error) {
      console.error(error);
      setError("An error occurred while creating a new shift");
    }
  };

  const isSelected = (day) => {
    return selectedDays.includes(day);
  };

  const handleChange = (event) => {
    setWorkingFrom(event.target.value);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    p: 4,
  };

  const handleEndDateTimeChange = (newDateTime) => {
    // Check if the time difference is at least 9 hours
    const timeDifferenceInMilliseconds = newDateTime.diff(startDateTime);
    const timeDifferenceInHours = Math.abs(
      timeDifferenceInMilliseconds / (1000 * 60 * 60)
    );
    // Check if AM/PM changes
    const amPmChange = startDateTime.format("A") !== newDateTime.format("A");

    // Calculate the adjusted difference in 12-hour format
    const adjustedDifferenceInHours = amPmChange
      ? timeDifferenceInHours
      : timeDifferenceInHours % 12 || 12;

    if (adjustedDifferenceInHours >= 9) {
      setEndDateTime(newDateTime);
      // Reset validation error
      setValidationError(false);
    } else {
      // Set validation error
      setValidationError(true);
    }
  };

  const handleDaySelection = (event, newSelectedDays) => {
    setSelectedDays(newSelectedDays);
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
        className="border-none !z-10 !pt-0 !px-0 !w-[90%] lg:!w-[50%] md:!w-[60%] shadow-md outline-none rounded-md"
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
                value={workingFrom}
                onChange={handleChange}
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
            <FormControl size="small" sx={{ width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Add leave type
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                label="Add leave type"
                value={shiftName}
                onChange={(e) => setShiftName(e.target.value)}
              />
            </FormControl>
          </div>

          <div className="flex justify-between">
            <div className="space-y-2 w-[45%] ">
              <label className="text-sm" htmlFor="demo-simple-select-label">
                Enter shift start time
              </label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker"]}>
                  <MobileTimePicker
                    className="w-full"
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

            <div className="space-y-2 w-[45%]">
              <label className="text-sm" htmlFor="demo-simple-select-label">
                Enter shift end time
              </label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker"]}>
                  <MobileTimePicker
                    label=" Select End Time of Shift"
                    value={endDateTime}
                    className="w-full"
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
          </div>

          <div
            className="w-full"
            style={{ width: "100%", justifyContent: "center", gap: "2px" }}
          >
            <label className="text-sm" htmlFor="demo-simple-select-label">
              Select week days
            </label>
            <ToggleButtonGroup
              value={selectedDays}
              onChange={handleDaySelection}
              aria-label="selectedDays"
              className="mt-2 w-max space-x-5 gap-4"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {daysOfWeek.map((day) => (
                <ToggleButton
                  key={day.label}
                  value={day.value}
                  className="!rounded-full !border-[1px] !border-gray-200 !text-xs font-semibold"
                  style={{
                    width: "40px",
                    height: "40px",
                    padding: "2px",
                    backgroundColor: isSelected(day.value)
                      ? "#1976d2"
                      : "transparent",
                    color: isSelected(day.value) ? "white" : "#737d90",
                  }}
                >
                  {day.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>

          <div className="flex gap-4  mt-4 justify-end">
            <Button
              onClick={handleClose}
              // size="small"
              color="error"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              // size="small"
              variant="contained"
              color="primary"
              disabled={validationError}
            >
              submit
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ShiftModal;
