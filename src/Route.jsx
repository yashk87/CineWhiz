import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import MiniDrawer from "./pages/Test/test";
const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/menu" element={<MiniDrawer />} />
      {/* <Route exact path="/menu" element={<DateRangeCalendarValue />} /> */}
    </Routes>
  );
};
export default App;
