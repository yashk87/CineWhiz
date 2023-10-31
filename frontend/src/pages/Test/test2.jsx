import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const DateRangeCalendarValue = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  return (
    <div>
      <Datepicker
        primaryColor={"fuchsia"}
        // primaryColor="amber"
        // showShortcuts={true}
        // classNames={"h-4"}
        value={value}
        onChange={handleValueChange}
      />
    </div>
  );
};

export default DateRangeCalendarValue;
