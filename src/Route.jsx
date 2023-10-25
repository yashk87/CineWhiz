import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import AddOrganisation from "../src/pages/AddOrganisation/AddOrganisation";
import DateRangeCalendarValue from "./pages/Test/test2";
import Department from "./pages/Department_page/Components/Department-form";
const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/login" element={<Login />} />
      {/* <Route exact path="/menu" element={<MiniDrawer />} /> */}
      <Route exact path="/menu" element={<DateRangeCalendarValue />} />

      <Route exact path="/Department" element={<Department />} />

      <Route exact path="/newOrganisation" element={<AddOrganisation />} />

    </Routes>
  );
};
export default App;
