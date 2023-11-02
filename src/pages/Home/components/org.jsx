import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const Org = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1, marginTop: 5 }}>
        <Grid
          container
          spacing={2}
          sx={{ p: 1, border: "1px solid black", m: 1 }}
        >
          <Grid item xs={8} sx={{ borderRight: "1px solid black" }}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ color: "#1D6EB7", fontWeight: "bold" }}
                  >
                    Argan IT services
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="caption" gutterBottom>
                    Foundation Date
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Box>
                    <Box
                      sx={{
                        width: "45%",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <img src="/argan_logo.png" alt="my_img" />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={6} sx={{ p: 1 }}>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" gutterBottom>
                    Website link
                  </Typography>
                  <Link
                    href="#"
                    underline="none"
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    http://argantechnology.com/it-services/
                  </Link>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="subtitle2" gutterBottom>
                    Linkden link
                  </Typography>
                  <Link
                    href="#"
                    underline="none"
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    http://www.linkedn.com/company/argan-techno..
                  </Link>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle2" gutterBottom>
                    Email
                  </Typography>
                  <Link
                    href="#"
                    underline="none"
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    dev1.atsit@gmail.com
                  </Link>
                </Grid>
              </Grid>

              <Divider
                sx={{
                  backgroundColor: "darkgray",
                  height: "2px",
                  margin: "16px 0",
                }}
              />
            </Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "#1D6EB7", p: 1 }}
            >
              Detail :
            </Typography>
            <Typography variant="body2" gutterBottom sx={{ p: 1 }}>
              subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Quos blanditiis tenetur subtitle2. Lorem ipsum dolor sit
              amet, consectetur adipisicing elit. Quos blanditiis tenetur .
              subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Quos blanditiis tenetur . subtitle2. Lorem ipsum dolor sit
              amet, consectetur adipisicing elit. Quos blanditiis tenetur
            </Typography>
            <Box>
              <Stack direction="row" spacing={9} sx={{ m: 3 }}>
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  Go to setup page
                </Button>
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  Add Department
                </Button>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={4}>
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
                  width: "60%",
                  height: "33vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 7,
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
