import CheckIcon from "@mui/icons-material/Check"; // Import the accept icon
import CloseIcon from "@mui/icons-material/Close"; // Import the reject icon
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

const Notification = () => {
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          p: 5,
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add a box shadow on hover
            borderRadius: "5px",
          }}
        >
          <Grid item xs={8} className="gap-4">
            <Box className="flex flex-col gap-2">
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  color: "#1D6EB7",
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
              >
                Your delegate have update
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ color: "#1D6EB7" }}
              >
                Details :
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                className=" text-gray-400"
              >
                He added organization name as "Organization1"
              </Typography>
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
                  Accept the changes
                </Button>
                <Button
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
                  Reject the changes
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
      </Box>
    </>
  );
};

export default Notification;
