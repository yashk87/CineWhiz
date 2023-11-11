import React from "react";
import { Route, Routes } from "react-router-dom";
import AnimationComponent from "./components/emailverify/verification-animation";
import ForgotPassword from "./components/forgotpassword/forgotpassword";
import About from "./pages/About/About";
import AddOrganisation from "./pages/AddOrganisation/AddOrganisation";
import AddRole from "./pages/AddRole/AddRole";
import Home from "./pages/Home/Home";
import ShiftsDisp from "./pages/SetupPage/ShiftDisplay";
import Shifts from "./pages/SetupPage/Shifts";
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
      <Route exact path="/add-organisation" element={<AddOrganisation />} />
      <Route exact path="/add-department" element={<Department />} />
      <Route exact path="/menu" element={<DateRangeCalendarValue />} />
      <Route exact path="/verify/:token/" element={<AnimationComponent />} />
      <Route exact path="/forgot-password" element={<ForgotPassword />} />
      <Route exact path="/add-role" element={<AddRole />} />
      <Route exact path="/set-shifts" element={<Shifts />} />
      <Route exact path="/set-shiftsdisp" element={<ShiftsDisp />} />
    </Routes>
  );
};
export default App;
