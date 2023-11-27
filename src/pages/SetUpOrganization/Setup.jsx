import AddLocationIcon from "@mui/icons-material/AddLocation";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import RuleIcon from "@mui/icons-material/Rule";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import React from "react";
import { Link, useParams } from "react-router-dom";
import LeaveModal from "./LeaveComponents/LeaveModal";
const Setup = () => {
  const { id } = useParams("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <section className="flex  bg-gray-50 min-h-screen w-full">
        <article className="py-4 px-8">
          <header>
            <h1 className="text-2xl font-semibold leading-relaxed">
              Organization Setup page
            </h1>
          </header>

          <div className="mt-6 text-gray-500">
            <h1 className="text-md font-light leading-relaxed">Setup Roles</h1>

            <Link className="w-fit h-fit flex" to={`/add-roles/${id}`}>
              <div className="w-[150px] border-b-[4px] hover:shadow-xl border-green-400 cursor-pointer p-2 flex items-center space-y-3 rounded-lg justify-center flex-col bg-white mt-4  shadow-md">
                <div className="px-4 py-1">
                  <GroupAddIcon className="!h-5 !w-5 text-gray-700 !text-[1.7rem]" />
                </div>
                <h1 className="!text-sm pb-2 text-gray-500 font-medium">
                  Create Roles
                </h1>
              </div>
            </Link>
          </div>

          <div className="mt-6 text-gray-500">
            <h1 className="text-md font-light leading-relaxed">
              Setup Leave Requisition
            </h1>
            <div className="flex gap-10">
              <div
                onClick={handleOpen}
                className="w-[150px] border-b-[4px] hover:shadow-xl border-green-400 cursor-pointer p-2 flex items-center space-y-3 rounded-lg justify-center flex-col bg-white mt-4  shadow-md"
              >
                <div className="px-4 py-1">
                  <RuleIcon className="!h-5 !w-5 text-gray-700 !text-[2.5rem]" />
                </div>
                <h1 className="!text-sm pb-2 text-gray-500 font-medium">
                  Leave Types
                </h1>
              </div>
              <LeaveModal open={open} id={id} handleClose={handleClose} />
              <Link
                className="w-fit h-fit flex"
                to={`/setup/${id}/public-holidays`}
              >
                <div className="w-[150px] border-b-[4px] hover:shadow-xl border-green-400 cursor-pointer p-2 flex items-center space-y-3 rounded-lg justify-center flex-col bg-white mt-4  shadow-md">
                  <div className="px-4 py-1">
                    <EventAvailableIcon className="!h-5 !w-5 text-gray-700 !text-[2.5rem]" />
                  </div>
                  <h1 className="!text-sm pb-2 text-gray-500 font-medium">
                    Public holiday
                  </h1>
                </div>
              </Link>
            </div>
          </div>
          <div className="mt-6 text-gray-500">
            <h1 className="text-md font-light leading-relaxed">
              Shift Allowence
            </h1>

            <Link className="w-fit h-fit flex" to={`/set-shifts/${id}`}>
              <div className="w-[150px] border-b-[4px] hover:shadow-xl border-green-400 cursor-pointer p-2 flex items-center space-y-3 rounded-lg justify-center flex-col bg-white mt-4  shadow-md">
                <div className="px-4  py-2">
                  <WorkHistoryIcon className="!h-5 !w-5 text-gray-700 !text-[2.5rem]" />
                </div>
                <h1 className="!text-sm pb-2 text-gray-500 font-medium">
                  Create Shift
                </h1>
              </div>
            </Link>
          </div>

          <div className="mt-6 text-gray-400">
            <h1 className="text-md font-light leading-relaxed">
              Setup Location
            </h1>

            <Link className="w-fit h-fit flex" to={`/setup/add-organization-locations/${id}`}>
              <div className="w-[150px] border-b-[4px] hover:shadow-xl border-green-400 cursor-pointer p-2 flex items-center space-y-3 rounded-lg justify-center flex-col bg-white mt-4  shadow-md">
                <div className="px-4  py-2">
                  <AddLocationIcon className="!h-5 !w-5 text-gray-700 !text-[2.5rem]" />
                </div>
                <h1 className="!text-sm pb-2 text-gray-400 font-medium">
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
