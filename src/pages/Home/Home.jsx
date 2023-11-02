import { Divider } from "@mui/material";
import React from "react";
import TextCycler from "./components/cyclic-text";
import Org from "./components/org";
const Home = () => {
  return (
    <div className="p-8">
      <TextCycler />
      <Divider />
      <Org />
    </div>
  );
};

export default Home;
