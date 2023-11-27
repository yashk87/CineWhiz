import { CalendarMonth, Delete, Edit } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { differenceInDays, format } from "date-fns";
import React, { useState } from "react";

const Mapped = ({
  item,
  index,
  subtractedLeaves,
  newAppliedLeaveEvents,
  setNewAppliedLeaveEvents,
  setCalendarOpen,
}) => {
  console.log(`🚀 ~ subtractedLeaves:`, subtractedLeaves);
  const [leavesTypes, setLeavesTypes] = useState("");
  const badgeStyle = {
    "& .MuiBadge-badge": {
      color: "#d1d5db",
      backgroundColor: "white",
      border: "2px solid #d1d5db",
      transition: "color 0.3s, background-color 0.3s, border-color 0.3s",
    },
  };
  const handleChange = (event) => {
    console.log(`🚀 ~ event:`, event.target);
    console.log(`🚀 ~ event:`, subtractedLeaves);
    setLeavesTypes(event.target.value);
  };
  const removeItem = (idToRemove) => {
    const updatedAppliedLeaveEvents = newAppliedLeaveEvents.filter(
      (_, i) => i !== idToRemove
    );
    setNewAppliedLeaveEvents(updatedAppliedLeaveEvents);
  };
  return (
    <div
      key={index}
      className=" border border-gray-200 flex-col lg:flex-row group  flex gap-4 lg:items-center justify-between items-start rounded-lg hover:bg-gray-100 border-b p-2 cursor-pointer"
    >
      <div className="flex items-cente gap-4 pt-4">
        <Badge
          slotProps={{
            badge: {
              className:
                "group-hover:bg-gray-50 group-hover:text-gray-600 group-hover:border-gray-600 ",
            },
          }}
          badgeContent={
            <span>{differenceInDays(item.end, item.start)} day</span>
          }
          sx={badgeStyle}
          color="primary"
          variant="standard"
        >
          <Button
            variant="text"
            size="large"
            className="!rounded-full !h-16 !w-16 group-hover:!text-gray-500 !text-gray-300 !border-[2px] !border-gray-300 group-hover:!border-gray-500 !border-solid"
            color="info"
          >
            <CalendarMonth className=" !text-4xl" />
          </Button>
        </Badge>

        <div className="inline-grid m-auto items-center gap-2 group-hover:text-gray-500 text-gray-300 font-bold">
          <p className="text-md truncate ">
            {`Selected dates from ${format(
              new Date(item.start),
              "do 'of' MMMM"
            )} to  ${format(new Date(item.end), "do ' of' MMMM")}`}
            {``}
          </p>
        </div>
      </div>
      <div className="flex lg:w-fit lg:justify-end justify-between w-full items-center gap-2">
        <FormControl sx={{ width: 180 }} size="small" fullWidth>
          <InputLabel id="demo-simple-select-label">
            Select Leave Type
          </InputLabel>
          <Select
            required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={leavesTypes}
            label="Select Leave Type"
            onChange={handleChange}
          >
            {subtractedLeaves?.map(
              (item, index) =>
                item.isActive && (
                  <MenuItem id={index} key={index} value={item._id}>
                    <div className="flex justify-between w-full">
                      <div>{item.leaveName} </div>
                      <Avatar
                        sx={{
                          bgcolor: item.color,
                          width: 24,
                          height: 24,
                          fontSize: 16,
                        }}
                        alt={`${item.leaveName}`}
                        src="/broken-image.jpg"
                      ></Avatar>
                    </div>
                  </MenuItem>
                )
            )}
          </Select>
        </FormControl>
        <Button
          type="button"
          onClick={() => setCalendarOpen(true)}
          variant="outlined"
          className="!border-gray-300 group-hover:!border-gray-400"
        >
          <Edit className="text-gray-300 group-hover:text-gray-500" />
        </Button>
        <Button
          type="button"
          className="!border-gray-300 group-hover:!border-gray-400"
          onClick={() => removeItem(index)}
          variant="outlined"
        >
          <Delete className="text-gray-300 group-hover:text-red-500" />
        </Button>
      </div>
    </div>
  );
};

export default Mapped;
