import { Button, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import useSignupFormStore from "../../hooks/useSignUpForm";
import axios from "axios";

const Signup = () => {
  const {
    firstName,
    setFirstName,
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

    // Create a user object with the form data
    const user = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    };

    try {
      // Send a POST request to your backend API to handle user registration
      const response = await axios.post("/your-api-endpoint-for-signup", user);

      // Check the response for success or handle it as needed
      if (response.status === 200) {
        // User registration was successful
        // You can redirect the user to the login page or perform other actions
      } else {
        // setError(response.data.message); // Display any error message from the server
      }
    } catch (error) {
      // setError("An error occurred. Please try again."); // Handle network or other errors
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
    <div className="flex items-center justify-center p-8 box-border h-[500px] ">
      <div className="flex w-full h-full rounded-lg shadow-xl border bg-white">
        <div className="w-1/2 p-8 flex flex-col items-center gap-4 justify-center">
          <form onSubmit={handleSignup}>
            <h1 className="text-3xl font-semibold  text-center text-blue-500">
              Register
            </h1>
            <div className=" w-96">
              <TextField
                size="small"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                size="small"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                size="small"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                size="small"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                size="small"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                fullWidth
                helperText={passwordMatchError}
                error={Boolean(passwordMatchError)}
                margin="normal"
              />
              <div class="text-center">
                <Button
                  class="px-4 py-2 text-base bg-blue-500 text-white rounded-lg m-4"
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  margin="normal"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="w-1/2 p-8 bg-blue-500 rounded-r-lg items-center flex flex-col justify-center">
          <img
            src="/argan_logo.png"
            alt="My Img"
            className="w-36 h-36 object-cover mb-6 rounded-lg p-6 bg-white"
          />
          <Link to="/sign-in">
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
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
