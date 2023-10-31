import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import Signup from "./pages/SignUp/Signup";
import DateRangeCalendarValue from "./pages/Test/test2";
import Department from "./pages/addDepartment/addDepartment";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/sign-in" element={<SignIn />} />
      <Route exact path="/sign-up" element={<Signup />} />
      <Route exact path="/addDepartment" element={<Department />} />

      {/* <Route exact path="/menu" element={<MiniDrawer />} /> */}
      <Route exact path="/menu" element={<DateRangeCalendarValue />} />
    </Routes>
  );
};
export default App;
