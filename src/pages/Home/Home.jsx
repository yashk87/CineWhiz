import { ChevronRightOutlined } from "@mui/icons-material";
import { Divider, Fab } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TestContext } from "../../State/Function/Main";
import { UseContext } from "../../State/UseState/UseContext";
import Organisation from "./components/Organisation";
import TextCycler from "./components/cyclic-text";

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
      <div className="flex w-full p-4 gap-12 overflow-y-scroll overflow-visible relative">
        <Organisation />
        <Organisation />
        <Organisation />
        <Organisation />
        <Organisation />
        <Organisation />
        <div className="absolute right-0 bottom-1/2">
          <Fab aria-label="like" onClick={handleScroll}>
            <ChevronRightOutlined />
          </Fab>
        </div>
      </div>
    </div>
  );
};

export default Home;
