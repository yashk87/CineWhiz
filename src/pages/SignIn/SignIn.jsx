import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TestContext } from "../../State/Function/Main";
import { UseContext } from "../../State/UseState/UseContext";
import useSignup from "../../hooks/useLoginForm";

const SignIn = () => {
  const { setEmail, setPassword, email, password } = useSignup();
  const { handleAlert } = useContext(TestContext);
  const { setCookie } = useContext(UseContext);
  const redirect = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/route/employee/login`,
        {
          email,
          password,
        }
      );
      console.log(`🚀 ~ response:`, response);
      handleAlert(
        true,
        "success",
        `Welcome ${response.data.user.first_name} you are logged in successfully`
      );
      redirect("/");
      console.log(`🚀 ~ response:`, response);
      console.log("API response:", response.data);

      setCookie("aeigs", response.data.token);
      window.location.reload();
    } catch (error) {
      console.error("API error:", error.response);
      handleAlert(
        true,
        "error",
        error?.response?.data?.message || "Failed to sign in. Please try again."
      );
    }
  };
  return (
    <div className="flex items-center justify-center p-8 box-border h-[500px] lg:w-[900px] m-auto">
      <div className="flex w-full h-full rounded-lg shadow-xl border bg-white">
        <form
          onSubmit={onSubmit}
          className="w-full md:w-1/2 p-8 flex flex-col items-center gap-4 justify-center"
        >
          <Typography
            color={"primary"}
            fontWeight={800}
            fontSize={20}
            className="text-2xl my-2"
          >
            Login As
          </Typography>
          <div className="w-full sm:[250px]">
            <TextField
              required
              type="email"
              size="small"
              label="Email"
              name="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              required
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
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="m-auto w-fit"
          >
            Sign In
          </Button>
          <div>
            <p>
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:text-blue-700 underline"
              >
                forgot password
              </Link>
            </p>
          </div>
        </form>
        <div className="md:w-1/2 md:flex hidden p-8 bg-blue-500 rounded-r-lg items-center flex-col justify-around">
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
