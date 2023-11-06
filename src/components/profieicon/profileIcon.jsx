import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Import the profile icon
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseContext } from "../../State/UseState/UseContext";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Notification from "./components/notification";
export default function ProfileIcon() {
  const navigate = useNavigate();
  const { cookies, removeCookie } = useContext(UseContext);
  const token = cookies["aeigs"];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    // Remove the token from cookies
    removeCookie("aeigs");
    // Close the menu
    setAnchorEl(null);
    navigate("/sign-in");
    window.location.reload();
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        className="bg-white"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar className="!bg-[#1976d2]">
          <AccountCircleIcon className="!text-white" />
        </Avatar>
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
            <>
              <MenuItem onClick={handleSignOut} className="flex gap-2">
                <ExitToAppIcon /> Logout
              </MenuItem>
              <MenuItem className="flex gap-2">
                <NotificationsIcon /> Notification
              </MenuItem>
            </>
          </>
        ) : (
          [
            <Link to="/sign-up" key="sign-up-link">
              <MenuItem onClick={handleClose} key="sign-up">
                Sign Up
              </MenuItem>
            </Link>,
            <Link to="/sign-in" key="sign-in-link">
              <MenuItem onClick={handleClose} key="sign-in">
                Sign In
              </MenuItem>
            </Link>,
          ]
        )}
      </Menu>
    </div>
  );
}
