import { Chip } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { UseContext } from "../../State/UseState/UseContext";
import { Error } from "@mui/icons-material";

const Application = () => {
  const { cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];

  const [employeeLeaveList, setEmployeeLeaveList] = useState([]);

  const getEmployeeLeaveList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/route/leave/getEmployeeLeaveList`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      console.log(`🚀 ~ response:`, response);

      setEmployeeLeaveList(response.data.employeeLeaveList);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  useEffect(() => {
    getEmployeeLeaveList();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Box
        className="py-2 min-h-screen bg-gray-50 space-y-5 h-max"
        sx={{
          flexGrow: 1,
          p: 5,
        }}
      >
        {employeeLeaveList.length <= 0 ? (
          <div className="h-max text-red-600 !text-2xl flex items-center gap-4 bg-white py-6 px-8 shadow-lg rounded-lg">
            <Error className="!text-3xl" />
            <h1 className="font-semibold">
              you dont have applied for any application
            </h1>
          </div>
        ) : (
          employeeLeaveList.map((item) => (
            <Grid
              key={item._id}
              container
              spacing={2}
              sx={{
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                borderRadius: "5px",
              }}
            >
              <Grid item xs={8} className="gap-4 py-4 h-max space-y-4">
                <Box className="flex flex-col gap-2">
                  <Typography variant="h6" fontWeight="bold">
                    {`${item.employeeId.first_name} ${item.employeeId.last_name} has raised a leave request for ${item.description}`}
                  </Typography>

                  {item.daysOfLeave.map((day, id) => (
                    <Box key={id}>
                      <Typography variant="body2" color="textSecondary">
                        {`Leave from ${format(
                          new Date(day.startDate),
                          "PP"
                        )} to ${format(new Date(day.endDate), "PP")}`}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={4}>
                {item.status === "Rejected" ? (
                  <Chip label={item.message} color="error" />
                ) : item.status === "Approved" ? (
                  <Chip label={item.message} color="success" />
                ) : (
                  <Chip
                    label={"you request is in pending status"}
                    color="primary"
                  />
                )}
              </Grid>
            </Grid>
          ))
        )}
      </Box>
    </>
  );
};

export default Application;
