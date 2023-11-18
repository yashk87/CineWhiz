import moment from "moment";
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS

// Set up the localizer for moment.js
const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);

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
    setSelectedLeave(newLeave);

    // Close the calendar after selection
    setCalendarOpen(false);
  };

  const handleSelectEvent = (event) => {
    // Handle selection of an existing event in the calendar
    setSelectedLeave(event);

    // Set the selected leave in the input bar
    setLeaveData(event);

    // Open the calendar on event click
    setCalendarOpen(true);
  };

  const formatLeaveRange = (start, end) => {
    const startFormatted = moment(start).format("MMMM Do, YYYY");
    const endFormatted = moment(end).format("MMMM Do, YYYY");
    return `${startFormatted} to ${endFormatted}`;
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
              ? formatLeaveRange(selectedLeave.start, selectedLeave.end)
              : "Select your dates"
          }
          onClick={handleInputChange}
          readOnly
          className="border rounded px-2 py-1"
        />
        {isCalendarOpen && (
          <div className="absolute z-10 mt-2">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "300px" }}
              selectable
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleSelectEvent}
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: event.color,
                },
              })}
            />
          </div>
        )}
      </div>
      {selectedLeave && (
        <div>
          <h2>Selected Leave Details:</h2>
          <p>Title: {selectedLeave.title}</p>
          <p>
            Leave Range:{" "}
            {formatLeaveRange(selectedLeave.start, selectedLeave.end)}
          </p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default MyCalendar;
