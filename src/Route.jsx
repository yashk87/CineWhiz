import React from "react";
import { Route, Routes } from "react-router-dom";
import Emailverify from "./components/emailverify/emailverify";
import PhoneAuthenticate from "./components/phoneauthenticate/phoneauthenticate";
import About from "./pages/About/About";
import AddOrganisation from "./pages/AddOrganisation/AddOrganisation";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import Signup from "./pages/SignUp/Signup";
import DateRangeCalendarValue from "./pages/Test/test2";
import WaitMain from "./pages/Waiting-comp/waiting-main";
import Department from "./pages/addDepartment/addDepartment";
const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/sign-in" element={<SignIn />} />s
      <Route exact path="/sign-up" element={<Signup />} />
      <Route exact path="/add-organisation" element={<AddOrganisation />} />
      <Route exact path="/addDepartment" element={<Department />} />
      <Route exact path="/menu" element={<DateRangeCalendarValue />} />
      <Route exact path="/verify/:token/" element={<Emailverify />} />
      <Route exact path="/phone-authenticate" element={<PhoneAuthenticate />} />
      <Route path="/waiting" element={<WaitMain />} />
    </Routes>
  );
};
export default App;
