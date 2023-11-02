import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const Org = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1, border: "1px solid black", marginTop: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={8} sx={{ border: "1px solid black" }}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Typography variant="subtitle1" gutterBottom>
                    Argan IT services
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="subtitle1" gutterBottom>
                    Foundation Date
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Box>
                    <Box
                      sx={{
                        width: "40%",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <img src="/argan_logo.png" alt="my_img" />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Typography variant="subtitle1" gutterBottom>
                    Website link
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    wwww.arganit.com
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    Linkden link
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    www.linkdenin.com
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle1" gutterBottom>
                    Linkden link
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    www.linkdenin.com
                  </Typography>
                </Grid>
              </Grid>

              <Divider
                sx={{
                  backgroundColor: "darkgray", // Change the background color to a dark color
                  height: "2px", // Adjust the height as needed
                  margin: "16px 0", // Add margin for spacing
                }}
              />
            </Box>
            <Typography variant="h6" gutterBottom>
              Detail :
            </Typography>
            <Typography variant="body2" gutterBottom>
              subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Quos blanditiis tenetur subtitle2. Lorem ipsum dolor sit
              amet, consectetur adipisicing elit. Quos blanditiis tenetur .
              subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Quos blanditiis tenetur . subtitle2. Lorem ipsum dolor sit
              amet, consectetur adipisicing elit. Quos blanditiis tenetur
            </Typography>
          </Grid>

          <Grid item xs={4} sx={{ border: "1px solid black" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  borderRadius: "150%",
                  border: "1px solid black",
                  width: "60%",
                  height: "33vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src="/argan_logo.png" alt="my_img" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Org;
