import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const LeaveRequisition = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  return (
    <div className="flex w-full bg-gray-50  min-h-screen justify-center py-10 px-4 gap-4">
      <div className="w-[40%] bg-white  h-10"></div>

      <div className="w-[60%]">
        <div>
          <div className="mb-2">
            <label className="text-semibold mb-2">Select Leave Date</label>
          </div>
          <Datepicker
            primaryColor={"fuchsia"}
            showShortcuts={true}
            showFooter={true}
            configs={{
              shortcuts: {
                today: "Today",
                yesterday: "Yeasterday",
                past: (period) => `last-${period} days`,
                // currentMonth: "CMText",
                // pastMonth: "PMText",
              },
              footer: {
                cancel: "Reject",
                apply: "Accept",
              },
            }}
            // classNames={"h-4"}
            value={value}
            onChange={handleValueChange}
          />
        </div>
      </div>
    </div>
  );
};

export default LeaveRequisition;
