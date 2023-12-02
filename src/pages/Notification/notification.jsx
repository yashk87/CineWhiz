import { CalendarMonth } from "@mui/icons-material";
import { Badge, Chip } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { UseContext } from "../../State/UseState/UseContext";
import LeaveRejectmodal from "../../components/Modal/LeaveModal/LeaveRejectmodal";

const Notification = () => {
  const { cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];
  const [open, setOpen] = useState(false);
  const [workFlow, setWorkFlow] = useState([]);
  const [id, setid] = useState("");

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
  };
  const { data, isLoading } = useQuery("employee-leave", async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/route/leave/get`,
      {
        headers: { Authorization: authToken },
      }
    );

    return response.data;
  });

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

  console.log(`🚀 ~ data?.leaveRequests:`, data?.leaveRequests);
  const RejectRequest = async (id) => {
    console.log(id, "id");
    setid(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
        <LeaveRejectmodal id={id} open={open} handleClose={handleClose} />
        {/* <div className="flex items-center gap-4  bg-sky-100 p-4 px-8 rounded-md shadow-lg">
          <NotificationImportant className="!text-4xl" />
          <h1 className="text-2xl font-semibold">No notification</h1>
        </div> */}
        {isLoading ? (
          <>Loaiding</>
        ) : (
          data?.leaveRequests?.map((items, id) => {
            console.log(`🚀 ~ items:`, items);
            return (
              <Grid
                key={id}
                container
                spacing={2}
                className="bg-white w-full"
                sx={{
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add a box shadow on hover
                  borderRadius: "5px",
                }}
              >
                <Grid item className="gap-1  py-4 w-full  h-max space-y-4">
                  <Box className="flex md:flex-row items-center  justify-center flex-col gap-8  md:gap-16">
                    <div className="w-max">
                      <Badge
                        badgeContent={"loading"}
                        color="info"
                        variant="standard"
                      >
                        <Button
                          disabled
                          variant="contained"
                          size="large"
                          className="!rounded-full !bg-gray-50  !h-16 !w-16 group-hover:!text-white !text-black"
                          color="info"
                        >
                          <CalendarMonth className="!text-4xl text-gr" />
                        </Button>
                      </Badge>
                    </div>

                    <div className="space-y-4 w-full flex flex-col items-center md:items-start justify-center">
                      <h1 className="text-xl px-4 md:!px-0 italic font-semibold ">
                        {items?.employeeId?.first_name} has raised a leave
                        request from {items.description} Leave from{" "}
                        {format(new Date(items.start), "PP")} to{" "}
                        {format(new Date(items.end), "PP")}
                      </h1>

                      <Chip
                        label={items?.description}
                        size="small"
                        sx={{ backgroundColor: items?.color, color: "#ffffff" }}
                      />

                      {items.status === "Pending" ? (
                        <Box sx={{ mt: 3, mb: 3 }}>
                          <Stack direction="row" spacing={3}>
                            <Button
                              variant="contained"
                              onClick={() => AcceptLeave(items._id)}
                              // startIcon={<CheckIcon />}
                              sx={{
                                fontStyle: "italic",
                                fontSize: "12px",
                                padding: "5px 30px",
                                textTransform: "capitalize",
                                backgroundColor: "#42992D",
                                "&:hover": {
                                  backgroundColor: "#42992D", // Set the same color on hover to maintain the color
                                },
                              }}
                            >
                              Accept
                            </Button>
                            <Button
                              // onClick={handleOpen}
                              onClick={() => RejectRequest(items._id)}
                              variant="contained"
                              // startIcon={<CloseIcon />}
                              sx={{
                                fontStyle: "italic",
                                fontSize: "12px",
                                padding: "5px 30px",
                                textTransform: "capitalize",
                                backgroundColor: "#BB1F11",
                                "&:hover": {
                                  backgroundColor: "#BB1F11", // Set the same color on hover to maintain the color
                                },
                              }}
                            >
                              Reject
                            </Button>
                          </Stack>
                        </Box>
                      ) : items.status === "Rejected" ? (
                        <Box>
                          <Chip label="Request rejected" color="error" />
                        </Box>
                      ) : (
                        <Box>
                          <Chip label="Request Approved" color="success" />
                        </Box>
                      )}
                    </div>
                  </Box>
                </Grid>
                {/* <Grid item xs={4}>
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
                </Grid> */}
              </Grid>
            );
          })
        )}
      </Box>
    </>
  );
};

export default Notification;
