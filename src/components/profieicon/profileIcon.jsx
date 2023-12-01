import { NotificationsOutlined, PersonOutline } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { jwtDecode } from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseContext } from "../../State/UseState/UseContext";

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
  }, [token]);

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
        className="!pt-0 !p-0 !shadow-lg "
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {token ? (
          <div>
            <MenuItem
              key="info"
              className="flex !w-[230px] flex-col !z-10 !px-0 mx-4 !py-0   !items-start !justify-start"
            >
              <div className="h-[80px] flex items-center  border-b-[.5px] border-gray-300 justify-center w-full relative bg-blue-500">
                <div className="absolute w-max h-max rounded-full top-[50%]">
                  <Avatar
                    variant="circular"
                    src="/argan_founder.png"
                    alt="none"
                    sx={{ width: 56, height: 56 }}
                    className="!rounded-[50%] ring-[3px] ring-white  !shadow-lg  !object-cover"
                  />
                  {/* <img src="/argan_founder.png" alt="user" /> */}
                </div>
              </div>
            </MenuItem>
            <MenuItem className="h-max !border !border-gray-700 !w-[230px] !pt-8 !pb-2 flex-col flex items-center justify-center !p-0  !bg-gray-100 !z-0">
              <h1 className=" italic tracking-wider  !font-semibold  text-gray-600  !text-sm !text-center">
                Mr Rahul Gaikwad
              </h1>
              <p className="text-sm text-gray-600 pb-2 ">{user?.email}</p>

              <p className="text-sm italic">
                Working as{" "}
                <Tooltip
                  title={user?.profile.map((item) => {
                    return <span>{item} , </span>;
                  })}
                >
                  <span className="text-blue-500 hover:underline ">@job</span>
                </Tooltip>
              </p>
            </MenuItem>

            <MenuItem
              key="profile"
              onClick={() => handleNavigate("/userprofile")}
              className="flex items-center justify-center !border-[.5px]  !py-2 !border-gray-500 hover:!bg-blue-500 !w-[230px] hover:text-white transition-all gap-4 "
            >
              <PersonOutline className="!text-[19px]" /> Profile
            </MenuItem>
            <MenuItem
              key="notification"
              className="flex gap-4  items-center justify-center !py-2 hover:!bg-blue-500 hover:text-white "
              onClick={() => handleNavigate("/notification")}
            >
              <NotificationsOutlined className="!text-[19px]" /> Notification
            </MenuItem>
            <MenuItem key="sign-out" className="!p-0" onClick={handleSignOut}>
              <div className="flex !border-gray-300 w-full h-full items-center  hover:!bg-red-500 !text-red-500 !py-2 hover:!text-white transition-all gap-4 border-t-[.5px] px-4">
                <ExitToAppIcon className="!text-[19px]" /> Log out
              </div>
            </MenuItem>
          </div>
        ) : (
          <>
            <Link key="sign-up-link" to="/sign-up">
              <MenuItem onClick={handleClose}>Sign Up</MenuItem>
            </Link>
            <Link key="sign-in-link" to="/sign-in">
              <MenuItem onClick={handleClose}>Sign In</MenuItem>
            </Link>
            ,
          </>
        )}
      </Menu>
    </>
  );
}
