import { Close } from "@mui/icons-material";
import { Button, MenuItem, Popover, Select } from "@mui/material";
import moment from "moment";
import { momentLocalizer } from "react-big-calendar";

import React, { useContext, useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";
import { TestContext } from "../../State/Function/Main";

const AppDatePicker = ({
  isCalendarOpen,
  setCalendarOpen,
  anchorEl,
  appliedLeaveEvents,
  newAppliedLeaveEvents,
  selectedLeave,
  setSelectedLeave,
  setAppliedLeaveEvents,
  setNewAppliedLeaveEvents,
}) => {
  const localizer = momentLocalizer(moment);
  const [selectEvent, setselectEvent] = useState(false);
  const [clickedAway, setClickedAway] = useState(false);
  const [Delete, setDelete] = useState(false);
  const [update, setUpdate] = useState(false);
  const { handleAlert } = useContext(TestContext);
  const handleSelectEvent = (event) => {
    setSelectedLeave(event);
    setCalendarOpen(true);
    if (event.title === "Selected Leave") {
      setDelete(true);
      setUpdate(false);
    } else {
      setDelete(false);
      setUpdate(true);
    }
  };

  const handleSelectSlot = ({ start, end }) => {
    console.log(`🚀 ~  start, end :`, start, end);
    setDelete(false);
    setUpdate(false);
    const selectedStartDate = moment(start);
    const selectedEndDate = moment(end);

    const isOverlap = [...appliedLeaveEvents, ...newAppliedLeaveEvents].some(
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
        start: new Date(start).toISOString(),
        end: new Date(end).toISOString(),
        color: "blue",
        leaveTypeDetailsId: "",
      };
      console.log(`🚀 ~ newLeave:`, newLeave);
      console.log(
        `🚀 ~ newLeave.new Date(start):`,
        new Date(start).toISOString()
      );

      setNewAppliedLeaveEvents((prevEvents) => [...prevEvents, newLeave]);
    }
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
  const handleClickAway = (event) => {
    const clickableElements = document.querySelectorAll(`.rbc-event-content`);

    if (
      !Array.from(clickableElements).some((element) =>
        element.contains(event.target)
      )
    ) {
      setClickedAway(true);
    } else {
      setClickedAway(false);
    }
  };
  const handleDelete = (e) => {
    if (selectedLeave.title === "Selected Leave") {
      setNewAppliedLeaveEvents((prev) =>
        prev.filter((data) => {
          // Check if the current leave matches the leave to be removed
          return !(
            data.title === selectedLeave.title &&
            data.start === selectedLeave.start &&
            data.end === selectedLeave.end
          );
        })
      );
    } else {
    }
  };
  useEffect(() => {
    // Add click event listener when component mounts
    document.addEventListener("click", handleClickAway);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickAway);
    };
  }, []);
  return (
    <Popover
      PaperProps={{ className: "w-full md:w-[70vw] xl:w-[60vw]" }}
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
        <div className="w-full">
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
        <Button
          variant="contained"
          onClick={handleDelete}
          className="rbc-event-content"
          disabled={!Delete}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          className="rbc-event-content"
          disabled={!update}
        >
          Update
        </Button>
      </div>
    </Popover>
  );
};

export default AppDatePicker;
