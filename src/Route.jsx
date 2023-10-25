import React from "react";
import { Route, Routes } from "react-router-dom";

import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import AddOrganisation from "../src/pages/AddOrganisation/AddOrganisation";
import DateRangeCalendarValue from "./pages/Test/test2";
import Department from "./pages/Department_page/Components/Department-form";

import DateRangeCalendarValue from "./pages/Test/test2";
import Signup from "./pages/SignUp/Signup";
import SignIn from "./pages/SignIn/SignIn";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/singin" element={<SignIn />} />
      <Route exact path="/menu" element={<DateRangeCalendarValue />} />

      <Route exact path="/Department" element={<Department />} />

      <Route exact path="/newOrganisation" element={<AddOrganisation />} />

    </Routes>
  );
};
export default App;
