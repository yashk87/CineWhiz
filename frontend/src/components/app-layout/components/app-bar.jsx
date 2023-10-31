import MenuIcon from "@mui/icons-material/Menu";
import { Badge, Typography, styled } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import ProfileIcon from "../../profieicon/profileIcon";

const AppBarComponent = ({ handleDrawerOpen }) => {
  const drawerWidth = 240;

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  return (
    <AppBar
      className="bg-white"
      style={{ background: "white", color: "#1976d2" }}
      position="fixed"
    >
      <Toolbar className="justify-between">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Badge
          badgeContent={
            <div className=" text-sm rounded-full text-white box-border flex items-center justify-center">
              +
            </div>
          }
          color="primary"
        >
          <Typography variant="h6" noWrap component="div">
            AegisPlus
          </Typography>
        </Badge>
        <ProfileIcon />
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
