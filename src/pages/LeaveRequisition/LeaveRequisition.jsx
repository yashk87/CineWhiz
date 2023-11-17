import moment from "moment";
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DeleteIcon from "@mui/icons-material/Delete";
import WestIcon from "@mui/icons-material/West";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { useContext } from "react";
import { UseContext } from "../../State/UseState/UseContext";

import { Close } from "@mui/icons-material";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { TestContext } from "../../State/Function/Main";
import LeaveTabel from "./components/LeaveTabel";

// Set up the localizer for moment.js
const localizer = momentLocalizer(moment);

const LeaveRequisition = () => {
  const [leavesTypes, setleavesTypes] = useState([]);
  const [vactionList, setVactionList] = useState([]);

  // const dataList =
  //   Array.isArray(vactionList?.daysOfLeaveArray) &&
  //   vactionList?.daysOfLeaveArray.map((item) => console.log(item));

  const [value, setValue] = useState([]);
  const { cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];
  const { handleAlert } = useContext(TestContext);
  const [subtractedLeaves, setSubtractedLeaves] = useState([]);

  /* ----------------------------- Leave Calender ----------------------------- */

  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState([]);

  // console.log(selectedLeave, "se");

  const [events, setEvents] = useState([
    {
      title: "Maternity Leave",
      start: new Date(2023, 10, 15), // November is 10 (zero-based month)
      end: new Date(2023, 10, 17),
      color: "pink",
    },
    // Add more previously added events
  ]);

  const [leaveData, setLeaveData] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
    color: "pink", // Default color for maternity leave
  });
  console.log(`🚀 ~ leaveData:`, leaveData);

  const handleInputChange = () => {
    // Open the calendar on input bar click
    setCalendarOpen(true);
  };

  const handleSelectSlot = ({ start, end }) => {
    // Handle selection of the time slot in the calendar
    const newLeave = {
      title: "Selected Leave",
      start,
      end,
      color: "blue", // Adjust the color as needed
    };

    // Update the events array with the selected leave
    setEvents((prevEvents) => [...prevEvents, newLeave]);
    // Set the selected leave in the input bar
    setLeaveData(newLeave);
    // Set the selected leave to trigger rendering in the input bar
    setSelectedLeave((pre) => [newLeave, ...pre]);
    // Close the calendar after selection
    setCalendarOpen(false);
  };

  const isDateDisabled = (date) =>
    selectedLeave.some((disabledDate) =>
      moment(disabledDate).isSame(date, "start")
    );

  const handleSelectEvent = (event) => {
    // Assuming 'start' is a property of the 'event' object
    const start = event.start;

    if (isDateDisabled(start)) {
      // Show an alert or perform other actions for disabled dates
      alert("This date is disabled and cannot be selected!");
      return false;
    }
    // Handle selection of an existing event in the calendar
    setSelectedLeave((pre) => [event, ...pre]);
    // Set the selected leave in the input bar
    setLeaveData(event);
    // Open the calendar on event click
    setCalendarOpen(true);
  };

  // const formatLeaveRange = (start, end) => {
  //   const startFormatted = moment(start).format("MMMM Do, YYYY");
  //   const endFormatted = moment(end).format("MMMM Do, YYYY");
  //   return `${startFormatted} to ${endFormatted}`;
  // };

  /* ----------------------------- Leave Calender ----------------------------- */

  // const handleValueChange = (newValue) => {
  //   const isDuplicate = value.some(
  //     (existingValue) =>
  //       existingValue.startDate === newValue.startDate ||
  //       existingValue.endDate === newValue.endDate
  //   );

  //   if (isDuplicate) {
  //     alert("You have already selected the specific time");
  //   }

  //   if (!isDuplicate) {
  //     setValue((prev) => [...prev, { ...newValue }]);
  //   }
  // };

  const genrateLeaveRequest = async () => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_API}/route/leave/create`,
        {
          daysOfLeave: value,
          leaveTypeId: leavesTypes._id,
          description: leavesTypes.leaveName,
        },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      if (!data.data.success) {
        alert("you have alrady selected the leave");
        handleAlert(true, "warning", "you have alrady selected the leave");
        setValue([]);
      }

      if (data.data.success) {
        // alert("leave generated successfuly");
        handleAlert(
          true,
          "success",
          data.data.message || "leave generated successfuly."
        );
        setValue([]);
        setleavesTypes("");
      }
    } catch (error) {
      // alert("something went wrong");
      console.log(error, "err");
      handleAlert(
        true,
        "error",
        error?.response?.data?.message || "Server Error please try later."
      );
    }
  };

  const removeItem = (idToRemove) => {
    const updatedData = selectedLeave.filter(
      (item) => item.start !== idToRemove
    );
    setSelectedLeave(updatedData);
  };

  const handleChange = (event) => {
    setleavesTypes(event.target.value);
  };

  return (
    <>
      <section className="bg-gray-50 min-h-screen">
        <header className="text-xl pt-6 bg-gray-50 font-semibold px-6">
          <Link to={"/"}>
            <WestIcon className="mx-4 !text-xl" />
          </Link>
          Leave Request section
        </header>

        <div className="w-full bg-gray-50 shadow-md pt-6">
          <Divider variant="fullWidth" orientation="horizontal" />
        </div>
        <div className="flex flex-col-reverse md:flex-row w-full  justify-center pt-10 px-6 gap-4">
          <LeaveTabel
            subtractedLeaves={subtractedLeaves}
            setSubtractedLeaves={setSubtractedLeaves}
            authToken={authToken}
            vactionList={vactionList}
            setVactionList={setVactionList}
          />

          <article className="relative md:w-[60%] space-y-2">
            <div className="space-y-2 mb-4  h-max !mt-4 bg-white py-3 px-8 shadow-lg rounded-lg  relative">
              <p className="!text-gray-400 font-semibold mb-2">
                Select Leaves time
              </p>
              <FormControl
                size="small"
                sx={{ m: 1, width: "100%" }}
                className="!cursor-pointer"
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Select your dates
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  value={"click here to select leave time"}
                  onClick={handleInputChange}
                  className="!cursor-pointer"
                  label="Select leave date"
                />
              </FormControl>
            </div>

            {isCalendarOpen && (
              <div className="absolute bg-white shadow-lg  z-10 mt-2">
                <div className="flex justify-between py-2  items-center  px-4">
                  <h1 className="text-lg pl-2 ">Select leave time</h1>
                  <IconButton onClick={() => setCalendarOpen(false)}>
                    <Close />
                  </IconButton>
                </div>

                <div className="w-full mb-2">
                  <Divider variant="fullWidth" orientation="horizontal" />
                </div>

                <div className="p-4">
                  <Calendar
                    localizer={localizer}
                    views={["month"]}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{
                      height: "400px",
                      width: "800px",
                      background: "#fff",
                    }}
                    selectable
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                    datePropGetter={selectedLeave}
                    eventPropGetter={(event) => ({
                      style: {
                        backgroundColor: event.color,
                      },
                    })}
                  />
                </div>
              </div>
            )}

            {/* {Array.isArray(selectedLeave) && */}
            {/* selectedLeave.map((item) => ( */}
            {/* <div> */}
            {/* <h2>Selected Leave Details:</h2> */}
            {/* <p>Title: {item.title}</p> */}
            {/* <p>Leave Range: {formatLeaveRange(item.start, item.end)}</p> */}
            {/* Add more details as needed */}
            {/* </div>                ))} */}

            {/* {vactionList?.totalLeaveCount -
              vactionList?.totalEmployeeLeaveCount <=
            0 ? (
              <div className="h-max text-red-600 !text-2xl flex items-center gap-4 bg-white py-6 px-8 shadow-lg rounded-lg">
                <ErrorIcon className="!text-3xl" />
                <h1 className="font-semibold">No leaves left</h1>
              </div>
            ) : (
              <>
                <div className="h-max  bg-white py-6 px-8 shadow-lg rounded-lg">
                  <div className="mb-4 ">
                    <h1 className="text-xl font-semibold">
                      Leave Request Form
                    </h1>
                  </div>
                  <div className="w-full  datePicker-tailwind-css">
                    <div className="mb-2 ">
                      <p className="text-gray-400 font-semibold mb-2">
                        Select Leave Period
                      </p>
                    </div>

                    <Datepicker
                      primaryColor={"blue"}
                      popoverDirection="down"
                      showShortcuts={true}
                      placeholder={"Dates..."}
                      disabledDates={
                        Array.isArray(vactionList.daysOfLeaveArray) &&
                        vactionList.daysOfLeaveArray.map((item) => ({
                          startDate: format(new Date(item.startDate), "PP"),
                          endDate: format(new Date(item.endDate), "PP"),
                        }))
                      }
                      showFooter={true}
                      containerClassName={
                        "relative cursor-pointer border-[.5px] border-gray-400 rounded-lg  "
                      }
                      // minDate={new Date()}
                      configs={{
                        shortcuts: {
                          // today: "Today",
                        },
                        footer: {
                          cancel: "Reject",
                          apply: "Accept",
                        },
                      }}
                      value={value}
                      onChange={handleValueChange}
                    />
                  </div>
                </div> */}

            {selectedLeave.length > 0 && Array.isArray(selectedLeave) && (
              <>
                <div className="h-max !mt-4 space-y-2 bg-white py-3 px-8 shadow-lg rounded-lg">
                  <h1 className="text-gray-400 font-semibold mb-4 text-md">
                    Leave time
                  </h1>
                  {selectedLeave?.map((item, index) => (
                    <>
                      <div
                        key={index}
                        className="h-max  flex gap-4 items-center rounded-lg"
                      >
                        <div className="p-2 rounded-full shadow-lg bg-sky-50">
                          <CalendarTodayIcon className="text-gray-400 !text-[1.2rem]" />
                        </div>

                        <div className="flex w-full justify-between">
                          <div className="flex items-center gap-2">
                            <p className="text-md">
                              Start date: {format(new Date(item.start), "PP")}
                            </p>
                            <Divider orientation="vertical" flexItem />
                            <p className="text-md">
                              Ending date: {format(new Date(item.end), "PP")}
                            </p>
                          </div>

                          <IconButton onClick={() => removeItem(item.start)}>
                            <DeleteIcon className="!h-5" color="error" />
                          </IconButton>
                        </div>
                      </div>

                      <div className="w-full h-max">
                        <Divider />
                      </div>
                    </>
                  ))}
                </div>
              </>
            )}

            <div className="h-max !mt-4 bg-white py-3 px-8 shadow-lg rounded-lg">
              <p className="!text-gray-400 font-semibold mb-2">Select Leaves</p>
              <FormControl size="small" fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Leave Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={leavesTypes}
                  label="Select Leave Type"
                  onChange={handleChange}
                >
                  {subtractedLeaves?.map(
                    (item, index) =>
                      item.isActive &&
                      item.count > 0 && (
                        <MenuItem id={index} value={item}>
                          {item.leaveName}
                        </MenuItem>
                      )
                  )}
                </Select>
              </FormControl>

              <div className=" mt-4">
                <Button
                  disabled={
                    value.length <= 0 || leavesTypes.length === 0 ? true : false
                  }
                  onClick={genrateLeaveRequest}
                  variant="contained"
                  className="font-bold"
                >
                  Apply for leave
                </Button>
              </div>
            </div>
            {/* </> */}
            {/* )} */}
          </article>
        </div>
      </section>
    </>
  );
};

export default LeaveRequisition;
