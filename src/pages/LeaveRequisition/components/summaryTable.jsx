import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Skeleton } from "@mui/material";
import Divider from "@mui/material/Divider";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

const SummaryTable = ({ setSubtractedLeaves, authToken }) => {
  const [total, setTotal] = useState();
  const [TotalLeaveSummary, setTotalLeaveSummary] = useState([]);

  const { data, isLoading, isError } = useQuery("remainingLeaves", async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/route/leave/getEmployeeSummaryForCurrentMonth`,
      {
        headers: { Authorization: authToken },
      }
    );

    return response.data;
  });
  useEffect(() => {
    let totalC = 0;
    data?.leaveTypes?.map((value) => {
      return (totalC += value.count);
    });
    setTotal(totalC);
    // Create an array to store the details of each leave type
    const leaveTypeDetailsArray = [];
    let totalCount = 0;
    // Iterate through leaveData to collect details of each leave type
    data &&
      data?.currentMonthLeaves?.forEach((item) => {
        const leaveTypeId = item.leaveTypeDetailsId._id;
        const existingLeaveType = leaveTypeDetailsArray.find(
          (leaveType) => leaveType._id === leaveTypeId
        );

        if (!existingLeaveType) {
          leaveTypeDetailsArray.push({
            _id: item.leaveTypeDetailsId._id,
            leaveName: item.leaveTypeDetailsId.leaveName,
            isActive: item.leaveTypeDetailsId.isActive,
            color: item.leaveTypeDetailsId.color,
            count: 0, // Initialize count to 0
          });
        }

        const index = leaveTypeDetailsArray.findIndex(
          (leaveType) => leaveType._id === leaveTypeId
        );
        leaveTypeDetailsArray[index].count++;
        totalCount++;
      });
    setTotal(totalCount);
    setTotalLeaveSummary(leaveTypeDetailsArray);
  }, [data]);

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
      <h1 className="text-xl py-6 px-6 font-semibold flex items-center gap-3 text-gray-400">
        <AccountBalanceIcon className="text-gray-400" /> Summary for current
        month
      </h1>
      <div className="w-full">
        {TotalLeaveSummary?.map((item, index) => {
          return (
            <div key={index} className="border-b border">
              <div className="flex justify-between items-center py-6 px-6">
                <h1 className="text-md text-gray-400 font-bold tracking-wide">
                  {item.leaveName}
                </h1>
                <h1 className="text-lg tracking-wide font-bold text-gray-400">
                  {item.count}
                </h1>
              </div>
            </div>
          );
        })}
        <div className="flex justify-between items-center py-6 px-6">
          <h1 className="text-md text-gray-400 font-bold tracking-wide">
            Total Leave Balance
          </h1>
          <h1 className="text-lg tracking-wide text-gray-400">{total}</h1>
        </div>
      </div>
    </article>
  );
};

export default SummaryTable;
