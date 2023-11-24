import { Close } from "@mui/icons-material";
import { Button, Divider, IconButton, Popover } from "@mui/material";
import moment from "moment";
import { momentLocalizer } from "react-big-calendar";

import React from "react";
import { Calendar } from "react-big-calendar";

const AppDatePicker = ({
  isCalendarOpen,
  setCalendarOpen,
  anchorEl,
  appliedLeaveEvents,
  newAppliedLeaveEvents,
  handleSelectSlot,
  selectedLeave,
  handleSubmit,
  setSelectedLeave,
}) => {
  const localizer = momentLocalizer(moment);

  const handleSelectEvent = (event) => {
    console.log(`🚀 ~ event:`, event);
    setSelectedLeave(event);
    setCalendarOpen(true);
  };
  return (
    <Popover
      sx={{ height: "90vh", width: "90vw" }}
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
      <div className=" bg-white shadow-lg z-10 mt-2">
        <div className="flex justify-between py-2 items-center px-4">
          <h1 className="text-lg pl-2">Select leave time</h1>
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

      <div className="!px-4 !py-2 bg-white">
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Popover>
  );
};

export default AppDatePicker;
