import { Divider } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TestContext } from "../../State/Function/Main";
import { UseContext } from "../../State/UseState/UseContext";
import TextCycler from "./components/cyclic-text";
import Organisation from "./components/Organisation";
const Home = () => {
  const { cookies } = useContext(UseContext);
  const { handleAlert } = useContext(TestContext);
  const redirect = useNavigate();
  useEffect(() => {
    const authToken = cookies["aeigs"];
    if (!authToken) {
      // Redirect to the login page
      redirect("/sign-in");
      handleAlert(true, "warning", "Please login first.");
    }
  }, [redirect, cookies, handleAlert]);

  return (
    <div className="p-8">
      <TextCycler />
      <Divider />
      <Organisation />
    </div>
  );
};

export default Home;
