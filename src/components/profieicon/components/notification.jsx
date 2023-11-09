import CheckIcon from "@mui/icons-material/Check"; // Import the accept icon
import CloseIcon from "@mui/icons-material/Close"; // Import the reject icon
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { UseContext } from "../../../State/UseState/UseContext";
import { useState } from "react";
import { format } from "date-fns";
import LeaveRejectmodal from "../../Modal/LeaveModal/LeaveRejectmodal";

const Notification = () => {
  const { cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
  useEffect(() => {
    GetApproval();
  }, []);
  return (
    <>
      <Box
        className="py-2 h-max"
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
            <Grid item xs={8} className="gap-4 py-4 h-max space-y-4">
              <Box className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-sky-600">
                  Leave Request From Employee
                </h1>
                <Typography variant="body1" gutterBottom>
                  Details :
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  className=" text-gray-400"
                >
                  Employee has raised a leave request for {items.description}
                </Typography>

                <Typography variant="body1" color="initial">
                  Leave Dates :
                </Typography>
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
              <Box sx={{ mt: 3, mb: 3 }}>
                <Stack direction="row" spacing={9}>
                  <Button
                    variant="contained"
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
                    onClick={handleOpen}
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
            </Grid>
            <Grid item xs={4}>
              <Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  marginTop={5}
                >
                  <img
                    src="argan_founder.png"
                    alt="my-img"
                    className="border-2 border-gray-400"
                    style={{
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Box>

      <LeaveRejectmodal open={open} handleClose={handleClose} />
    </>
  );
};

export default Notification;
