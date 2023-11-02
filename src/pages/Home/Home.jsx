import { Divider } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TestContext } from "../../State/Function/Main";
import { UseContext } from "../../State/UseState/UseContext";
import TextCycler from "./components/cyclic-text";
import Org from "./components/org";
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
  const handleScroll = (e) => {
    console.log(e);
    // window.scrollLeft = 10;
    console.log("e", (e.target.parentElement.scrollLeft = -10));
  };

  return (
    <div className="p-8">
      <TextCycler />
      <Divider />
      <Org />
      <Org />
    </div>
  );
};

export default Home;
