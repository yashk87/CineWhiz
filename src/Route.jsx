import React from "react";
import { Route, Routes } from "react-router-dom";
import DateRangeCalendarValue from "./pages/Test/test2";
import Signup from "./pages/SignUp/Signup";
import SignIn from "./pages/SignIn/SignIn";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/singin" element={<SignIn />} />
      <Route exact path="/menu" element={<DateRangeCalendarValue />} />
    </Routes>
  );
};
export default App;
