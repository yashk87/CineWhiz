import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TestContext } from "../../State/Function/Main";
import { UseContext } from "../../State/UseState/UseContext";
import useSignupFormStore from "../../hooks/useSignUpForm";
import TermsCondition from "../../components/termscondition/termsCondition";
const Signup = () => {
  const { handleAlert } = useContext(TestContext);
  const { setCookie } = useContext(UseContext);
  const navigate = useNavigate();
  const {
    firstName,
    setFirstName,
    middalName,
    setMiddalName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    passwordMatchError,
    setPasswordMatchError,
  } = useSignupFormStore();

  const handleSignup = async (e) => {
    e.preventDefault();
    const user = {
      first_name: firstName,
      middle_name: middalName,
      last_name: lastName,
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/route/employee/create`,
        user
      );
      console.log(`🚀 ~ response:`, response);
      console.log("API response:", response.data);
      handleAlert(
        true,
        "success",
        `Welcome ${response.data.user.first_name} you are singned up  successfully`
      );
      setCookie("aeigs", response.data.token);
      navigate("/");
    } catch (error) {
      console.error("API error:", error.response);
      handleAlert(
        true,
        "error",
        error.response.data.message || "Failed to sign up. Please try again."
      );
    }
  };
  const handleConfirmPasswordChange = (e) => {
    const confirmedPassword = e.target.value;
    setConfirmPassword(confirmedPassword);
    if (password !== confirmedPassword) {
      setPasswordMatchError("Passwords do not match");
    } else {
      setPasswordMatchError("");
    }
  };

  return (
    <div className="flex items-center justify-center p-8 box-border h-[600px] ">
      <div className="flex w-full h-full rounded-lg shadow-xl border bg-white">
        <div className="w-full md:w-1/2 p-8 flex flex-col items-center gap-4 justify-center">
          <form onSubmit={handleSignup}>
            <h1 className="text-3xl font-semibold  text-center text-blue-500">
              Register
            </h1>
            <div className=" w-[300px]">
              <TextField
                size="small"
                type="text"
                label="First Name"
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                size="small"
                type="text"
                label="Middal Name"
                name="middalName"
                id="middalName"
                value={middalName}
                onChange={(e) => setMiddalName(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                size="small"
                type="text"
                label="Last Name"
                name="lastName"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                size="small"
                type="email"
                label="Email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                size="small"
                type="password"
                label="Password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                size="small"
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                fullWidth
                helperText={passwordMatchError}
                error={Boolean(passwordMatchError)}
                margin="normal"
              />
              <div>
                <TermsCondition />
              </div>
              <div className="text-center m-6">
                <Button
                  className="px-4 py-2 text-base bg-blue-500 text-white rounded-lg"
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth={false}
                  margin="normal"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="w-full md:w-1/2 p-8 bg-blue-500 rounded-r-lg items-center flex-col justify-between hidden md:flex ">
          <img
            src="/argan_logo.png"
            alt="My Img"
            className="w-36 h-36 object-cover mb-6 rounded-lg p-6 bg-white m-24"
          />
          <Link to="/sign-in">
            <Button
              variant="contained"
              fullWidth
              size="small"
              className=" bg-white"
              style={{
                marginTop: "38px",
                background: "white",
                color: "#1976d2",
              }}
            >
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
