import React from "react";
import { Route, Routes } from "react-router-dom";
import AnimationComponent from "./components/emailverify/verification-animation";
import ForgotPassword from "./components/forgotpassword/forgotpassword";
import Notification from "./components/profieicon/components/notification";
import ResetPassword from "./components/resetpassword/resetpassword";
import About from "./pages/About/About";
import AddOrganisation from "./pages/AddOrganisation/AddOrganisation";
import Home from "./pages/Home/Home";
import AddEmployee from "./pages/Home/components/addemployee";
import SingleOrganization from "./pages/Organization/SingleOrganization";
import SignIn from "./pages/SignIn/SignIn";
import Signup from "./pages/SignUp/Signup";
import DateRangeCalendarValue from "./pages/Test/test2";
import WaitMain from "./pages/Waiting-comp/waiting-main";
import Department from "./pages/addDepartment/addDepartment";
import AddRoles from "./pages/Roles/AddRoles";
import Setup from "./pages/SetUpOrganization/Setup";
import PublicHoliday from "./pages/SetUpOrganization/PublicHolidayPage/PublicHoliday";
const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/sign-in" element={<SignIn />} />
      <Route exact path="/sign-up" element={<Signup />} />
      <Route exact path="/add-organisation" element={<AddOrganisation />} />
      <Route exact path="/addDepartment" element={<Department />} />
      <Route exact path="/menu" element={<DateRangeCalendarValue />} />
      <Route exact path="/verify/:token/" element={<AnimationComponent />} />
      <Route exact path="/forgot-password" element={<ForgotPassword />} />
      <Route exact path="/waiting" element={<WaitMain />} />
      <Route exact path="/reset-password/:token" element={<ResetPassword />} />
      <Route exact path="/organisation/:id" element={<SingleOrganization />} />
      <Route
        exact
        path="/organisation/:id/add-employee"
        element={<AddEmployee />}
      />
      <Route exact path="/add-roles/:id" element={<AddRoles />} />
      <Route exact path="/notification" element={<Notification />} />
      <Route exact path="/setup/:id" element={<Setup />} />
      <Route
        exact
        path="/setup/:id/public-holidays"
        element={<PublicHoliday />}
      />
    </Routes>
  );
};
export default App;
