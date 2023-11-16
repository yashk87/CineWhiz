import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseContext } from "../../State/UseState/UseContext";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsIcon from "@mui/icons-material/Settings"; // Import the settings icon
import { jwtDecode } from "jwt-decode";

export default function ProfileIcon() {
  const navigate = useNavigate();
  const { cookies, removeCookie } = useContext(UseContext);
  const token = cookies["aeigs"];
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [userName, setUserName] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    removeCookie("aeigs");
    setAnchorEl(null);
    navigate("/sign-in");
    window.location.reload();
  };

  const handleNotificationClick = () => {
    navigate("/notification");
    setAnchorEl(null);
  };

  const handleSettingsClick = () => {
    navigate("/account-settings"); // Replace with your account settings page
    setAnchorEl(null);
  };

  useEffect(() => {
    const decodeToken = () => {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
      } catch (error) {
        console.error("Error decoding token", error);
      }
    };

    if (token) {
      decodeToken();
    }
  }, [token]);

  return (
    <>
      <IconButton
        id="basic-button"
        className="bg-white"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {token ? (
          <Avatar className="!bg-[#1976d2]">
            <AccountCircleIcon className="!text-white" />
          </Avatar>
        ) : (
          <Avatar className="!bg-[#1976d2]">
            <AccountCircleIcon className="!text-white" />
          </Avatar>
        )}
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {token ? (
          <>
            <MenuItem onClick={handleSettingsClick} className="flex gap-2">
              <SettingsIcon /> Account Settings
            </MenuItem>
            <MenuItem onClick={handleSignOut} className="flex gap-2">
              <ExitToAppIcon /> Logout
            </MenuItem>
            <MenuItem className="flex gap-2" onClick={handleNotificationClick}>
              <NotificationsIcon /> Notification
            </MenuItem>
            <MenuItem disabled>{userName}</MenuItem>
          </>
        ) : (
          <>
            <Link to="/sign-up">
              <MenuItem onClick={handleClose}>Sign Up</MenuItem>
            </Link>
            <Link to="/sign-in">
              <MenuItem onClick={handleClose}>Sign In</MenuItem>
            </Link>
          </>
        )}
      </Menu>
    </>
  );
}
