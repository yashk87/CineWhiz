import { Box } from "@mui/material";
import React from "react";
import AppDrawer from "./components/appdrawer";

const AppLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppDrawer />
      <Box component="main" width={240} sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;
