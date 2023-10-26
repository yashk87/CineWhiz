import { Button, TextField } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useSignupFormStore from "../../hooks/useSignUpForm";
import styles from "./styles.module.css";

const Signup = () => {
  const navigate = useNavigate();
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
  } = useSignupFormStore();

  const handleSignup = (e) => {
    e.preventDefault();
    // Handle signup logic here
  };

  return (
    <div className="flex items-center justify-center p-8 box-border h-[500px] ">
      <div className="flex w-full h-full rounded-lg shadow-xl border bg-white">
        <div className="w-1/2 p-8 flex flex-col items-center gap-4 justify-center">
          <form className={styles.form_container} onSubmit={handleSignup}>
            <h1 className={styles.register_head}>Register</h1>
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
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className={styles.green_btn}
            >
              Sign Up
            </Button>
          </form>
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

export default Signup;
