import { Button, MenuItem, Popover, Select } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS

// Set up the localizer for moment.js
const localizer = momentLocalizer(moment);
console.log(`🚀 ~ localizer:`, localizer);

const MyCalendar = () => {
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [events, setEvents] = useState([
    {
      title: "Maternity Leave",
      start: new Date(2023, 10, 15), // November is 10 (zero-based month)
      end: new Date(2023, 10, 17),
      color: "pink", // Set initial color to blue
    },
    // Add more previously added events
  ]);
  const [leaveData, setLeaveData] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
    color: "pink", // Default color for new selections
  });
  console.log(`🚀 ~ leaveData:`, leaveData);

  const [selectedDateArray, setSelectedDateArray] = useState([]);

  const handleSelectSlot = ({ start, end }) => {
    const newLeave = {
      title: "Selected Leave",
      start,
      end,
      color: "blue", // Adjust the color as needed
    };

    // Create an object to update leaveData with the newLeave information
    const newLeaveData = {};
    let currentDate = moment(start);
    while (currentDate.isSameOrBefore(end, "day")) {
      const dateKey = currentDate.format("YYYY-MM-DD");
      newLeaveData[dateKey] = {
        color: newLeave.color,
      };
      currentDate.add(1, "day");
    }

    // Update the leaveData state
    setLeaveData((prevLeaveData) => ({
      ...prevLeaveData,
      ...newLeaveData,
    }));

    setEvents((prevEvents) => [...prevEvents, newLeave]);
    setSelectedDateArray((prevDates) => [
      ...prevDates,
      {
        startDate: moment(start).toISOString(),
        endDate: moment(end).toISOString(),
      },
    ]);
  };

  const handleSelectEvent = (event) => {
    console.log(`🚀 ~ event:`, event);
    setSelectedLeave(event);
    setLeaveData(event);
    setCalendarOpen(true);
  };

  const handleSubmit = () => {
    // Handle the submission logic as needed
    setCalendarOpen(false);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setCalendarOpen(true);
  };

  const CustomToolbar = (toolbar) => {
    // const goToBack = () => {
    //   const newDate = moment(toolbar.date).subtract(1, "month").toDate();
    //   toolbar.onNavigate("prev", newDate);
    // };

    // const goToNext = () => {
    //   const newDate = moment(toolbar.date).add(1, "month").toDate();
    //   toolbar.onNavigate("next", newDate);
    // };

    const handleMonthChange = (event) => {
      const newDate = moment(toolbar.date).month(event.target.value).toDate();
      toolbar.onNavigate("current", newDate);
    };

    const handleYearChange = (event) => {
      const newDate = moment(toolbar.date).year(event.target.value).toDate();
      toolbar.onNavigate("current", newDate);
    };

    return (
      <div className="flex justify-center items-center">
        <Select
          value={moment(toolbar.date).month()}
          onChange={handleMonthChange}
        >
          {moment.months().map((month, index) => (
            <MenuItem key={index} value={index}>
              {month}
            </MenuItem>
          ))}
        </Select>
        <Select value={moment(toolbar.date).year()} onChange={handleYearChange}>
          {Array.from({ length: 10 }).map((_, index) => (
            <MenuItem key={index} value={moment(toolbar.date).year() + index}>
              {moment(toolbar.date).year() + index}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  };
  const slotPropGetter = (date) => {
    // Example: Set a different background color for specific dates
    const dateKey = moment(date).format("YYYY-MM-DD");
    const colorMap = {
      "2023-11-15": "green", // Change this date to the one you want to have a different color
    };

    return {
      style: {
        backgroundColor: colorMap[dateKey] || "transparent",
      },
    };
  };

  return (
    <div className="relative">
      <h1>Leave Calendar</h1>
      <div className="mb-4 relative">
        <label htmlFor="title">Leave Type: </label>
        <input
          type="text"
          id="title"
          name="title"
          value={
            selectedLeave
              ? `${moment(selectedLeave.start).format(
                  "MMMM Do, YYYY"
                )} to ${moment(selectedLeave.end).format("MMMM Do, YYYY")}`
              : "Select your dates"
          }
          onMouseDown={handlePopoverOpen}
          readOnly
          className="border rounded px-2 py-1"
        />

        <Popover
          open={isCalendarOpen}
          anchorEl={anchorEl}
          onClose={() => setCalendarOpen(false)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <form className="z-10 mt-2 flex items-center gap-4 flex-col border shadow-lg bg-slate-100 p-4">
            <Calendar
              localizer={localizer}
              components={{
                toolbar: CustomToolbar,
              }}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "300px" }}
              selectable
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleSelectEvent}
              views={["month"]}
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: event.color,
                },
              })}
              slotPropGetter={slotPropGetter}
            />
            <Button size="small" variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </form>
        </Popover>
      </div>
      {selectedLeave && (
        <div>
          <h2>Selected Leave Details:</h2>
          <p>Title: {selectedLeave.title}</p>
          <p>
            Leave Range: {moment(selectedLeave.start).format("MMMM Do, YYYY")}{" "}
            to {moment(selectedLeave.end).format("MMMM Do, YYYY")}
          </p>
          <p>Selected Dates: {JSON.stringify(selectedDateArray)}</p>
        </div>
      )}
    </div>
  );
};

export default MyCalendar;
