import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About/About";
import AddOrganisation from "./pages/AddOrganisation/AddOrganisation";
import Department from "./pages/Department_page/Department";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import Signup from "./pages/SignUp/Signup";
import DateRangeCalendarValue from "./pages/Test/test2";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/sign-in" element={<SignIn />} />
      <Route exact path="/sign-up" element={<Signup />} />
      <Route exact path="/add-organisation" element={<AddOrganisation />} />
      <Route exact path="/add-department" element={<Department />} />
      <Route exact path="/menu" element={<DateRangeCalendarValue />} />
    </Routes>
  );
};
export default App;
