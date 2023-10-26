import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React from "react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useLoginForm";

const SignIn = () => {
  const { setEmail, setPassword } = useSignup();

  return (
    <div className="flex items-center justify-center p-8 box-border h-[500px] ">
      <div className="flex w-full h-full rounded-lg shadow-xl border bg-white">
        <div className="w-1/2 p-8 flex flex-col items-center gap-4 justify-center">
          <Typography
            color={"primary"}
            fontWeight={800}
            fontSize={20}
            className="text-2xl my-2"
          >
            Login As
          </Typography>
          <TextField
            type="email"
            size="small"
            label="Email"
            name="email"
            id="email"
            onChange={(event) => setEmail(event.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            size="small"
            type="password"
            label="Password"
            name="password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="m-auto w-fit"
            style={{ marginTop: 10 }}
          >
            Sign In
          </Button>
        </div>
        <div className="w-1/2 p-8 bg-blue-500 rounded-r-lg items-center flex flex-col justify-center">
          <img
            src="/argan_logo.png"
            alt="My Img"
            className="w-36 h-36 object-cover mb-6 rounded-lg p-6 bg-white"
          />
          <Link to="/sign-up">
            <Button
              variant="contained"
              fullWidth
              className=" bg-white"
              style={{
                marginTop: "38px",
                background: "white",
                color: "#1976d2",
              }}
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
