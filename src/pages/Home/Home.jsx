import { Divider } from "@mui/material";
import React from "react";
import Organisation from "./components/Organisation";
import TextCycler from "./components/cyclic-text";

const Home = () => {
  return (
    <div className="p-8">
      <TextCycler />
      <Divider />
      <Organisation />
    </div>
  );
};

export default Home;
