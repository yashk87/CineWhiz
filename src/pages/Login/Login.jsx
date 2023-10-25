import { Card } from "@mui/material";
import React from "react";
import LoginForm from "./components/login-form";

const Login = () => {
  return (
    // <header className="bg-blue-500 text-white text-center p-4">
    //   Welcome to React with Tailwind CSS!
    // </header>
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        padding: "60px 40px",
        boxSizing: "border-box",
      }}
    >
      <Card style={{ width: "95%", height: 450 }} className="grid grid-cols-2">
        <div className=" bg-blue-500"></div>
        <div className="flex justify-center items-center bg-[#F8F8F8]">
          <LoginForm />
        </div>
      </Card>
    </div>
  );
};

export default Login;
