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
  Popover,
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
  const [leavesTypes, setLeavesTypes] = useState([]);
  const [vactionList, setVactionList] = useState([]);
  // const [value, setValue] = useState([]);
  const { cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];
  const { handleAlert } = useContext(TestContext);
  const [subtractedLeaves, setSubtractedLeaves] = useState([]);

  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState([]);
  // const [selectedDateArray, setSelectedDateArray] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const [appliedLeaveEvents, setAppliedLeaveEvents] = useState([]);
  // console.log(`🚀 ~ appliedLeaveEvents:`, appliedLeaveEvents);
  const [newAppliedLeaveEvents, setNewAppliedLeaveEvents] = useState([]);

  // const handleSubmit = () => {
  //   setCalendarOpen(false);
  //   setAnchorEl("");
  // };

  const handleInputChange = () => {
    setCalendarOpen(true);
  };

  const handleSelectSlot = ({ start, end }) => {
    const selectedStartDate = moment(start);
    const selectedEndDate = moment(end);

    const isOverlap = appliedLeaveEvents.some(
      (event) =>
        (selectedStartDate.isSameOrAfter(moment(event.start)) &&
          selectedStartDate.isBefore(moment(event.end))) ||
        (selectedEndDate.isAfter(moment(event.start)) &&
          selectedEndDate.isSameOrBefore(moment(event.end))) ||
        (selectedStartDate.isBefore(moment(event.start)) &&
          selectedEndDate.isAfter(moment(event.end)))
    );

    if (isOverlap) {
      handleAlert(true, "warning", "You have already selected this leave");
    } else {
      const newLeave = {
        title: "Selected Leave",
        start,
        end: end,
        color: "blue",
      };

      // console.log(end, "new");

      // setSelectedDateArray((prevDates) => [...prevDates, newLeave]);
      setNewAppliedLeaveEvents((prevEvents) => [...prevEvents, newLeave]);
      // setLeaveData(newLeave);
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedLeave(event);
    // setLeaveData(event);
    setCalendarOpen(true);
  };

  const genrateLeaveRequest = async () => {
    try {
      const daysOfLeave = newAppliedLeaveEvents.map(({ title, ...rest }) => {
        return rest;
      });

      console.log(daysOfLeave, "day");
      const data = await axios.post(
        `${process.env.REACT_APP_API}/route/leave/create`,
        {
          daysOfLeave,
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
        handleAlert(true, "warning", "You have already selected this leave");
        // setValue([]);
      }

      if (data.data.success) {
        handleAlert(
          true,
          "success",
          data.data.message || "Leave generated successfully."
        );
        // setValue([]);
        setLeavesTypes("");
      }
    } catch (error) {
      console.log(error, "err");
      handleAlert(
        true,
        "error",
        error?.response?.data?.message || "Server Error, please try later."
      );
    }
  };

  const removeItem = (idToRemove) => {
    const updatedAppliedLeaveEvents = newAppliedLeaveEvents.filter(
      (item, i) => {
        console.log(`🚀 ~ item, idToRemove:`, i, idToRemove);
        return i !== idToRemove;
      }
    );
    console.log(`🚀 ~ updatedAppliedLeaveEvents:`, updatedAppliedLeaveEvents);
    setNewAppliedLeaveEvents(updatedAppliedLeaveEvents);
  };

  const handleChange = (event) => {
    setLeavesTypes(event.target.value);
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
            setNewAppliedLeaveEvents={setAppliedLeaveEvents}
            newAppliedLeaveEvents={appliedLeaveEvents}
          />

          <article className=" md:w-[60%]  space-y-2">
            <div className="space-y-2 mb-4 w-full  h-max !mt-4 bg-white py-3 px-8 shadow-lg rounded-lg ">
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
                  value={""}
                  onClick={handleInputChange}
                  className="!cursor-pointer"
                  label="Select leave date"
                />
              </FormControl>
            </div>

            <Popover
              open={isCalendarOpen}
              anchorEl={anchorEl}
              onClose={() => setCalendarOpen(false)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "center",
                horizontal: "center",
              }}
            >
              <div className=" bg-white shadow-lg  z-10 mt-2">
                <div className="flex justify-between py-2  items-center  px-4">
                  <h1 className="text-lg pl-2 ">Select leave time</h1>
                  <IconButton onClick={() => setCalendarOpen(false)}>
                    <Close />
                  </IconButton>
                </div>

                <div className="w-full mb-2">
                  <Divider variant="fullWidth" orientation="horizontal" />
                </div>

                <div className="p-4 w-full">
                  <Calendar
                    localizer={localizer}
                    views={["month"]}
                    events={[...appliedLeaveEvents, ...newAppliedLeaveEvents]}
                    startAccessor="start"
                    endAccessor="end"
                    style={{
                      height: "300px",
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

              {/* <div className="!px-4 !py-2 bg-white">
                <Button variant="contained" onClick={handleSubmit}>
                  Submit
                </Button>
              </div> */}
            </Popover>

            {newAppliedLeaveEvents.length > 0 &&
              Array.isArray(newAppliedLeaveEvents) && (
                <>
                  <div className="h-max !mt-4 space-y-2 bg-white py-3 px-8 shadow-lg rounded-lg">
                    <h1 className="text-gray-400 font-semibold mb-4 text-md">
                      Leave time
                    </h1>
                    {newAppliedLeaveEvents?.map((item, index) => {
                      return (
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
                                  Start date:{" "}
                                  {format(new Date(item.start), "PPp")}
                                </p>
                                <Divider orientation="vertical" flexItem />
                                <p className="text-md">
                                  Ending date:{" "}
                                  {format(new Date(item.end), "PPp")}
                                </p>
                              </div>

                              <IconButton onClick={() => removeItem(index)}>
                                <DeleteIcon className="!h-5" color="error" />
                              </IconButton>
                            </div>
                          </div>

                          <div className="w-full h-max">
                            <Divider />
                          </div>
                        </>
                      );
                    })}
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
                      item.subtractedCount > 0 && (
                        <MenuItem id={index} value={item}>
                          {item.leaveName}
                        </MenuItem>
                      )
                  )}
                </Select>
              </FormControl>

              <div className=" mt-4">
                <Button
                  // disabled={
                  //   value.length <= 0 || newAppliedLeaveEvents?.length === 0
                  //     ? true
                  //     : false
                  // }
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
