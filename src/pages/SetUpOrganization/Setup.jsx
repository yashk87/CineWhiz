import React from "react";

import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import RuleIcon from "@mui/icons-material/Rule";
import { Link, useParams } from "react-router-dom";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import LeaveModal from "./LeaveComponents/LeaveModal";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import LeavePublicholidayModal from "./LeaveComponents/LeavePublicholidayModal";
const Setup = () => {
  const { id } = useParams("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openHoliday, setOpenHoliday] = React.useState(false);
  const handleHolidayOpen = () => setOpenHoliday(true);
  const handleHolidayClose = () => setOpenHoliday(false);

  return (
    <>
      <section className="flex  bg-gray-50 min-h-screen w-full">
        <article className="py-10 px-10">
          <header>
            <h1 className="text-2xl font-semibold leading-relaxed">
              Organization Setup page
            </h1>
            <p className="text-md ">Welcome Admin </p>
          </header>

          <div className="mt-10">
            <h1 className="text-xl font-semibold leading-relaxed">
              Setup Roles
            </h1>

            <Link to={`/add-roles/${id}`}>
              <div className="w-[200px] border-b-[4px] hover:shadow-xl border-green-400 cursor-pointer p-4 flex items-center space-y-5 rounded-lg justify-center flex-col bg-white mt-4  shadow-md">
                <div className="px-4  py-2">
                  <GroupAddIcon className="h-20 w-20 text-gray-700 !text-[2.5rem]" />
                </div>
                <h1 className="text-md pb-2 text-gray-400 font-medium">
                  Create Roles
                </h1>
              </div>
            </Link>
          </div>

          <div className="mt-10">
            <h1 className="text-xl font-semibold leading-relaxed">
              Setup Leave Requisition
            </h1>

            <div className="flex gap-10">
              <div
                onClick={handleOpen}
                className="w-[200px] border-b-[4px] hover:shadow-xl border-green-400 cursor-pointer p-4 flex items-center space-y-5 rounded-lg justify-center flex-col bg-white mt-4  shadow-md"
              >
                <div className="px-4 py-1">
                  <RuleIcon className="h-20 w-20 text-gray-700 !text-[2.5rem]" />
                </div>
                <h1 className="text-md pb-2 text-gray-400 font-medium">
                  Leave Types
                </h1>
              </div>

              <LeaveModal open={open} id={id} handleClose={handleClose} />

              <Link to={`/setup/${id}/public-holidays`}>
                <div
                  // onClick={handleHolidayOpen}
                  className="w-[200px] border-b-[4px] hover:shadow-xl border-green-400 cursor-pointer p-4 flex items-center space-y-5 rounded-lg justify-center flex-col bg-white mt-4  shadow-md"
                >
                  <div className="px-4 py-1">
                    <EventAvailableIcon className="h-20 w-20 text-gray-700 !text-[2.5rem]" />
                  </div>
                  <h1 className="text-md pb-2 text-gray-400 font-medium">
                    Public holiday
                  </h1>
                </div>
              </Link>
            </div>
          </div>

          {/* <LeavePublicholidayModal
            open={openHoliday}
            id={id}
            handleClose={handleHolidayClose}
          /> */}

          <div className="mt-10">
            <h1 className="text-xl font-semibold leading-relaxed">
              Shift Allowence
            </h1>

            <Link to={`/add-roles/${id}`}>
              <div className="w-[200px] border-b-[4px] hover:shadow-xl border-green-400 cursor-pointer p-4 flex items-center space-y-5 rounded-lg justify-center flex-col bg-white mt-4  shadow-md">
                <div className="px-4  py-2">
                  <WorkHistoryIcon className="h-20 w-20 text-gray-700 !text-[2.5rem]" />
                </div>
                <h1 className="text-md pb-2 text-gray-400 font-medium">
                  Create Shift
                </h1>
              </div>
            </Link>
          </div>

          <div className="mt-10">
            <h1 className="text-xl font-semibold leading-relaxed">
              Setup Location
            </h1>

            <Link to={`/add-roles/${id}`}>
              <div className="w-[200px] border-b-[4px] hover:shadow-xl border-green-400 cursor-pointer p-4 flex items-center space-y-5 rounded-lg justify-center flex-col bg-white mt-4  shadow-md">
                <div className="px-4  py-2">
                  <AddLocationIcon className="h-20 w-20 text-gray-700 !text-[2.5rem]" />
                </div>
                <h1 className="text-md pb-2 text-gray-400 font-medium">
                  Add Location
                </h1>
              </div>
            </Link>
          </div>
        </article>
      </section>
    </>
  );
};

export default Setup;
