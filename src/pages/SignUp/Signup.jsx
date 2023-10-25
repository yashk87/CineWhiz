import React, { useState } from "react";
import styles from "./styles.module.css";
import { Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const navigate = useNavigate();
  const [inputvalue, setInputValue] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const validate = (name, value) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const namePattern = /^[a-zA-Z\s' -]+$/;
    const prefixes = ["Mr", "Mrs", "Miss"];
    switch (name) {
      case "first_name":
        if (!value || value.trim() === "") {
          return "First Name is required";
        } else if (!value || !value.match(namePattern)) {
          return "Invalid name. Please enter a valid name.";
        } else if (value.length < 3) {
          return "Name must be at least 3 characters long.";
        } else if (value.length > 25) {
          return "Name must not exceed 25 characters.";
        } else if (prefixes.includes(value.split(" ")[0])) {
          return "Name should not contain prefixes.";
        } else {
          return "";
        }
      case "last_name":
        if (!value || value.trim() === "") {
          return "Last Name is required";
        } else if (!value || !value.match(namePattern)) {
          return "Invalid name. Please enter a valid name.";
        } else if (value.length < 3) {
          return "Name must be at least 3 characters long.";
        } else if (value.length > 25) {
          return "Name must not exceed 25 characters.";
        } else if (prefixes.includes(value.split(" ")[0])) {
          return "Name should not contain prefixes.";
        } else {
          return "";
        }
      case "email":
        if (!value || value.trim() === "") {
          return "email is required";
        }
        if (!emailPattern.test(inputvalue.email)) {
          return "Email Not Valid";
        } else {
          return "";
        }
      case "password":
        if (!value || value.trim() === "") {
          return "password is required";
        } else if (
          inputvalue.confirm_password &&
          value !== inputvalue.confirm_password
        ) {
          return "Password and Confirm Password does not match";
        } else {
          return "";
        }
      case "confirm_password":
        if (!value || value.trim() === "") {
          return "confirmpassword is required";
        } else if (inputvalue.password && value !== inputvalue.password) {
          return "Password and Confirm Password does not match.";
        } else {
          return "";
        }
      default: {
        return "";
      }
    }
  };

  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setError({ ...error, [name]: validate(name, value) });
    setInputValue({ ...inputvalue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationError = {};
    console.log(inputvalue);
    Object.keys(inputvalue).forEach((name) => {
      const error = validate(name, inputvalue[name]);
      if (error && error.length > 0) {
        validationError[name] = error;
      }
    });

    if (Object.keys(validationError).length > 0) {
      setError({ ...validationError });
    }
    RegisterUser(inputvalue);
  };

  const RegisterUser = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}route/employee/create`,
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <img
            src="/argan_logo.png"
            alt="My Img"
            style={{
              width: "250px",
              height: "250px",
              borderRadius: "10px",
              backgroundColor: "white",
              alignItems: "center",
            }}
          />
          <Link to="/singin">
            <button
              type="button"
              className={styles.white_btn}
              onClick={() => navigate("/singin")}
            >
              Sing in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container}>
            <h1 className={styles.register_head}>Register</h1>
            <input
              type="text"
              placeholder="First Name"
              name="first_name"
              id="first_name"
              value={inputvalue.first_name.value}
              onChange={handleOnchange}
              required
              className={styles.input}
            />
            <Typography sx={{ color: "red", mb: 1 }}>
              {error.first_name}
            </Typography>
            <input
              type="text"
              placeholder="Last Name"
              name="last_name"
              id="last_name"
              value={inputvalue.last_name.value}
              onChange={handleOnchange}
              required
              className={styles.input}
            />
            <Typography sx={{ color: "red", mb: 1 }}>
              {error.last_name}
            </Typography>
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              value={inputvalue.email.value}
              onChange={handleOnchange}
              required
              className={styles.input}
            />
            <Typography sx={{ color: "red", mb: 1 }}>{error.email}</Typography>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              value={inputvalue.password.value}
              onChange={handleOnchange}
              required
              className={styles.input}
            />
            <Typography sx={{ color: "red", mb: 1 }}>
              {error.password}
            </Typography>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirm_password"
              id="confirm_password"
              value={inputvalue.confirm_password.value}
              onChange={handleOnchange}
              required
              className={styles.input}
            />
            <Typography sx={{ color: "red", mb: 1 }}>
              {error.confirm_password}
            </Typography>
            <button
              type="submit"
              className={styles.green_btn}
              onClick={handleSubmit}
            >
              Sing Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
