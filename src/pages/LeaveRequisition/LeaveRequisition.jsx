import { CalendarMonth } from "@mui/icons-material";
import WestIcon from "@mui/icons-material/West";
import { Badge, Button } from "@mui/material";
import moment from "moment";
import React, { useContext, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { TestContext } from "../../State/Function/Main";
import { UseContext } from "../../State/UseState/UseContext";
import AppDatePicker from "../../components/date-picker/date-picker";
import LeaveTabel from "./components/LeaveTabel";
import Mapped from "./components/mapped-form";

// Set up the localizer for moment.js

const LeaveRequisition = () => {
  const { cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];
  const { handleAlert } = useContext(TestContext);
  const [vactionList, setVactionList] = useState([]);
  const [age, setAge] = React.useState("");
  const [subtractedLeaves, setSubtractedLeaves] = useState([]);
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  console.log(`🚀 ~ selectedLeave:`, selectedLeave);
  const [anchorEl, setAnchorEl] = useState(null);
  const [appliedLeaveEvents, setAppliedLeaveEvents] = useState([]);
  const [newAppliedLeaveEvents, setNewAppliedLeaveEvents] = useState([]);

  const handleInputChange = () => {
    setCalendarOpen(true);
    setSelectedLeave(null);
  };

  const handleSelectSlot = ({ start, end }) => {
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
        start,
        end,
        color: "blue",
      };

      setNewAppliedLeaveEvents((prevEvents) => [...prevEvents, newLeave]);
    }
  };

  const handleSubmit = async (e) => {
    e.prevetDefault();
    console.log(`🚀 ~ e:`, e);

    setCalendarOpen(false);

    setCalendarOpen(false);
    setAnchorEl("");

    // try {
    //   const data = await axios.post(
    //     `${process.env.REACT_APP_API}/route/leave/create`,
    //     {
    //       daysOfLeave: newAppliedLeaveEvents.map(
    //         ({ title, ...rest }) => rest
    //       ),
    //       leaveTypeId: leavesTypes._id,
    //       description: leavesTypes.leaveName,
    //     },
    //     {
    //       headers: {
    //         Authorization: authToken,
    //       },
    //     }
    //   );

    //   if (!data.data.success) {
    //     handleAlert(true, "warning", "You have already selected this leave");
    //   }

    //   if (data.data.success) {
    //     handleAlert(
    //       true,
    //       "success",
    //       data.data.message || "Leave generated successfully."
    //     );
    //     setLeavesTypes("");
    //     setNewAppliedLeaveEvents([]);
    //   }
    // } catch (error) {
    //   handleAlert(
    //     true,
    //     "error",
    //     error?.response?.data?.message || "Server Error, please try later."
    //   );
    // }
  };

  return (
    <>
      <section className="min-h-screen">
        <header className="text-xl pt-6 bg-gray-50 shadow-md font-semibold p-4">
          <Link to={"/"}>
            <WestIcon className="mx-4 !text-xl" />
          </Link>
          Leave Request section
        </header>

        <div className="flex flex-col-reverse md:flex-row w-full justify-start p-6 gap-4">
          <LeaveTabel
            subtractedLeaves={subtractedLeaves}
            setSubtractedLeaves={setSubtractedLeaves}
            authToken={authToken}
            vactionList={vactionList}
            setVactionList={setVactionList}
            setAppliedLeaveEvents={setAppliedLeaveEvents}
            newAppliedLeaveEvents={appliedLeaveEvents}
          />

          <article className="md:w-[100%] space-y-2">
            <div className="space-y-2 mb-4 w-full h-max bg-white p-4 shadow-xl rounded-lg ">
              <div className="flex items-center gap-8 px-2">
                <Badge
                  badgeContent={"Click"}
                  color="primary"
                  variant="standard"
                >
                  <Button
                    onClick={handleInputChange}
                    variant="contained"
                    size="large"
                    className="!rounded-full !h-16 !w-16 group-hover:!text-white !text-black"
                    color="info"
                  >
                    <CalendarMonth className=" !text-4xl" />
                  </Button>
                </Badge>
                <p className="!text-gray-400 font-semibold mb-2 text-xl">
                  Select Leaves Dates
                </p>
              </div>
            </div>

            <AppDatePicker
              isCalendarOpen={isCalendarOpen}
              setCalendarOpen={setCalendarOpen}
              anchorEl={anchorEl}
              appliedLeaveEvents={appliedLeaveEvents}
              newAppliedLeaveEvents={newAppliedLeaveEvents}
              handleSelectSlot={handleSelectSlot}
              selectedLeave={selectedLeave}
              setSelectedLeave={setSelectedLeave}
            />

            {newAppliedLeaveEvents.length > 0 &&
            Array.isArray(newAppliedLeaveEvents) ? (
              <>
                <form
                  onSubmit={handleSubmit}
                  className="h-max !mt-4 space-y-2 bg-white py-3 px-8 shadow-lg rounded-lg"
                >
                  <h1 className="text-gray-400 font-semibold mb-4 text-md">
                    Selected Leave's
                  </h1>
                  {newAppliedLeaveEvents?.map((item, index) => (
                    <Mapped
                      subtractedLeaves={subtractedLeaves}
                      item={item}
                      index={index}
                      newAppliedLeaveEvents={newAppliedLeaveEvents}
                      setNewAppliedLeaveEvents={setNewAppliedLeaveEvents}
                    />
                  ))}
                  <Button
                    type="submit"
                    variant="contained"
                    className="font-bold m-auto w-fit"
                  >
                    Apply for leave
                  </Button>
                </form>
              </>
            ) : (
              "Select Leaves"
            )}
          </article>
        </div>
      </section>
    </>
  );
};

export default LeaveRequisition;
