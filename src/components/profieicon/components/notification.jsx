import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CheckIcon from "@mui/icons-material/Check"; // Import the accept icon
import CloseIcon from "@mui/icons-material/Close"; // Import the reject icon
import Button from "@mui/material/Button";

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
            border: "1px solid  #C3C3C3",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add a box shadow on hover
          }}
        >
          <Grid item xs={8}>
            <Box>
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
              <Typography variant="body2" gutterBottom>
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
