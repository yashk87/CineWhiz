import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TestContext } from "../../State/Function/Main";
import { UseContext } from "../../State/UseState/UseContext";
import TermsCondition from "../../components/termscondition/termsCondition";
import useSignupFormStore from "../../hooks/useSignUpForm";
const Signup = () => {
  const { handleAlert } = useContext(TestContext);
  const router = useNavigate();
  const { setCookie } = useContext(UseContext);

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
    firstNameError,
    setFirstNameError,
    lastNameError,
    setLastNameError,
    passwordError,
    setPasswordError,
    emailError,
    setEmailError,
    orgnizationName,
    setOrganizationName,
  } = useSignupFormStore();

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
      console.log(process.env.REACT_APP_API);

      const response = await axios.post(
        `${process.env.REACT_APP_API}/route/employee/create`,
        user
      );
      console.log(`🚀 ~ response:`, response);
      console.log("API response:", response.data);

      handleAlert(true, "success", response.data.message);

      // Redirect to a waiting page after successful signup
      router("/waiting"); // Redirect to a waiting page

      window.location.reload();
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
  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  return (
    <div className="flex items-center justify-center p-8 box-border ">
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
                onChange={(e) => {
                  const enteredFirstName = e.target.value;
                  setFirstName(enteredFirstName);

                  if (
                    enteredFirstName.length < 2 ||
                    enteredFirstName.length > 30 ||
                    /[^a-zA-Z]/.test(enteredFirstName)
                  ) {
                    setFirstNameError(
                      "First Name must be between 1 and 30 characters and should only contain letters."
                    );
                  } else {
                    setFirstNameError("");
                  }
                }}
                required
                fullWidth
                margin="normal"
                error={!!firstNameError}
                helperText={firstNameError}
              />

              <TextField
                size="small"
                type="text"
                label="Middal Name"
                name="middalName"
                id="middalName"
                value={middalName}
                onChange={(e) => setMiddalName(e.target.value)}
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
                onChange={(e) => {
                  const enteredLastName = e.target.value;
                  setLastName(enteredLastName);
                  if (
                    enteredLastName.length < 2 ||
                    enteredLastName.length > 30 ||
                    /[^a-zA-Z]/.test(enteredLastName)
                  ) {
                    setLastNameError(
                      "Last Name must be between 1 and 30 characters and should only contain letters"
                    );
                  } else {
                    setLastNameError("");
                  }
                }}
                error={!!lastNameError}
                helperText={lastNameError}
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
                onChange={(e) => {
                  const enteredEmail = e.target.value;
                  setEmail(enteredEmail);

                  if (!isValidEmail(enteredEmail)) {
                    setEmailError("Invalid email format");
                  } else {
                    setEmailError("");
                  }
                }}
                required
                fullWidth
                margin="normal"
                error={!!emailError}
                helperText={emailError}
              />

              <TextField
                size="small"
                type="password"
                label="Password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (!e.target.value.match(passwordRegex)) {
                    setPasswordError(
                      "Password must contain at least one number , special character.and and min length is 8"
                    );
                  } else {
                    setPasswordError("");
                  }
                }}
                required
                fullWidth
                margin="normal"
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  inputProps: {
                    pattern: passwordRegex.source,
                  },
                }}
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
              <TextField
                size="small"
                type="password"
                label="Organization Namw"
                name="orgnizationName"
                id="orgnizationName"
                value={orgnizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                required
                fullWidth
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
        <div className="w-full md:w-1/2 p-8 bg-blue-500 rounded-r-lg items-center flex-col justify-center hidden md:flex ">
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
