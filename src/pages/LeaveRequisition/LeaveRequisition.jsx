import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import Divider from "@mui/material/Divider";
import ErrorIcon from "@mui/icons-material/Error";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import WestIcon from "@mui/icons-material/West";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import axios from "axios";
import { UseContext } from "../../State/UseState/UseContext";
import { useContext } from "react";

import { Link } from "react-router-dom";
import LeaveTabel from "./components/LeaveTabel";
import { TestContext } from "../../State/Function/Main";

const LeaveRequisition = () => {
  const [leavesTypes, setleavesTypes] = useState([]);
  const [vactionList, setVactionList] = useState([]);

  const [value, setValue] = useState([]);
  const { cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];
  const { handleAlert } = useContext(TestContext);
  const [subtractedLeaves, setSubtractedLeaves] = useState([]);

  const handleValueChange = (newValue) => {
    const isDuplicate = value.some(
      (existingValue) =>
        existingValue.startDate === newValue.startDate ||
        existingValue.endDate === newValue.endDate
    );

    if (isDuplicate) {
      alert("You have already selected the specific time");
    }

    if (!isDuplicate) {
      setValue((prev) => [...prev, { ...newValue }]);
    }
  };

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
    const updatedData = value.filter((item) => item.startDate !== idToRemove);
    setValue(updatedData);
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

          <article className="md:w-[60%] space-y-2">
            {vactionList?.totalLeaveCount -
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
                  <div className="w-full  ">
                    <div className="mb-2 ">
                      <p className="text-gray-400 font-semibold mb-2 ">
                        Select Leave Period
                      </p>
                    </div>

                    <Datepicker
                      primaryColor={"blue"}
                      popoverDirection="down"
                      showShortcuts={true}
                      placeholder={"Dates..."}
                      showFooter={true}
                      containerClassName={
                        "relative cursor-pointer border-[.5px] border-gray-400 rounded-lg"
                      }
                      minDate={new Date()}
                      configs={{
                        shortcuts: {
                          today: "Today",
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
                </div>

                {value.length > 0 && (
                  <>
                    <div className="h-max !mt-4 space-y-2 bg-white py-3 px-8 shadow-lg rounded-lg">
                      <h1 className="text-gray-400 font-semibold mb-4 text-md">
                        Leave time
                      </h1>
                      {value.map((item, index) => (
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
                                  Start date: {item.startDate}
                                </p>
                                <Divider orientation="vertical" flexItem />
                                <p className="text-md">
                                  Ending date: {item.endDate}
                                </p>
                              </div>

                              <IconButton
                                onClick={() => removeItem(item.startDate)}
                              >
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
                  <p className="!text-gray-400 font-semibold mb-2">
                    Select Leaves
                  </p>
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
                        value.length <= 0 || leavesTypes.length === 0
                          ? true
                          : false
                      }
                      onClick={genrateLeaveRequest}
                      variant="contained"
                      className="font-bold "
                    >
                      Apply for leave
                    </Button>
                  </div>
                </div>
              </>
            )}
          </article>
        </div>
      </section>
    </>
  );
};

export default LeaveRequisition;
