import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Skeleton } from "@mui/material";
import Divider from "@mui/material/Divider";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

const LeaveTable = ({
  authToken,
  setAppliedLeaveEvents,
  setSubtractedLeaves,
  subtractedLeaves,
}) => {
  const [total, setTotal] = useState();
  const [balanceForLeave, setBalanceForLeave] = useState([]);

  const updateLeaveCounts = (data) => {
    const updatedSubtractedLeaves = [];

    data?.leaveTypes?.forEach((orgLeaveType) => {
      const matchingLeave = data.currentYearLeaves.find(
        (leave) => leave.leaveTypeDetailsId === orgLeaveType._id
      );

      const subtractedCount = matchingLeave
        ? dayjs(matchingLeave.end).diff(dayjs(matchingLeave.start), "days")
        : orgLeaveType.count;

      orgLeaveType.count -= subtractedCount;

      updatedSubtractedLeaves.push({
        leaveName: orgLeaveType.leaveName,
        subtractedCount,
        color: orgLeaveType.color,
        isActive: orgLeaveType.isActive,
        _id: orgLeaveType._id,
      });
    });
    setBalanceForLeave(updatedSubtractedLeaves);
  };

  const { isLoading, isError } = useQuery("remainingLeaves", async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/route/leave/getEmployeeSummaryForCurrentMonth`,
      {
        headers: { Authorization: authToken },
      }
    );

    setAppliedLeaveEvents(response.data.currentYearLeaves);
    updateLeaveCounts(response.data);
    setSubtractedLeaves(response.data.leaveTypes);

    return response.data;
  });
  useEffect(() => {
    let totalC = 0;
    balanceForLeave?.map((value) => {
      return (totalC += value.subtractedCount);
    });
    setTotal(totalC);
  }, [balanceForLeave]);

  if (isLoading) {
    return (
      <article className="w-[350px] h-max py-6 bg-white shadow-xl rounded-lg ">
        <h1 className="text-xl px-8 font-semibold flex items-center gap-3 ">
          <AccountBalanceIcon className="text-gray-400" /> Balance for Leaves
        </h1>
        <Divider
          className="pt-6"
          variant="fullWidth"
          orientation="horizontal"
        />
        <div className="w-full px-6 mt-4 space-y-4 ">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="mt-6">
              <Skeleton variant="text" className="w-[15%] h-6 text-lg " />
              <Skeleton
                variant="text"
                className="w-[25%] !h-8 !mb-4 text-md "
              />
              <Divider variant="fullWidth" orientation="horizontal" />
            </div>
          ))}
        </div>
      </article>
    );
  }

  if (isError) {
    return <p>Error loading data</p>;
  }

  return (
    <article className="w-[350px] h-max bg-white shadow-lg rounded-lg ">
      <h1 className="text-xl py-6 px-6 font-semibold flex items-center gap-3 ">
        <AccountBalanceIcon className="text-gray-400" /> Balance for Leaves
      </h1>
      <div className="w-full">
        {balanceForLeave?.map((item, index) => {
          return (
            <div key={index} style={{ background: item.color }}>
              <div className="flex justify-between items-center py-6 px-6">
                <h1 className="text-md text-gray-200 font-bold tracking-wide">
                  {item.leaveName}
                </h1>
                <h1 className="text-lg tracking-wide font-bold text-gray-200">
                  {item.subtractedCount}
                </h1>
              </div>
            </div>
          );
        })}
        <div className="flex justify-between items-center py-6 px-6">
          <h1 className="text-md text-gray-200 font-bold tracking-wide">
            Total Leave Balance
          </h1>
          <h1 className="text-lg tracking-wide text-gray-400">{total}</h1>
        </div>
      </div>
    </article>
  );
};

export default LeaveTable;
