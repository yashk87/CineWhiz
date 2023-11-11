import CheckIcon from "@mui/icons-material/Check"; // Import the accept icon
import CloseIcon from "@mui/icons-material/Close"; // Import the reject icon
import { Chip } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { UseContext } from "../../../State/UseState/UseContext";

const Notification = () => {
  const { cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];

  const [workFlow, setWorkFlow] = useState([]);

  const GetApproval = async () => {
    const getNotification = await axios.get(
      `${process.env.REACT_APP_API}/route/leave/get`,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );

    setWorkFlow(getNotification.data.leaveRequests);
    console.log(getNotification.data.leaveRequests);
  };

  const AcceptLeave = async (id) => {
    console.log(id, "id");

    try {
      const acceptLeave = await axios.post(
        `${process.env.REACT_APP_API}/route/leave/accept/${id}`,
        { message: "Your Request is successfully approved" },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      window.location.reload();
      console.log(acceptLeave, "acc");
    } catch (error) {
      console.log(error, "err");
    }
  };

  const RejectRequest = async (id) => {
    console.log(id, "id");

    try {
      const rejectLeave = await axios.post(
        `${process.env.REACT_APP_API}/route/leave/reject/${id}`,
        { message: "Your Request has been rejected" },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      window.location.reload();
      console.log(rejectLeave, "acc");
    } catch (error) {
      console.log(error, "err");
    }
  };

  useEffect(() => {
    GetApproval();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Box
        className="py-2 space-y-5 h-max"
        sx={{
          flexGrow: 1,
          p: 5,
        }}
      >
        {workFlow.map((items, id) => (
          <Grid
            key={id}
            container
            spacing={2}
            sx={{
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add a box shadow on hover
              borderRadius: "5px",
            }}
          >
            {/* <LeaveRejectmodal
              open={open}
              handleClose={handleClose}
              id={items._id}
            /> */}

            <Grid item xs={8} className="gap-4 py-4 h-max space-y-4">
              <Box className="flex flex-col gap-2">
                {/* <h1 className="text-2xl font-semibold text-sky-600">
                  Leave Request From Employee
                </h1> */}

                <h1 className="text-xl font-semibold ">
                  {items.employeeId.first_name} has raised a leave request for{" "}
                  {items.description}
                </h1>

                {items.daysOfLeave.map((day, id) => (
                  <>
                    <Box key={id}>
                      <Typography className=" text-gray-400" variant="body2">
                        Leave from {format(new Date(day.startDate), "PP")} to{" "}
                        {format(new Date(day.endDate), "PP")}
                      </Typography>
                    </Box>
                  </>
                ))}
              </Box>
              {items.status === "Pending" ? (
                <Box sx={{ mt: 3, mb: 3 }}>
                  <Stack direction="row" spacing={9}>
                    <Button
                      variant="contained"
                      onClick={() => AcceptLeave(items._id)}
                      startIcon={<CheckIcon />}
                      sx={{
                        fontSize: "12px",
                        textTransform: "capitalize",
                        backgroundColor: "#42992D",
                        "&:hover": {
                          backgroundColor: "#42992D", // Set the same color on hover to maintain the color
                        },
                      }}
                    >
                      Approved
                    </Button>
                    <Button
                      // onClick={handleOpen}
                      onClick={() => RejectRequest(items._id)}
                      variant="contained"
                      startIcon={<CloseIcon />}
                      sx={{
                        fontSize: "12px",
                        textTransform: "capitalize",
                        backgroundColor: "#BB1F11",
                        "&:hover": {
                          backgroundColor: "#BB1F11", // Set the same color on hover to maintain the color
                        },
                      }}
                    >
                      Denied
                    </Button>
                  </Stack>
                </Box>
              ) : items.status === "Rejected" ? (
                <Chip label="Request rejected" color="error" />
              ) : (
                <Chip label="Request Approved" color="success" />
              )}
            </Grid>
            <Grid item xs={4}>
              <Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  marginTop={5}
                >
                  {/* <img
                    src="argan_founder.png"
                    alt="my-img"
                    className="border-2 border-gray-400"
                    style={{
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                    }}
                  /> */}
                </Box>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Box>
    </>
  );
};

export default Notification;
