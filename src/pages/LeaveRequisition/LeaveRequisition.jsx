import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import Divider from "@mui/material/Divider";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ErrorIcon from "@mui/icons-material/Error";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const LeaveRequisition = () => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const [leavesTypes, setleavesTypes] = useState("");

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  const handleChange = (event) => {
    setleavesTypes(event.target.value);
  };

  return (
    <>
      <header className="text-2xl pt-10 bg-gray-50 font-semibold px-6">
        Leave Request section
      </header>
      <div className="flex w-full bg-gray-50 min-h-screen justify-center py-10 px-6 gap-4">
        <div className="w-[40%] h-max py-6 px-8 bg-white shadow-lg rounded-lg ">
          <h1 className="text-xl font-semibold ">Balance for Leaves</h1>
          <div className="mt-6">
            <h1 className="text-lg font-semibold">Seek Leaves</h1>
            <h1 className="text-md mb-4">10 leaves left</h1>

            <Divider variant="fullWidth" orientation="horizontal" />
          </div>
          <div className="mt-6 text-red-700">
            <div className="text-red-700 flex gap-2 items-center">
              <ErrorIcon />
              <h1 className="text-lg font-semibold">Vacation Leaves</h1>
            </div>
            <h1 className="text-md mb-4">No leaves left</h1>

            <Divider variant="fullWidth" orientation="horizontal" />
          </div>
          <div className="mt-6">
            <h1 className="text-lg font-semibold">Maternity Leave</h1>
            <h1 className="text-md mb-4">10 leaves left</h1>

            <Divider variant="fullWidth" orientation="horizontal" />
          </div>

          <div className="mt-6">
            <h1 className="text-lg font-semibold">Total balance</h1>
            <h1 className="text-md mb-4">10 leaves left</h1>
          </div>
        </div>

        <div className="w-[60%] h-max  bg-white py-6 px-8 shadow-lg rounded-lg">
          <div className="mb-4 ">
            <h1 className="text-xl font-semibold">Leave Request Form</h1>
          </div>
          <div className="w-full ">
            <div className="mb-2">
              <p className="font-semibold mb-2">Select Leave Period</p>
            </div>

            <Datepicker
              primaryColor={"fuchsia"}
              showShortcuts={true}
              showFooter={true}
              containerClassName={
                " relative border-[.5px] border-gray-400 rounded-lg"
              }
              configs={{
                shortcuts: {
                  today: "Today",
                  yesterday: "Yeasterday",
                  past: (period) => `last-${period} days`,
                  // currentMonth: "CMText",
                  // pastMonth: "PMText",
                },
                footer: {
                  cancel: "Reject",
                  apply: "Accept",
                },
              }}
              // classNames={"h-4"}
              value={value}
              onChange={handleValueChange}
            />

            <div className="w-full my-6">
              <p className="font-semibold mb-2">Select Leaves</p>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Leave Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  size="small"
                  value={leavesTypes}
                  label="Select Leave Type"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>

            {value && (
              <>
                <p>{value.startDate}</p>
                <p>{value.endDate}</p>
              </>
            )}

            <Button variant="contained" className="font-bold font">
              Apply for leave
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveRequisition;
