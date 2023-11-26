import { Close } from "@mui/icons-material";
import { Button, MenuItem, Popover, Select } from "@mui/material";
import moment from "moment";
import { momentLocalizer } from "react-big-calendar";

import React, { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";

const AppDatePicker = ({
  isCalendarOpen,
  setCalendarOpen,
  anchorEl,
  appliedLeaveEvents,
  newAppliedLeaveEvents,
  handleSelectSlot,
  selectedLeave,
  setSelectedLeave,
}) => {
  console.log(`🚀 ~ selectedLeave:`, !!selectedLeave);
  const localizer = momentLocalizer(moment);
  const [selectEvent, setselectEvent] = useState(false);
  const handleSelectEvent = (event) => {
    console.log(`🚀 ~ event:`, event);
    setSelectedLeave(event);
    setCalendarOpen(true);
    setselectEvent(true);
  };

  const CustomToolbar = (toolbar) => {
    const handleMonthChange = (event) => {
      const newDate = moment(toolbar.date).month(event.target.value).toDate();
      toolbar.onNavigate("current", newDate);
    };

    const handleYearChange = (event) => {
      const newDate = moment(toolbar.date).year(event.target.value).toDate();
      toolbar.onNavigate("current", newDate);
    };

    return (
      <div className="flex-row-reverse flex gap-4 items-center">
        <Button
          // variant="outlined"
          color="error"
          className="!h-full hover:!bg-[#da4f4f] hover:!text-white"
          size="small"
          onClick={() => setCalendarOpen(false)}
        >
          <Close />
        </Button>
        <Select
          className="m-2"
          size="small"
          value={moment(toolbar.date).month()}
          onChange={handleMonthChange}
        >
          {moment.months().map((month, index) => (
            <MenuItem key={index} value={index}>
              {month}
            </MenuItem>
          ))}
        </Select>
        <Select
          className="m-2"
          size="small"
          value={moment(toolbar.date).year()}
          onChange={handleYearChange}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <MenuItem key={index} value={moment(toolbar.date).year() + index}>
              {moment(toolbar.date).year() + index}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  };
  useEffect(() => {
    const handleWindowClick = () => {
      setSelectedLeave(null); // Clear the selected event
      setselectEvent(false); // Disable the buttons
    };

    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []); // Empty dependency array to run the effect once on mount

  return (
    <Popover
      PaperProps={{ className: "w-[90vw] h-[90vh]" }}
      open={isCalendarOpen}
      anchorEl={anchorEl}
      onClose={() => setCalendarOpen(false)}
      components={{
        toolbar: CustomToolbar,
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      <div className=" bg-white shadow-lg z-10">
        <div className=" w-full">
          <Calendar
            localizer={localizer}
            views={["month"]}
            components={{
              toolbar: CustomToolbar,
            }}
            events={[...appliedLeaveEvents, ...newAppliedLeaveEvents]}
            startAccessor="start"
            endAccessor="end"
            style={{
              height: "600px",
              width: "100%",
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

      <div className="!px-4 !py-2 bg-white flex justify-between">
        <Button variant="contained">Submit</Button>
        <Button variant="contained" disabled={!selectEvent}>
          Delete
        </Button>
        <Button variant="contained" disabled={!selectEvent}>
          Update
        </Button>
      </div>
    </Popover>
  );
};

export default AppDatePicker;
