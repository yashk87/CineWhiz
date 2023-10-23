import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import { TestContext } from "../../../State/Function/Main";
import useLoginFormStore from "../../../hooks/useLoginForm";

const LoginForm = () => {
  const { email, password, setEmail, setPassword } = useLoginFormStore();
  const { handleAlert } = useContext(TestContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    // Validation logic using Zod can be added here if needed

    try {
      const data = {
        email,
        password,
      };
      const config = { headers: { "Content-Type": "application/json" } };

      console.log(`🚀 ~ process.env.REACT_APP_API:`, process.env.REACT_APP_API);
      const result = await axios
        .post(`${process.env.REACT_APP_API}route/employee/login`, data, config)
        .catch((errors) => {
          console.log(errors);
          handleAlert(
            true,
            errors.response.data.message || "server is under maintainance"
          );
        })
        .then((response) => {
          console.log(response);
          handleAlert(true, "success", "Login successful. Welcome!");
        });
    } catch (error) {
      console.error("Login error:", error);
      // Handle other errors
      handleAlert(true, "error", "An error occurred. Please try again later.");
    }
  };

  return (
    <div className="">
      <h4 className="p-8 text-center text-lg font-bold text-blue-500">
        Login Form
      </h4>
      <div className="w-[250px] gap-4 grid items-center">
        <form onSubmit={handleSubmit} className="space-y-6 ">
          <TextField
            required
            size="small"
            fullWidth
            name="email"
            label="E-mail"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            fullWidth
            size="small"
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth={false}
            variant="contained"
            className="w-full text-white"
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
