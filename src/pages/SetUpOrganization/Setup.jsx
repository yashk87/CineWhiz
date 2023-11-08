import React from "react";

import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import RuleIcon from "@mui/icons-material/Rule";

const Setup = () => {
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

            <div className="w-[200px] border-b-[4px] hover:shadow-xl border-green-400 cursor-pointer p-4 flex items-center space-y-5 rounded-lg justify-center flex-col bg-white mt-4  shadow-md">
              <div className="px-4 py-1">
                <GroupAddIcon className="h-20 w-20 text-gray-700 !text-[2.5rem]" />
              </div>
              <h1 className="text-md pb-2 text-gray-400 font-medium">
                Create Roles
              </h1>
            </div>
          </div>

          <div className="mt-10">
            <h1 className="text-xl font-semibold leading-relaxed">
              Setup Leave Requisition
            </h1>

            <div className="flex gap-10">
              <div className="w-[200px] border-b-[4px] hover:shadow-xl border-green-400 cursor-pointer p-4 flex items-center space-y-5 rounded-lg justify-center flex-col bg-white mt-4  shadow-md">
                <div className="px-4 py-1">
                  <RuleIcon className="h-20 w-20 text-gray-700 !text-[2.5rem]" />
                </div>
                <h1 className="text-md pb-2 text-gray-400 font-medium">
                  Leave Types
                </h1>
              </div>

              <div className="w-[200px] border-b-[4px] hover:shadow-xl border-green-400 cursor-pointer p-4 flex items-center space-y-5 rounded-lg justify-center flex-col bg-white mt-4  shadow-md">
                <div className="px-4 py-1">
                  <EventAvailableIcon className="h-20 w-20 text-gray-700 !text-[2.5rem]" />
                </div>
                <h1 className="text-md pb-2 text-gray-400 font-medium">
                  Leaves for holiday
                </h1>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default Setup;
