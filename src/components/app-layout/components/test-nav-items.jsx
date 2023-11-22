import {
  AccessTime,
  AddAlert,
  Category,
  EventNote,
  ExpandMore,
  ListAlt,
  MonetizationOn,
  Report,
  Settings,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { jwtDecode } from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UseContext } from "../../../State/UseState/UseContext";

const TestNavItems = ({ toggleDrawer }) => {
  const { cookies } = useContext(UseContext);
  const [userRoutes, setuserRoutes] = useState(null);
  const token = cookies["aeigs"];

  useEffect(() => {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.user.profile) {
        setuserRoutes(decodedToken.user.profile);
      }
    } catch (error) {
      console.error("Failed to decode the token:", error);
    }
  }, [token]);

  const roleSpecificItems = {
    "Self Help": {
      icon: <Category className="text-white" />, // Replace YourSelfHelpIcon with the actual icon component
      routes: [
        {
          key: "attendance",
          link: "/your-attendance",
          icon: <AccessTime className="text-white" />,
          text: "Your Attendance",
        },
        {
          key: "leave",
          link: "/apply-for-leave",
          icon: <EventNote className="text-white" />, // Replace with the actual icon you want for leave
          text: "Apply For Leave",
        },
        {
          key: "accountSettings",
          link: "/account-settings",
          icon: <Settings className="text-white" />,
          text: "Account Settings",
        },
        {
          key: "complaint",
          link: "/apply-for-complaint",
          icon: <Report className="text-white" />,
          text: "Apply For Complaint",
        },
      ],
    },
    Notification: {
      icon: <MonetizationOn className="text-white" />, // Replace YourNotificationIcon with the actual icon component
      routes: [
        {
          key: "createNotification",
          link: "/create-notification",
          icon: <AddAlert className="text-white" />,
          text: "Create Notification",
        },
        {
          key: "listNotification",
          link: "/list-notification",
          icon: <ListAlt className="text-white" />,
          text: "List Notification",
        },
      ],
    },
  };

  return (
    <>
      {Object.keys(roleSpecificItems).map((role) => {
        const { icon, routes } = roleSpecificItems[role];

        return (
          <List key={role}>
            <ListItem onClick={(e) => e.stopPropagation()}>
              <Accordion
                expanded={role === "Self Help" ? true : undefined}
                className="w-full !shadow-none border-[#0093d6] border-none"
                style={{ background: "rgb(14, 165, 233)" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore className="text-white" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className="flex gap-2"
                >
                  <ListItemIcon className="p-2 !min-w-[25px]">
                    {icon}
                  </ListItemIcon>
                  <Typography className="text-white flex items-center">
                    {role}
                  </Typography>
                </AccordionSummary>
                {routes.map((route) => (
                  <ListItem disablePadding key={route.key}>
                    <Link
                      onClick={() => toggleDrawer()}
                      to={route.link}
                      className="w-full"
                    >
                      <ListItemButton className="!p-2 !rounded-lg w-full">
                        <ListItemIcon className="p-2 !min-w-[25px]">
                          {route.icon}
                        </ListItemIcon>
                        <ListItemText
                          primaryTypographyProps={{
                            style: { fontSize: 13 },
                          }}
                          style={{ fontSize: "10px" }}
                          className="text-white text-sm"
                          primary={route.text}
                        />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ))}
              </Accordion>
            </ListItem>
          </List>
        );
      })}
    </>
  );
};

export default TestNavItems;
