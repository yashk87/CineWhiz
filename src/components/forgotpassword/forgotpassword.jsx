import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useContext } from "react";
import { TestContext } from "../../State/Function/Main";
import useSignup from "../../hooks/useLoginForm";

const ForgotPassword = () => {
  const { setEmail, email } = useSignup();
  const { handleAlert } = useContext(TestContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/route/employee/forgot-password`,
        {
          email,
        }
      );
      console.log(`🚀 ~ response:`, response);
      console.log("API response:", response.data);
    } catch (error) {
      console.error("API error:", error.response);
      handleAlert(true, "error", error?.response?.data?.message);
    }
  };

  return (
    <>
      <Container
        component="main"
        sx={{ marginTop: 5, border: "1px solid white" }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">Forgot Password</Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  href="/sign-in"
                  variant="body2"
                  sx={{ pl: 5, textAlign: "center" }}
                >
                  Sign In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ForgotPassword;
