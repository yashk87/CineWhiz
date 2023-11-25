import { Button, Popover } from "@mui/material";
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

    setEvents((prevEvents) => [...prevEvents, newLeave]); // Preserve existing events and add the new one
    setLeaveData(newLeave);

    const selectedDates = {
      startDate: moment(start).toISOString(),
      endDate: moment(end).toISOString(),
    };

    setSelectedDateArray((prevDates) => [...prevDates, selectedDates]); // Preserve existing dates and add the new one
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

  // const handlePopoverClose = (event) => {
  //   if (anchorEl && anchorEl.contains(event.target)) {
  //     // Click inside the popover, do nothing
  //     return;
  //   }

  //   setCalendarOpen(false);
  // };

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
