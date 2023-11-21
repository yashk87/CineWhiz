import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseContext } from "../../State/UseState/UseContext";
import { Divider } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Person } from "@mui/icons-material";

export default function ProfileIcon() {
  const navigate = useNavigate();
  const { cookies, removeCookie } = useContext(UseContext);
  const token = cookies["aeigs"];
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [user, setUser] = useState();

  useEffect(() => {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.user) {
        setUser(decodedToken.user);
      } else {
        setUser();
      }
    } catch (error) {
      console.error("Failed to decode the token:", error);
    }
  }, []);

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

  const handleNavigate = (link) => {
    navigate(link);
    setAnchorEl(null);
  };

  console.log(user);

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
        <Avatar className="!bg-[#1976d2]">
          <AccountCircleIcon className="!text-white" />
        </Avatar>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="!px-4"
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {token
          ? [
              <MenuItem
                key="Info"
                className="flex flex-col !pl-6   !pt-2 !w-full  !items-start !justify-start"
              >
                <h1 className="!font-semibold !text-md  pr-32">Signed in as</h1>
                <p className="text-sm !font-semibold">{user?.email}</p>
              </MenuItem>,
              <>
                <div className="w-full !mt-2">
                  <Divider />
                </div>

                <MenuItem
                  key="profile"
                  onClick={() => handleNavigate("/userprofile")}
                  className="flex hover:!bg-blue-500 hover:text-white transition-all gap-2"
                >
                  <Person /> Profile
                </MenuItem>
              </>,
              <MenuItem
                key="notification"
                className="flex gap-2 hover:!bg-blue-500 hover:text-white "
                onClick={() => handleNavigate("/notification")}
              >
                <NotificationsIcon /> Notification
              </MenuItem>,
              <MenuItem
                key="sign-out"
                onClick={handleSignOut}
                className="flex hover:!bg-red-500 hover:text-white transition-all gap-2"
              >
                <ExitToAppIcon /> Logout
              </MenuItem>,
            ]
          : [
              <Link key="sign-up-link" to="/sign-up">
                <MenuItem onClick={handleClose}>Sign Up</MenuItem>
              </Link>,
              <Link key="sign-in-link" to="/sign-in">
                <MenuItem onClick={handleClose}>Sign In</MenuItem>
              </Link>,
            ]}
      </Menu>
    </>
  );
}
