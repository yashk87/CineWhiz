import {
  Box,
  Button,
  InputLabel,
  Modal,
  OutlinedInput,
  Stack,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import "../../../index.css";

import SendIcon from "@mui/icons-material/Send";
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import axios from "axios";
import randomColor from "randomcolor";
import { useQuery } from "react-query";
import { TestContext } from "../../../State/Function/Main";
import { UseContext } from "../../../State/UseState/UseContext";
import { BeachAccessOutlined, PersonAddOutlined } from "@mui/icons-material";
import Setup from "../Setup";

const LeaveTypes = ({ open, handleClose, id }) => {
  const { cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];
  const [leaveTypes, setLeaveTypes] = useState([
    {
      leaveName: "Vacation Leave",
      isActive: false,
      count: 0,
    },
    {
      leaveName: "Sick Leave",
      isActive: false,
      count: 0,
    },
  ]);
  const { data: newLeaveTypes = [] } = useQuery("leaveTypes", async () => {
    const config = {
      headers: { "Content-Type": "application/json", Authorization: authToken },
    };
    const response = await axios.get(
      `${process.env.REACT_APP_API}/route/leave-types`,
      config
    );

    // const data = await response.json();
    return response.data.data || [];
  });

  // Initialize newLeaveType with the first leave type from the fetched data
  useEffect(() => {
    if (newLeaveTypes.length > 0) {
      setLeaveTypes(newLeaveTypes[0].typesOfLeave);
    }
  }, [newLeaveTypes]);
  useEffect(() => {
    setLeaveTypes((prevLeaveTypes) => {
      const updatedLeaveTypes = prevLeaveTypes?.map((leaveType) => ({
        ...leaveType,
        color: randomColor({
          seed: leaveType.leaveName,
          luminosity: "dark",
        }),
      }));
      return updatedLeaveTypes;
    });
  }, [leaveTypes.length]);

  const [newLeaveType, setNewLeaveType] = useState("");
  const [isinputOpen, setIsinputOpen] = useState(false);

  const { handleAlert } = useContext(TestContext);

  const handleInput = () => {
    if (!isinputOpen) {
      setIsinputOpen(true);
    } else {
      setIsinputOpen(false);
    }
  };

  const addLeaveType = () => {
    if (newLeaveType.trim() !== "") {
      setLeaveTypes([
        ...leaveTypes,
        { leaveName: newLeaveType, isActive: true },
      ]);
      setNewLeaveType("");
    }
    setIsinputOpen(false);
  };

  const handleLeaveTypeChange = (index) => {
    const updatedLeaveTypes = [...leaveTypes];
    updatedLeaveTypes[index].isActive = !updatedLeaveTypes[index].isActive;
    if (!updatedLeaveTypes[index].isActive) {
      updatedLeaveTypes[index].count = 0; // Reset leave count when not active
    }
    setLeaveTypes(updatedLeaveTypes);
  };

  const handleLeaveCountChange = (index, count) => {
    const updatedLeaveTypes = [...leaveTypes];
    updatedLeaveTypes[index].count = parseInt(count);
    setLeaveTypes(updatedLeaveTypes);
  };

  const createLeave = async () => {
    try {
      const createLeave = await axios.post(
        `${process.env.REACT_APP_API}/route/leave-types/create/${id}`,
        { leaveTypes: leaveTypes },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      handleClose();
      handleAlert(true, "success", createLeave.data.message);
    } catch (error) {
      console.log(error, "err");
      handleAlert(
        true,
        "error",
        error?.response?.data?.message || "Failed to sign in. Please try again."
      );
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen w-full">
      <Setup>
        <div className="SetupSection w-[80%] h-full bg-white   shadow-xl  rounded-sm">
          <div className="p-4  border-b-[.5px] flex items-center  gap-3 w-full border-gray-300">
            <div className="rounded-full bg-sky-500 h-[30px] w-[30px] flex items-center justify-center">
              <BeachAccessOutlined className="!text-lg text-white" />
            </div>
            <h1 className="!text-lg tracking-wide">Create Leave Types</h1>
          </div>

          <ul className=" flex flex-col justify-between ">
            {leaveTypes.map((leaveType, index) => (
              <li
                className="flex gap-4 justify-between  py-2 px-6 border-gray-200 border-b-[.5px]"
                key={index}
              >
                <FormControlLabel
                  size="small"
                  control={
                    <Checkbox
                      checked={leaveType.isActive}
                      onChange={() => handleLeaveTypeChange(index)}
                    />
                  }
                  label={leaveType.leaveName}
                />
                <div className="flex gap-2">
                  {leaveType.isActive && (
                    <TextField
                      type="number"
                      size="small"
                      label="Number of Leaves"
                      value={leaveType.count}
                      onChange={(e) =>
                        handleLeaveCountChange(index, e.target.value)
                      }
                    />
                  )}
                  <div
                    className="rounded-full overflow-hidden relative"
                    style={{
                      height: "40px", // adjust the size as needed
                      width: "40px",
                    }}
                  >
                    <input
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        height: "60px", // adjust the size as needed
                        width: "60px",
                        padding: "0",
                        border: "none",
                      }}
                      type="color"
                      id="favcolor"
                      value={leaveType.color}
                      onChange={(e) =>
                        handleLeaveCountChange(index, e.target.value)
                      }
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex gap-4 px-4 items-center">
            <div className="w-max p-2 my-2  cursor-pointer rounded-full border ring-sky-300 shadow-md">
              <AddIcon onClick={handleInput} className="!text-2xl" />
            </div>
            {isinputOpen && (
              <Stack width="100%" className="px-2">
                <FormControl
                  size="small"
                  sx={{ m: 1, width: "100%" }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Add leave type
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                          sx={{
                            display:
                              newLeaveType === undefined || newLeaveType === ""
                                ? "none"
                                : "block",
                          }}
                          onClick={addLeaveType}
                        >
                          <SendIcon color="primary" />
                        </IconButton>
                      </InputAdornment>
                    }
                    onChange={(e) => setNewLeaveType(e.target.value)}
                    value={newLeaveType}
                    label="Add leave type"
                  />
                </FormControl>
              </Stack>
            )}
          </div>
          <div className="flex px-4 py-4 ">
            <Button
              onClick={createLeave}
              size="small"
              variant="contained"
              color="primary"
            >
              Apply
            </Button>
          </div>
        </div>
      </Setup>
    </section>
  );
};

export default LeaveTypes;
