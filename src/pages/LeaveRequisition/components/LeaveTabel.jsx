import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ErrorIcon from "@mui/icons-material/Error";
import { Avatar, AvatarGroup, Skeleton } from "@mui/material";
import Divider from "@mui/material/Divider";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

const LeaveTabel = ({
  subtractedLeaves,
  setSubtractedLeaves,
  authToken,
  vactionList,
  setVactionList,
  setNewAppliedLeaveEvents,
}) => {
  const [Total, setTotal] = useState();

  const updateLeaveCounts = (data) => {
    // Create a copy of the data to avoid mutating the state directly
    const updatedVacationList = { ...data };

    const updatedSubtractedLeaves = [];

    if (
      Array.isArray(updatedVacationList.daysOfLeaveArray) &&
      Array.isArray(updatedVacationList.organisational.typesOfLeave)
    ) {
      // Iterate through each leave type
      updatedVacationList.organisational.typesOfLeave.forEach(
        (orgLeaveType) => {
          // Find the corresponding leave entry in daysOfLeaveArray
          const matchingLeave = updatedVacationList.daysOfLeaveArray.find(
            (leave) => {
              return leave.title === orgLeaveType.leaveName;
            }
          );

          if (matchingLeave) {
            // Calculate the duration in days
            const start = dayjs(matchingLeave.start);
            const end = dayjs(matchingLeave.end);
            const subtractedCount = end.diff(start, "days");

            // Update the leave count
            orgLeaveType.count -= subtractedCount;

            // Add subtracted leave type and count to the state array
            updatedSubtractedLeaves.push({
              leaveName: orgLeaveType.leaveName,
              subtractedCount,
              color: orgLeaveType.color,
              isActive: orgLeaveType.isActive,
            });
          } else {
            // If no start and end dates, add the leave directly to the state array
            updatedSubtractedLeaves.push({
              leaveName: orgLeaveType.leaveName,
              subtractedCount: orgLeaveType.count, // You can set it to 0 or any default value
              color: orgLeaveType.color,
              isActive: orgLeaveType.isActive,
            });
          }
        }
      );
    }

    // Update the state with the subtracted leaves
    setSubtractedLeaves(updatedSubtractedLeaves);
  };

  useEffect(() => {
    const total =
      Array.isArray(subtractedLeaves) &&
      subtractedLeaves.reduce((accumulator, currentValue) => {
        return accumulator + parseInt(currentValue.subtractedCount);
      }, 0);

    setTotal(total);
  }, [subtractedLeaves]);

  // console.log(subtractedLeaves, "sub");

  const { data, isLoading, isError } = useQuery("remainingLeaves", async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/route/leave/getRemainingLeaves`,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    updateLeaveCounts(response.data);
    return response.data;
  });

  useEffect(() => {
    if (data?.daysOfLeaveArray && data.daysOfLeaveArray.length > 0) {
      const newLeaves = data.daysOfLeaveArray.map((leave) => ({
        ...leave,
        title: `${leave.title}`,
      }));

      // Filter out null values
      const filteredNewLeaves = newLeaves.filter((leave) => leave);

      console.log("title", filteredNewLeaves);

      setNewAppliedLeaveEvents((prev) => [...prev, ...filteredNewLeaves]);

      // eslint-disable-next-line
    }
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <article className="md:w-[40%] w-full h-max py-6  bg-white shadow-lg rounded-lg ">
        <h1 className="text-xl px-8 font-semibold flex items-center gap-3 ">
          <AccountBalanceIcon className="text-gray-400" /> Balance for Leaves
        </h1>

        <Divider
          className="pt-6"
          variant="fullWidth"
          orientation="horizontal"
        />

        <div className="w-full px-6 mt-4 space-y-4 ">
          <div className="mt-6">
            <Skeleton variant="text" className="w-[15%] h-6 text-lg " />
            <Skeleton variant="text" className="w-[25%] !h-8 !mb-4 text-md " />
            <Divider variant="fullWidth" orientation="horizontal" />
          </div>
          <div className="mt-6">
            <Skeleton variant="text" className="w-[15%] h-6 text-lg " />
            <Skeleton variant="text" className="w-[25%] !h-8 !mb-4 text-md " />
            <Divider variant="fullWidth" orientation="horizontal" />
          </div>
          <div className="mt-6">
            <Skeleton variant="text" className="w-[15%] h-6 text-lg " />
            <Skeleton variant="text" className="w-[25%] !h-8 !mb-4 text-md " />
            <Divider variant="fullWidth" orientation="horizontal" />
          </div>
          <div className="mt-6">
            <Skeleton variant="text" className="w-[15%] h-6 text-lg " />
            <Skeleton variant="text" className="w-[25%] !h-8  text-md " />
          </div>
        </div>
      </article>
    );
  }

  // console.log(subtractedLeaves, "sub");

  if (isError) {
    return <p>Error loading data</p>;
  }

  return (
    <>
      <article className="md:w-[40%] w-full h-max py-6  bg-white shadow-lg rounded-lg ">
        <h1 className="text-xl px-8 font-semibold flex items-center gap-3 ">
          <AccountBalanceIcon className="text-gray-400" /> Balance for Leaves
        </h1>

        <Divider
          className="pt-6"
          variant="fullWidth"
          orientation="horizontal"
        />

        <div className="w-full px-8">
          {subtractedLeaves?.map((item, index) =>
            item.subtractedCount <= 0 ? (
              <div key={index} className="mt-6 text-red-700">
                <div className="text-red-700 flex gap-2 items-center">
                  <ErrorIcon />
                  <h1 className="text-md text-gray-400 font-medium">
                    {item.leaveName}
                  </h1>
                </div>
                <h1 className="text-lg font-semibold mb-4">No leaves left</h1>

                <Divider variant="fullWidth" orientation="horizontal" />
              </div>
            ) : (
              <div className={`mt-6`} key={index}>
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-md text-gray-400 font-medium">
                      {item.leaveName}
                    </h1>
                    <h1 className="text-lg mb-4 tracking-wide">
                      {item.subtractedCount} leaves left
                    </h1>
                  </div>
                  <Avatar
                    sx={{
                      bgcolor: item.color,
                      width: 24,
                      height: 24,
                      fontSize: 16,
                    }}
                    alt={`${item.leaveName}`}
                    src="/broken-image.jpg"
                  ></Avatar>
                </div>
                <Divider variant="fullWidth" orientation="horizontal" />
              </div>
            )
          )}

          <div className="flex justify-between items-center mt-6">
            <div>
              <h1 className="text-md text-gray-400 font-medium">
                Total balance
              </h1>
              <h1 className="text-lg mb-4 tracking-wider">
                {Total} leaves left
              </h1>
            </div>
            <AvatarGroup max={4}>
              {subtractedLeaves?.map((item, i) => {
                return (
                  <Avatar
                    key={i}
                    sx={{
                      bgcolor: item.color,
                      width: 24,
                      height: 24,
                      fontSize: 16,
                    }}
                    alt={`${item.leaveName}`}
                    src="/broken-image.jpg"
                  />
                );
              })}
            </AvatarGroup>
          </div>
        </div>
      </article>
    </>
  );
};

export default LeaveTabel;
