import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
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
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ReportIcon from "@mui/icons-material/Report";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CategoryIcon from "@mui/icons-material/Category";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const NavItems = ({ toggleDrawer }) => {
  const [userRole, setUserRole] = useState(null);
  const { cookies } = useContext(UseContext);
  const token = cookies["aeigs"];
  console.log(token);
  console.log("userole", userRole);

  useEffect(() => {
    try {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      console.log(decodedToken.user.profile);
      if (decodedToken && decodedToken.user.profile) {
        setUserRole(decodedToken.user.profile);
      } else {
        setUserRole("guest");
      }
    } catch (error) {
      console.error("Failed to decode the token:", error);
    }
  }, []);
  let isCommonComponentsRendered = false;
  return (
    <div className="bg-blue">
      {userRole === null ? (
        <p>Loading ...</p>
      ) : (
        <>
          {userRole.map((role, index) => (
            <div key={index}>
              {(() => {
                switch (role) {
                  case "Employee":
                    return (
                      <List>
                        <ListItem onClick={(e) => e.stopPropagation()}>
                          <Accordion
                            expanded={true}
                            className="w-full !shadow-none border-[#0093d6] border"
                            style={{ background: "rgb(14, 165, 233)" }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMore className="text-white" />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography className="text-white">
                                Employee
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <List>
                                <ListItem disablePadding>
                                  <Link
                                    onClick={() => toggleDrawer()}
                                    to="#"
                                    className="w-full"
                                  >
                                    <ListItemButton className="!p-2 !rounded-lg w-full">
                                      <ListItemIcon className="p-2 !min-w-[25px]">
                                        <AccessTimeIcon className="text-white" />
                                      </ListItemIcon>
                                      <ListItemText
                                        primaryTypographyProps={{
                                          style: { fontSize: 13 },
                                        }}
                                        style={{ fontSize: "10px" }}
                                        className="text-white text-sm"
                                        primary={"Your Attendance"}
                                      />
                                    </ListItemButton>
                                  </Link>
                                </ListItem>
                                <ListItem disablePadding>
                                  <Link
                                    onClick={() => toggleDrawer()}
                                    to="#"
                                    className="w-full"
                                  >
                                    <ListItemButton className="!p-2 !rounded-lg w-full">
                                      <ListItemIcon className="p-2 !min-w-[25px]">
                                        <EventNoteIcon className="text-white" />
                                      </ListItemIcon>
                                      <ListItemText
                                        primaryTypographyProps={{
                                          style: { fontSize: 13 },
                                        }}
                                        style={{ fontSize: "10px" }}
                                        className="text-white text-sm"
                                        primary={"Apply For Leave"}
                                      />
                                    </ListItemButton>
                                  </Link>
                                </ListItem>
                                <ListItem disablePadding>
                                  <Link
                                    onClick={() => toggleDrawer()}
                                    to="#"
                                    className="w-full"
                                  >
                                    <ListItemButton className="!p-2 !rounded-lg w-full">
                                      <ListItemIcon className="p-2 !min-w-[25px]">
                                        <SettingsIcon className="text-white" />
                                      </ListItemIcon>
                                      <ListItemText
                                        primaryTypographyProps={{
                                          style: { fontSize: 13 },
                                        }}
                                        style={{ fontSize: "10px" }}
                                        className="text-white text-sm"
                                        primary={"Account Setting's"}
                                      />
                                    </ListItemButton>
                                  </Link>
                                </ListItem>
                                <ListItem disablePadding>
                                  <Link
                                    onClick={() => toggleDrawer()}
                                    to="#"
                                    className="w-full"
                                  >
                                    <ListItemButton className="!p-2 !rounded-lg w-full">
                                      <ListItemIcon className="p-2 !min-w-[25px]">
                                        <ReportIcon className="text-white" />
                                      </ListItemIcon>
                                      <ListItemText
                                        primaryTypographyProps={{
                                          style: { fontSize: 13 },
                                        }}
                                        style={{ fontSize: "10px" }}
                                        className="text-white text-sm"
                                        primary={"Apply For Complaint"}
                                      />
                                    </ListItemButton>
                                  </Link>
                                </ListItem>
                                <Accordion
                                  className="w-full !shadow-none border-[#0093d6] border"
                                  style={{ background: "rgb(14, 165, 233)" }}
                                >
                                  <AccordionSummary
                                    expandIcon={
                                      <ExpandMoreIcon className="text-white" />
                                    }
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                  >
                                    <Typography className="text-white">
                                      Notification
                                    </Typography>
                                  </AccordionSummary>
                                  <List>
                                    <ListItem disablePadding>
                                      <Link
                                        onClick={() => toggleDrawer()}
                                        to="#"
                                        className="w-full"
                                      >
                                        <ListItemButton className="!p-2 !rounded-lg w-full">
                                          <ListItemIcon className="p-2 !min-w-[25px]">
                                            <AddAlertIcon className="text-white" />
                                          </ListItemIcon>
                                          <ListItemText
                                            primaryTypographyProps={{
                                              style: { fontSize: 13 },
                                            }}
                                            style={{ fontSize: "10px" }}
                                            className="text-white text-sm"
                                            primary={"Create Notification"}
                                          />
                                        </ListItemButton>
                                      </Link>
                                    </ListItem>
                                    <ListItem disablePadding>
                                      <Link
                                        onClick={() => toggleDrawer()}
                                        to="#"
                                        className="w-full"
                                      >
                                        <ListItemButton className="!p-2 !rounded-lg w-full">
                                          <ListItemIcon className="p-2 !min-w-[25px]">
                                            <ListAltIcon className="text-white" />
                                          </ListItemIcon>
                                          <ListItemText
                                            primaryTypographyProps={{
                                              style: { fontSize: 13 },
                                            }}
                                            style={{ fontSize: "10px" }}
                                            className="text-white text-sm"
                                            primary={"List Notification"}
                                          />
                                        </ListItemButton>
                                      </Link>
                                    </ListItem>
                                  </List>
                                </Accordion>
                              </List>
                            </AccordionDetails>
                          </Accordion>
                        </ListItem>
                      </List>
                    );

                  case "Manager":
                    return (
                      <List>
                        <ListItem onClick={(e) => e.stopPropagation()}>
                          <Accordion
                            expanded={true}
                            className="w-full !shadow-none border-[#0093d6] border"
                            style={{ background: "rgb(14, 165, 233)" }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMore className="text-white" />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography className="text-white">
                                Manager
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <List>
                                <ListItem disablePadding>
                                  <Link
                                    onClick={() => toggleDrawer()}
                                    to="#"
                                    className="w-full"
                                  >
                                    <ListItemButton className="!p-2 !rounded-lg w-full">
                                      <ListItemIcon className="p-2 !min-w-[25px]">
                                        <AccessTimeIcon className="text-white" />
                                      </ListItemIcon>
                                      <ListItemText
                                        primaryTypographyProps={{
                                          style: { fontSize: 13 },
                                        }}
                                        style={{ fontSize: "10px" }}
                                        className="text-white text-sm"
                                        primary={"Your Attendance"}
                                      />
                                    </ListItemButton>
                                  </Link>
                                </ListItem>
                                <ListItem disablePadding>
                                  <Link
                                    onClick={() => toggleDrawer()}
                                    to="#"
                                    className="w-full"
                                  >
                                    <ListItemButton className="!p-2 !rounded-lg w-full">
                                      <ListItemIcon className="p-2 !min-w-[25px]">
                                        <EventNoteIcon className="text-white" />
                                      </ListItemIcon>
                                      <ListItemText
                                        primaryTypographyProps={{
                                          style: { fontSize: 13 },
                                        }}
                                        style={{ fontSize: "10px" }}
                                        className="text-white text-sm"
                                        primary={"Apply For Leave"}
                                      />
                                    </ListItemButton>
                                  </Link>
                                </ListItem>
                                <ListItem disablePadding>
                                  <Link
                                    onClick={() => toggleDrawer()}
                                    to="#"
                                    className="w-full"
                                  >
                                    <ListItemButton className="!p-2 !rounded-lg w-full">
                                      <ListItemIcon className="p-2 !min-w-[25px]">
                                        <SettingsIcon className="text-white" />
                                      </ListItemIcon>
                                      <ListItemText
                                        primaryTypographyProps={{
                                          style: { fontSize: 13 },
                                        }}
                                        style={{ fontSize: "10px" }}
                                        className="text-white text-sm"
                                        primary={"Account Setting's"}
                                      />
                                    </ListItemButton>
                                  </Link>
                                </ListItem>
                                <ListItem disablePadding>
                                  <Link
                                    onClick={() => toggleDrawer()}
                                    to="#"
                                    className="w-full"
                                  >
                                    <ListItemButton className="!p-2 !rounded-lg w-full">
                                      <ListItemIcon className="p-2 !min-w-[25px]">
                                        <CheckCircleIcon className="text-white" />
                                      </ListItemIcon>
                                      <ListItemText
                                        primaryTypographyProps={{
                                          style: { fontSize: 13 },
                                        }}
                                        style={{ fontSize: "10px" }}
                                        className="text-white text-sm"
                                        primary={"Approval"}
                                      />
                                    </ListItemButton>
                                  </Link>
                                </ListItem>
                                <ListItem disablePadding>
                                  <Link
                                    onClick={() => toggleDrawer()}
                                    to="#"
                                    className="w-full"
                                  >
                                    <ListItemButton className="!p-2 !rounded-lg w-full">
                                      <ListItemIcon className="p-2 !min-w-[25px]">
                                        <PeopleIcon className="text-white" />
                                      </ListItemIcon>
                                      <ListItemText
                                        primaryTypographyProps={{
                                          style: { fontSize: 13 },
                                        }}
                                        style={{ fontSize: "10px" }}
                                        className="text-white text-sm"
                                        primary={"Employee List"}
                                      />
                                    </ListItemButton>
                                  </Link>
                                </ListItem>
                                <Accordion
                                  className="w-full !shadow-none border-[#0093d6] border"
                                  style={{ background: "rgb(14, 165, 233)" }}
                                >
                                  <AccordionSummary
                                    expandIcon={
                                      <ExpandMoreIcon className="text-white" />
                                    }
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                  >
                                    <Typography className="text-white">
                                      Notification
                                    </Typography>
                                  </AccordionSummary>
                                  <List>
                                    <ListItem disablePadding>
                                      <Link
                                        onClick={() => toggleDrawer()}
                                        to="#"
                                        className="w-full"
                                      >
                                        <ListItemButton className="!p-2 !rounded-lg w-full">
                                          <ListItemIcon className="p-2 !min-w-[25px]">
                                            <AddAlertIcon className="text-white" />
                                          </ListItemIcon>
                                          <ListItemText
                                            primaryTypographyProps={{
                                              style: { fontSize: 13 },
                                            }}
                                            style={{ fontSize: "10px" }}
                                            className="text-white text-sm"
                                            primary={"Create Notification"}
                                          />
                                        </ListItemButton>
                                      </Link>
                                    </ListItem>
                                    <ListItem disablePadding>
                                      <Link
                                        onClick={() => toggleDrawer()}
                                        to="#"
                                        className="w-full"
                                      >
                                        <ListItemButton className="!p-2 !rounded-lg w-full">
                                          <ListItemIcon className="p-2 !min-w-[25px]">
                                            <ListAltIcon className="text-white" />
                                          </ListItemIcon>
                                          <ListItemText
                                            primaryTypographyProps={{
                                              style: { fontSize: 13 },
                                            }}
                                            style={{ fontSize: "10px" }}
                                            className="text-white text-sm"
                                            primary={"List Notification"}
                                          />
                                        </ListItemButton>
                                      </Link>
                                    </ListItem>
                                  </List>
                                </Accordion>
                              </List>
                            </AccordionDetails>
                          </Accordion>
                        </ListItem>
                      </List>
                    );

                  case "Department Admin":
                    return (
                      <List>
                        <ListItem onClick={(e) => e.stopPropagation()}>
                          <Accordion
                            expanded={true}
                            className="w-full !shadow-none border-[#0093d6] border"
                            style={{ background: "rgb(14, 165, 233)" }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMore className="text-white" />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography className="text-white">
                                Department Admin
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <List>
                                <ListItem disablePadding>
                                  <Link
                                    onClick={() => toggleDrawer()}
                                    to="#"
                                    className="w-full"
                                  >
                                    <ListItemButton className="!p-2 !rounded-lg w-full">
                                      <ListItemIcon className="p-2 !min-w-[25px]">
                                        <AccessTimeIcon className="text-white" />
                                      </ListItemIcon>
                                      <ListItemText
                                        primaryTypographyProps={{
                                          style: { fontSize: 13 },
                                        }}
                                        style={{ fontSize: "10px" }}
                                        className="text-white text-sm"
                                        primary={"Your Attendance"}
                                      />
                                    </ListItemButton>
                                  </Link>
                                </ListItem>
                                <ListItem disablePadding>
                                  <Link
                                    onClick={() => toggleDrawer()}
                                    to="#"
                                    className="w-full"
                                  >
                                    <ListItemButton className="!p-2 !rounded-lg w-full">
                                      <ListItemIcon className="p-2 !min-w-[25px]">
                                        <EventNoteIcon className="text-white" />
                                      </ListItemIcon>
                                      <ListItemText
                                        primaryTypographyProps={{
                                          style: { fontSize: 13 },
                                        }}
                                        style={{ fontSize: "10px" }}
                                        className="text-white text-sm"
                                        primary={"Apply For Leave"}
                                      />
                                    </ListItemButton>
                                  </Link>
                                </ListItem>
                                <ListItem disablePadding>
                                  <Link
                                    onClick={() => toggleDrawer()}
                                    to="#"
                                    className="w-full"
                                  >
                                    <ListItemButton className="!p-2 !rounded-lg w-full">
                                      <ListItemIcon className="p-2 !min-w-[25px]">
                                        <SettingsIcon className="text-white" />
                                      </ListItemIcon>
                                      <ListItemText
                                        primaryTypographyProps={{
                                          style: { fontSize: 13 },
                                        }}
                                        style={{ fontSize: "10px" }}
                                        className="text-white text-sm"
                                        primary={"Account Setting's"}
                                      />
                                    </ListItemButton>
                                  </Link>
                                </ListItem>
                                <ListItem disablePadding>
                                  <Link
                                    onClick={() => toggleDrawer()}
                                    to="#"
                                    className="w-full"
                                  >
                                    <ListItemButton className="!p-2 !rounded-lg w-full">
                                      <ListItemIcon className="p-2 !min-w-[25px]">
                                        <PeopleIcon className="text-white" />
                                      </ListItemIcon>
                                      <ListItemText
                                        primaryTypographyProps={{
                                          style: { fontSize: 13 },
                                        }}
                                        style={{ fontSize: "10px" }}
                                        className="text-white text-sm"
                                        primary={"Leave Application"}
                                      />
                                    </ListItemButton>
                                  </Link>
                                </ListItem>
                                <Accordion
                                  className="w-full !shadow-none border-[#0093d6] border"
                                  style={{ background: "rgb(14, 165, 233)" }}
                                >
                                  <AccordionSummary
                                    expandIcon={
                                      <ExpandMoreIcon className="text-white" />
                                    }
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                  >
                                    <Typography className="text-white">
                                      Notification
                                    </Typography>
                                  </AccordionSummary>
                                  <List>
                                    <ListItem disablePadding>
                                      <Link
                                        onClick={() => toggleDrawer()}
                                        to="#"
                                        className="w-full"
                                      >
                                        <ListItemButton className="!p-2 !rounded-lg w-full">
                                          <ListItemIcon className="p-2 !min-w-[25px]">
                                            <AddAlertIcon className="text-white" />
                                          </ListItemIcon>
                                          <ListItemText
                                            primaryTypographyProps={{
                                              style: { fontSize: 13 },
                                            }}
                                            style={{ fontSize: "10px" }}
                                            className="text-white text-sm"
                                            primary={"Create Notification"}
                                          />
                                        </ListItemButton>
                                      </Link>
                                    </ListItem>
                                    <ListItem disablePadding>
                                      <Link
                                        onClick={() => toggleDrawer()}
                                        to="#"
                                        className="w-full"
                                      >
                                        <ListItemButton className="!p-2 !rounded-lg w-full">
                                          <ListItemIcon className="p-2 !min-w-[25px]">
                                            <ListAltIcon className="text-white" />
                                          </ListItemIcon>
                                          <ListItemText
                                            primaryTypographyProps={{
                                              style: { fontSize: 13 },
                                            }}
                                            style={{ fontSize: "10px" }}
                                            className="text-white text-sm"
                                            primary={"List Notification"}
                                          />
                                        </ListItemButton>
                                      </Link>
                                    </ListItem>
                                  </List>
                                </Accordion>
                                <Accordion
                                  className="w-full !shadow-none border-[#0093d6] border"
                                  style={{ background: "rgb(14, 165, 233)" }}
                                >
                                  <AccordionSummary
                                    expandIcon={
                                      <ExpandMoreIcon className="text-white" />
                                    }
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                  >
                                    <Typography className="text-white">
                                      Employee
                                    </Typography>
                                  </AccordionSummary>
                                  <List>
                                    <ListItem disablePadding>
                                      <Link
                                        onClick={() => toggleDrawer()}
                                        to="#"
                                        className="w-full"
                                      >
                                        <ListItemButton className="!p-2 !rounded-lg w-full">
                                          <ListItemIcon className="p-2 !min-w-[25px]">
                                            <PersonAddIcon className="text-white" />
                                          </ListItemIcon>
                                          <ListItemText
                                            primaryTypographyProps={{
                                              style: { fontSize: 13 },
                                            }}
                                            style={{ fontSize: "10px" }}
                                            className="text-white text-sm"
                                            primary={"Add Employee"}
                                          />
                                        </ListItemButton>
                                      </Link>
                                    </ListItem>
                                    <ListItem disablePadding>
                                      <Link
                                        onClick={() => toggleDrawer()}
                                        to="#"
                                        className="w-full"
                                      >
                                        <ListItemButton className="!p-2 !rounded-lg w-full">
                                          <ListItemIcon className="p-2 !min-w-[25px]">
                                            <EditIcon className="text-white" />
                                          </ListItemIcon>
                                          <ListItemText
                                            primaryTypographyProps={{
                                              style: { fontSize: 13 },
                                            }}
                                            style={{ fontSize: "10px" }}
                                            className="text-white text-sm"
                                            primary={"Update Employee"}
                                          />
                                        </ListItemButton>
                                      </Link>
                                    </ListItem>
                                    <ListItem disablePadding>
                                      <Link
                                        onClick={() => toggleDrawer()}
                                        to="#"
                                        className="w-full"
                                      >
                                        <ListItemButton className="!p-2 !rounded-lg w-full">
                                          <ListItemIcon className="p-2 !min-w-[25px]">
                                            <DeleteIcon className="text-white" />
                                          </ListItemIcon>
                                          <ListItemText
                                            primaryTypographyProps={{
                                              style: { fontSize: 13 },
                                            }}
                                            style={{ fontSize: "10px" }}
                                            className="text-white text-sm"
                                            primary={"Delete Employee"}
                                          />
                                        </ListItemButton>
                                      </Link>
                                    </ListItem>
                                    <ListItem disablePadding>
                                      <Link
                                        onClick={() => toggleDrawer()}
                                        to="#"
                                        className="w-full"
                                      >
                                        <ListItemButton className="!p-2 !rounded-lg w-full">
                                          <ListItemIcon className="p-2 !min-w-[25px]">
                                            <ListAltIcon className="text-white" />
                                          </ListItemIcon>
                                          <ListItemText
                                            primaryTypographyProps={{
                                              style: { fontSize: 13 },
                                            }}
                                            style={{ fontSize: "10px" }}
                                            className="text-white text-sm"
                                            primary={"Employee List"}
                                          />
                                        </ListItemButton>
                                      </Link>
                                    </ListItem>
                                  </List>
                                </Accordion>
                              </List>
                            </AccordionDetails>
                          </Accordion>
                        </ListItem>
                      </List>
                    );

                  case "Department Head":
                    return (
                      <List>
                        <ListItem onClick={(e) => e.stopPropagation()}>
                          <Accordion
                            expanded={true}
                            className="w-full !shadow-none border-[#0093d6] border"
                            style={{ background: "rgb(14, 165, 233)" }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMore className="text-white" />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography
                                className="text-white"
                                style={{ fontSize: "15px" }}
                              >
                                Department Head
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <List>
                                <ListItem disablePadding>
                                  <Link
                                    onClick={() => toggleDrawer()}
                                    to="#"
                                    className="w-full"
                                  >
                                    <ListItemButton className="!p-2 !rounded-lg w-full">
                                      <ListItemIcon className="p-2 !min-w-[25px]">
                                        <AccessTimeIcon className="text-white" />
                                      </ListItemIcon>
                                      <ListItemText
                                        primaryTypographyProps={{
                                          style: { fontSize: 13 },
                                        }}
                                        style={{ fontSize: "10px" }}
                                        className="text-white text-sm"
                                        primary={"Your Attendance"}
                                      />
                                    </ListItemButton>
                                  </Link>
                                </ListItem>
                                <ListItem disablePadding>
                                  <Link
                                    onClick={() => toggleDrawer()}
                                    to="#"
                                    className="w-full"
                                  >
                                    <ListItemButton className="!p-2 !rounded-lg w-full">
                                      <ListItemIcon className="p-2 !min-w-[25px]">
                                        <EventNoteIcon className="text-white" />
                                      </ListItemIcon>
                                      <ListItemText
                                        primaryTypographyProps={{
                                          style: { fontSize: 13 },
                                        }}
                                        style={{ fontSize: "10px" }}
                                        className="text-white text-sm"
                                        primary={"Apply For Leave"}
                                      />
                                    </ListItemButton>
                                  </Link>
                                </ListItem>
                                <ListItem disablePadding>
                                  <Link
                                    onClick={() => toggleDrawer()}
                                    to="#"
                                    className="w-full"
                                  >
                                    <ListItemButton className="!p-2 !rounded-lg w-full">
                                      <ListItemIcon className="p-2 !min-w-[25px]">
                                        <SettingsIcon className="text-white" />
                                      </ListItemIcon>
                                      <ListItemText
                                        primaryTypographyProps={{
                                          style: { fontSize: 13 },
                                        }}
                                        style={{ fontSize: "10px" }}
                                        className="text-white text-sm"
                                        primary={"Account Setting's"}
                                      />
                                    </ListItemButton>
                                  </Link>
                                </ListItem>
                                <ListItem disablePadding>
                                  <Link
                                    onClick={() => toggleDrawer()}
                                    to="#"
                                    className="w-full"
                                  >
                                    <ListItemButton className="!p-2 !rounded-lg w-full">
                                      <ListItemIcon className="p-2 !min-w-[25px]">
                                        <PeopleIcon className="text-white" />
                                      </ListItemIcon>
                                      <ListItemText
                                        primaryTypographyProps={{
                                          style: { fontSize: 13 },
                                        }}
                                        style={{ fontSize: "10px" }}
                                        className="text-white text-sm"
                                        primary={"Leave Application"}
                                      />
                                    </ListItemButton>
                                  </Link>
                                </ListItem>
                                <Accordion
                                  className="w-full !shadow-none border-[#0093d6] border"
                                  style={{ background: "rgb(14, 165, 233)" }}
                                >
                                  <AccordionSummary
                                    expandIcon={
                                      <ExpandMoreIcon className="text-white" />
                                    }
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                  >
                                    <Typography className="text-white">
                                      Notification
                                    </Typography>
                                  </AccordionSummary>
                                  <List>
                                    <ListItem disablePadding>
                                      <Link
                                        onClick={() => toggleDrawer()}
                                        to="#"
                                        className="w-full"
                                      >
                                        <ListItemButton className="!p-2 !rounded-lg w-full">
                                          <ListItemIcon className="p-2 !min-w-[25px]">
                                            <AddAlertIcon className="text-white" />
                                          </ListItemIcon>
                                          <ListItemText
                                            primaryTypographyProps={{
                                              style: { fontSize: 13 },
                                            }}
                                            style={{ fontSize: "10px" }}
                                            className="text-white text-sm"
                                            primary={"Create Notification"}
                                          />
                                        </ListItemButton>
                                      </Link>
                                    </ListItem>
                                    <ListItem disablePadding>
                                      <Link
                                        onClick={() => toggleDrawer()}
                                        to="#"
                                        className="w-full"
                                      >
                                        <ListItemButton className="!p-2 !rounded-lg w-full">
                                          <ListItemIcon className="p-2 !min-w-[25px]">
                                            <ListAltIcon className="text-white" />
                                          </ListItemIcon>
                                          <ListItemText
                                            primaryTypographyProps={{
                                              style: { fontSize: 13 },
                                            }}
                                            style={{ fontSize: "10px" }}
                                            className="text-white text-sm"
                                            primary={"List Notification"}
                                          />
                                        </ListItemButton>
                                      </Link>
                                    </ListItem>
                                  </List>
                                </Accordion>
                                <Accordion
                                  className="w-full !shadow-none border-[#0093d6] border"
                                  style={{ background: "rgb(14, 165, 233)" }}
                                >
                                  <AccordionSummary
                                    expandIcon={
                                      <ExpandMoreIcon className="text-white" />
                                    }
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                  >
                                    <Typography className="text-white">
                                      Department
                                    </Typography>
                                  </AccordionSummary>
                                  <List>
                                    <ListItem disablePadding>
                                      <Link
                                        onClick={() => toggleDrawer()}
                                        to="#"
                                        className="w-full"
                                      >
                                        <ListItemButton className="!p-2 !rounded-lg w-full">
                                          <ListItemIcon className="p-2 !min-w-[25px]">
                                            <PersonAddIcon className="text-white" />
                                          </ListItemIcon>
                                          <ListItemText
                                            primaryTypographyProps={{
                                              style: { fontSize: 13 },
                                            }}
                                            style={{ fontSize: "10px" }}
                                            className="text-white text-sm"
                                            primary={"Add Department"}
                                          />
                                        </ListItemButton>
                                      </Link>
                                    </ListItem>
                                    <ListItem disablePadding>
                                      <Link
                                        onClick={() => toggleDrawer()}
                                        to="#"
                                        className="w-full"
                                      >
                                        <ListItemButton className="!p-2 !rounded-lg w-full">
                                          <ListItemIcon className="p-2 !min-w-[25px]">
                                            <EditIcon className="text-white" />
                                          </ListItemIcon>
                                          <ListItemText
                                            primaryTypographyProps={{
                                              style: { fontSize: 13 },
                                            }}
                                            style={{ fontSize: "10px" }}
                                            className="text-white text-sm"
                                            primary={"Update Department"}
                                          />
                                        </ListItemButton>
                                      </Link>
                                    </ListItem>
                                    <ListItem disablePadding>
                                      <Link
                                        onClick={() => toggleDrawer()}
                                        to="#"
                                        className="w-full"
                                      >
                                        <ListItemButton className="!p-2 !rounded-lg w-full">
                                          <ListItemIcon className="p-2 !min-w-[25px]">
                                            <DeleteIcon className="text-white" />
                                          </ListItemIcon>
                                          <ListItemText
                                            primaryTypographyProps={{
                                              style: { fontSize: 13 },
                                            }}
                                            style={{ fontSize: "10px" }}
                                            className="text-white text-sm"
                                            primary={"Delete Department"}
                                          />
                                        </ListItemButton>
                                      </Link>
                                    </ListItem>
                                    <ListItem disablePadding>
                                      <Link
                                        onClick={() => toggleDrawer()}
                                        to="#"
                                        className="w-full"
                                      >
                                        <ListItemButton className="!p-2 !rounded-lg w-full">
                                          <ListItemIcon className="p-2 !min-w-[25px]">
                                            <CategoryIcon className="text-white" />
                                          </ListItemIcon>
                                          <ListItemText
                                            primaryTypographyProps={{
                                              style: { fontSize: 13 },
                                            }}
                                            style={{ fontSize: "10px" }}
                                            className="text-white text-sm"
                                            primary={"Department List"}
                                          />
                                        </ListItemButton>
                                      </Link>
                                    </ListItem>
                                  </List>
                                </Accordion>
                              </List>
                            </AccordionDetails>
                          </Accordion>
                        </ListItem>
                      </List>
                    );

                  case "employee":
                  case "Super-Admin":
                    if (!isCommonComponentsRendered) {
                      isCommonComponentsRendered = true;
                      return (
                        <List>
                          <ListItem onClick={(e) => e.stopPropagation()}>
                            <Accordion
                              expanded={true}
                              className="w-full !shadow-none border-[#0093d6] border"
                              style={{ background: "rgb(14, 165, 233)" }}
                            >
                              <AccordionSummary
                                expandIcon={
                                  <ExpandMore className="text-white" />
                                }
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Typography className="text-white">
                                  Super Admin and employee
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <List>
                                  <ListItem disablePadding>
                                    <Link
                                      onClick={() => toggleDrawer()}
                                      to="#"
                                      className="w-full"
                                    >
                                      <ListItemButton className="!p-2 !rounded-lg w-full">
                                        <ListItemIcon className="p-2 !min-w-[25px]">
                                          <AccessTimeIcon className="text-white" />
                                        </ListItemIcon>
                                        <ListItemText
                                          primaryTypographyProps={{
                                            style: { fontSize: 13 },
                                          }}
                                          style={{ fontSize: "10px" }}
                                          className="text-white text-sm"
                                          primary={"Your Attendance"}
                                        />
                                      </ListItemButton>
                                    </Link>
                                  </ListItem>
                                  <ListItem disablePadding>
                                    <Link
                                      onClick={() => toggleDrawer()}
                                      to="#"
                                      className="w-full"
                                    >
                                      <ListItemButton className="!p-2 !rounded-lg w-full">
                                        <ListItemIcon className="p-2 !min-w-[25px]">
                                          <EventNoteIcon className="text-white" />
                                        </ListItemIcon>
                                        <ListItemText
                                          primaryTypographyProps={{
                                            style: { fontSize: 13 },
                                          }}
                                          style={{ fontSize: "10px" }}
                                          className="text-white text-sm"
                                          primary={"Apply For Leave"}
                                        />
                                      </ListItemButton>
                                    </Link>
                                  </ListItem>
                                  <ListItem disablePadding>
                                    <Link
                                      onClick={() => toggleDrawer()}
                                      to="#"
                                      className="w-full"
                                    >
                                      <ListItemButton className="!p-2 !rounded-lg w-full">
                                        <ListItemIcon className="p-2 !min-w-[25px]">
                                          <SettingsIcon className="text-white" />
                                        </ListItemIcon>
                                        <ListItemText
                                          primaryTypographyProps={{
                                            style: { fontSize: 13 },
                                          }}
                                          style={{ fontSize: "10px" }}
                                          className="text-white text-sm"
                                          primary={"Account Setting's"}
                                        />
                                      </ListItemButton>
                                    </Link>
                                  </ListItem>
                                  <ListItem disablePadding>
                                    <Link
                                      onClick={() => toggleDrawer()}
                                      to="#"
                                      className="w-full"
                                    >
                                      <ListItemButton className="!p-2 !rounded-lg w-full">
                                        <ListItemIcon className="p-2 !min-w-[25px]">
                                          <PeopleIcon className="text-white" />
                                        </ListItemIcon>
                                        <ListItemText
                                          primaryTypographyProps={{
                                            style: { fontSize: 13 },
                                          }}
                                          style={{ fontSize: "10px" }}
                                          className="text-white text-sm"
                                          primary={"Leave Application"}
                                        />
                                      </ListItemButton>
                                    </Link>
                                  </ListItem>
                                  <Accordion
                                    className="w-full !shadow-none border-[#0093d6] border"
                                    style={{ background: "rgb(14, 165, 233)" }}
                                  >
                                    <AccordionSummary
                                      expandIcon={
                                        <ExpandMoreIcon className="text-white" />
                                      }
                                      aria-controls="panel1a-content"
                                      id="panel1a-header"
                                    >
                                      <Typography className="text-white">
                                        Notification
                                      </Typography>
                                    </AccordionSummary>
                                    <List>
                                      <ListItem disablePadding>
                                        <Link
                                          onClick={() => toggleDrawer()}
                                          to="#"
                                          className="w-full"
                                        >
                                          <ListItemButton className="!p-2 !rounded-lg w-full">
                                            <ListItemIcon className="p-2 !min-w-[25px]">
                                              <AddAlertIcon className="text-white" />
                                            </ListItemIcon>
                                            <ListItemText
                                              primaryTypographyProps={{
                                                style: { fontSize: 13 },
                                              }}
                                              style={{ fontSize: "10px" }}
                                              className="text-white text-sm"
                                              primary={"Create Notification"}
                                            />
                                          </ListItemButton>
                                        </Link>
                                      </ListItem>
                                      <ListItem disablePadding>
                                        <Link
                                          onClick={() => toggleDrawer()}
                                          to="#"
                                          className="w-full"
                                        >
                                          <ListItemButton className="!p-2 !rounded-lg w-full">
                                            <ListItemIcon className="p-2 !min-w-[25px]">
                                              <ListAltIcon className="text-white" />
                                            </ListItemIcon>
                                            <ListItemText
                                              primaryTypographyProps={{
                                                style: { fontSize: 13 },
                                              }}
                                              style={{ fontSize: "10px" }}
                                              className="text-white text-sm"
                                              primary={"List Notification"}
                                            />
                                          </ListItemButton>
                                        </Link>
                                      </ListItem>
                                    </List>
                                  </Accordion>

                                  <Accordion
                                    className="w-full !shadow-none border-[#0093d6] border"
                                    style={{ background: "rgb(14, 165, 233)" }}
                                  >
                                    <AccordionSummary
                                      expandIcon={
                                        <ExpandMoreIcon className="text-white" />
                                      }
                                      aria-controls="panel1a-content"
                                      id="panel1a-header"
                                    >
                                      <Typography className="text-white">
                                        Employee
                                      </Typography>
                                    </AccordionSummary>
                                    <List>
                                      <ListItem disablePadding>
                                        <Link
                                          onClick={() => toggleDrawer()}
                                          to="#"
                                          className="w-full"
                                        >
                                          <ListItemButton className="!p-2 !rounded-lg w-full">
                                            <ListItemIcon className="p-2 !min-w-[25px]">
                                              <PersonAddIcon className="text-white" />
                                            </ListItemIcon>
                                            <ListItemText
                                              primaryTypographyProps={{
                                                style: { fontSize: 13 },
                                              }}
                                              style={{ fontSize: "10px" }}
                                              className="text-white text-sm"
                                              primary={"Add Employee"}
                                            />
                                          </ListItemButton>
                                        </Link>
                                      </ListItem>
                                      <ListItem disablePadding>
                                        <Link
                                          onClick={() => toggleDrawer()}
                                          to="#"
                                          className="w-full"
                                        >
                                          <ListItemButton className="!p-2 !rounded-lg w-full">
                                            <ListItemIcon className="p-2 !min-w-[25px]">
                                              <EditIcon className="text-white" />
                                            </ListItemIcon>
                                            <ListItemText
                                              primaryTypographyProps={{
                                                style: { fontSize: 13 },
                                              }}
                                              style={{ fontSize: "10px" }}
                                              className="text-white text-sm"
                                              primary={"Update Employee"}
                                            />
                                          </ListItemButton>
                                        </Link>
                                      </ListItem>
                                      <ListItem disablePadding>
                                        <Link
                                          onClick={() => toggleDrawer()}
                                          to="#"
                                          className="w-full"
                                        >
                                          <ListItemButton className="!p-2 !rounded-lg w-full">
                                            <ListItemIcon className="p-2 !min-w-[25px]">
                                              <DeleteIcon className="text-white" />
                                            </ListItemIcon>
                                            <ListItemText
                                              primaryTypographyProps={{
                                                style: { fontSize: 13 },
                                              }}
                                              style={{ fontSize: "10px" }}
                                              className="text-white text-sm"
                                              primary={"Delete Employee"}
                                            />
                                          </ListItemButton>
                                        </Link>
                                      </ListItem>
                                      <ListItem disablePadding>
                                        <Link
                                          onClick={() => toggleDrawer()}
                                          to="#"
                                          className="w-full"
                                        >
                                          <ListItemButton className="!p-2 !rounded-lg w-full">
                                            <ListItemIcon className="p-2 !min-w-[25px]">
                                              <ListAltIcon className="text-white" />
                                            </ListItemIcon>
                                            <ListItemText
                                              primaryTypographyProps={{
                                                style: { fontSize: 13 },
                                              }}
                                              style={{ fontSize: "10px" }}
                                              className="text-white text-sm"
                                              primary={"Employee List"}
                                            />
                                          </ListItemButton>
                                        </Link>
                                      </ListItem>
                                    </List>
                                  </Accordion>

                                  <Accordion
                                    className="w-full !shadow-none border-[#0093d6] border"
                                    style={{ background: "rgb(14, 165, 233)" }}
                                  >
                                    <AccordionSummary
                                      expandIcon={
                                        <ExpandMoreIcon className="text-white" />
                                      }
                                      aria-controls="panel1a-content"
                                      id="panel1a-header"
                                    >
                                      <Typography className="text-white">
                                        Department
                                      </Typography>
                                    </AccordionSummary>
                                    <List>
                                      <ListItem disablePadding>
                                        <Link
                                          onClick={() => toggleDrawer()}
                                          to="#"
                                          className="w-full"
                                        >
                                          <ListItemButton className="!p-2 !rounded-lg w-full">
                                            <ListItemIcon className="p-2 !min-w-[25px]">
                                              <PersonAddIcon className="text-white" />
                                            </ListItemIcon>
                                            <ListItemText
                                              primaryTypographyProps={{
                                                style: { fontSize: 13 },
                                              }}
                                              style={{ fontSize: "10px" }}
                                              className="text-white text-sm"
                                              primary={"Add Department"}
                                            />
                                          </ListItemButton>
                                        </Link>
                                      </ListItem>
                                      <ListItem disablePadding>
                                        <Link
                                          onClick={() => toggleDrawer()}
                                          to="#"
                                          className="w-full"
                                        >
                                          <ListItemButton className="!p-2 !rounded-lg w-full">
                                            <ListItemIcon className="p-2 !min-w-[25px]">
                                              <EditIcon className="text-white" />
                                            </ListItemIcon>
                                            <ListItemText
                                              primaryTypographyProps={{
                                                style: { fontSize: 13 },
                                              }}
                                              style={{ fontSize: "10px" }}
                                              className="text-white text-sm"
                                              primary={"Update Department"}
                                            />
                                          </ListItemButton>
                                        </Link>
                                      </ListItem>
                                      <ListItem disablePadding>
                                        <Link
                                          onClick={() => toggleDrawer()}
                                          to="#"
                                          className="w-full"
                                        >
                                          <ListItemButton className="!p-2 !rounded-lg w-full">
                                            <ListItemIcon className="p-2 !min-w-[25px]">
                                              <DeleteIcon className="text-white" />
                                            </ListItemIcon>
                                            <ListItemText
                                              primaryTypographyProps={{
                                                style: { fontSize: 13 },
                                              }}
                                              style={{ fontSize: "10px" }}
                                              className="text-white text-sm"
                                              primary={"Delete Department"}
                                            />
                                          </ListItemButton>
                                        </Link>
                                      </ListItem>
                                      <ListItem disablePadding>
                                        <Link
                                          onClick={() => toggleDrawer()}
                                          to="#"
                                          className="w-full"
                                        >
                                          <ListItemButton className="!p-2 !rounded-lg w-full">
                                            <ListItemIcon className="p-2 !min-w-[25px]">
                                              <ListAltIcon className="text-white" />
                                            </ListItemIcon>
                                            <ListItemText
                                              primaryTypographyProps={{
                                                style: { fontSize: 13 },
                                              }}
                                              style={{ fontSize: "10px" }}
                                              className="text-white text-sm"
                                              primary={"Department List"}
                                            />
                                          </ListItemButton>
                                        </Link>
                                      </ListItem>
                                    </List>
                                  </Accordion>
                                </List>
                              </AccordionDetails>
                            </Accordion>
                          </ListItem>
                        </List>
                      );
                    }
                    break;
                  case "HR":
                    return (
                      <List>
                        <ListItem onClick={(e) => e.stopPropagation()}>
                          <Accordion
                            expanded={true}
                            className="w-full !shadow-none border-[#0093d6] border"
                            style={{ background: "rgb(14, 165, 233)" }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMore className="text-white" />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography className="text-white">Hr</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <List>
                                <ListItem disablePadding>
                                  <Link
                                    onClick={() => toggleDrawer()}
                                    to="#"
                                    className="w-full"
                                  >
                                    <ListItemButton className="!p-2 !rounded-lg w-full">
                                      <ListItemIcon className="p-2 !min-w-[25px]">
                                        <AccessTimeIcon className="text-white" />
                                      </ListItemIcon>
                                      <ListItemText
                                        primaryTypographyProps={{
                                          style: { fontSize: 13 },
                                        }}
                                        style={{ fontSize: "10px" }}
                                        className="text-white text-sm"
                                        primary={"Your Attendance"}
                                      />
                                    </ListItemButton>
                                  </Link>
                                </ListItem>
                                <ListItem disablePadding>
                                  <Link
                                    onClick={() => toggleDrawer()}
                                    to="#"
                                    className="w-full"
                                  >
                                    <ListItemButton className="!p-2 !rounded-lg w-full">
                                      <ListItemIcon className="p-2 !min-w-[25px]">
                                        <EventNoteIcon className="text-white" />
                                      </ListItemIcon>
                                      <ListItemText
                                        primaryTypographyProps={{
                                          style: { fontSize: 13 },
                                        }}
                                        style={{ fontSize: "10px" }}
                                        className="text-white text-sm"
                                        primary={"Apply For Leave"}
                                      />
                                    </ListItemButton>
                                  </Link>
                                </ListItem>
                                <ListItem disablePadding>
                                  <Link
                                    onClick={() => toggleDrawer()}
                                    to="#"
                                    className="w-full"
                                  >
                                    <ListItemButton className="!p-2 !rounded-lg w-full">
                                      <ListItemIcon className="p-2 !min-w-[25px]">
                                        <SettingsIcon className="text-white" />
                                      </ListItemIcon>
                                      <ListItemText
                                        primaryTypographyProps={{
                                          style: { fontSize: 13 },
                                        }}
                                        style={{ fontSize: "10px" }}
                                        className="text-white text-sm"
                                        primary={"Account Setting's"}
                                      />
                                    </ListItemButton>
                                  </Link>
                                </ListItem>
                                <ListItem disablePadding>
                                  <Link
                                    onClick={() => toggleDrawer()}
                                    to="#"
                                    className="w-full"
                                  >
                                    <ListItemButton className="!p-2 !rounded-lg w-full">
                                      <ListItemIcon className="p-2 !min-w-[25px]">
                                        <PeopleIcon className="text-white" />
                                      </ListItemIcon>
                                      <ListItemText
                                        primaryTypographyProps={{
                                          style: { fontSize: 13 },
                                        }}
                                        style={{ fontSize: "10px" }}
                                        className="text-white text-sm"
                                        primary={"Leave Application"}
                                      />
                                    </ListItemButton>
                                  </Link>
                                </ListItem>

                                <ListItem disablePadding>
                                  <Link
                                    onClick={() => toggleDrawer()}
                                    to="#"
                                    className="w-full"
                                  >
                                    <ListItemButton className="!p-2 !rounded-lg w-full">
                                      <ListItemIcon className="p-2 !min-w-[25px]">
                                        <AttachMoneyIcon className="text-white" />
                                      </ListItemIcon>
                                      <ListItemText
                                        primaryTypographyProps={{
                                          style: { fontSize: 13 },
                                        }}
                                        style={{ fontSize: "10px" }}
                                        className="text-white text-sm"
                                        primary={"Salary"}
                                      />
                                    </ListItemButton>
                                  </Link>
                                </ListItem>
                                <Accordion
                                  className="w-full !shadow-none border-[#0093d6] border"
                                  style={{ background: "rgb(14, 165, 233)" }}
                                >
                                  <AccordionSummary
                                    expandIcon={
                                      <ExpandMoreIcon className="text-white" />
                                    }
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                  >
                                    <Typography className="text-white">
                                      Notification
                                    </Typography>
                                  </AccordionSummary>
                                  <List>
                                    <ListItem disablePadding>
                                      <Link
                                        onClick={() => toggleDrawer()}
                                        to="#"
                                        className="w-full"
                                      >
                                        <ListItemButton className="!p-2 !rounded-lg w-full">
                                          <ListItemIcon className="p-2 !min-w-[25px]">
                                            <AddAlertIcon className="text-white" />
                                          </ListItemIcon>
                                          <ListItemText
                                            primaryTypographyProps={{
                                              style: { fontSize: 13 },
                                            }}
                                            style={{ fontSize: "10px" }}
                                            className="text-white text-sm"
                                            primary={"Create Notification"}
                                          />
                                        </ListItemButton>
                                      </Link>
                                    </ListItem>
                                    <ListItem disablePadding>
                                      <Link
                                        onClick={() => toggleDrawer()}
                                        to="#"
                                        className="w-full"
                                      >
                                        <ListItemButton className="!p-2 !rounded-lg w-full">
                                          <ListItemIcon className="p-2 !min-w-[25px]">
                                            <ListAltIcon className="text-white" />
                                          </ListItemIcon>
                                          <ListItemText
                                            primaryTypographyProps={{
                                              style: { fontSize: 13 },
                                            }}
                                            style={{ fontSize: "10px" }}
                                            className="text-white text-sm"
                                            primary={"List Notification"}
                                          />
                                        </ListItemButton>
                                      </Link>
                                    </ListItem>
                                  </List>
                                </Accordion>
                                <Accordion
                                  className="w-full !shadow-none border-[#0093d6] border"
                                  style={{ background: "rgb(14, 165, 233)" }}
                                >
                                  <AccordionSummary
                                    expandIcon={
                                      <ExpandMoreIcon className="text-white" />
                                    }
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                  >
                                    <Typography className="text-white">
                                      Employee
                                    </Typography>
                                  </AccordionSummary>
                                  <List>
                                    <ListItem disablePadding>
                                      <Link
                                        onClick={() => toggleDrawer()}
                                        to="#"
                                        className="w-full"
                                      >
                                        <ListItemButton className="!p-2 !rounded-lg w-full">
                                          <ListItemIcon className="p-2 !min-w-[25px]">
                                            <PersonAddIcon className="text-white" />
                                          </ListItemIcon>
                                          <ListItemText
                                            primaryTypographyProps={{
                                              style: { fontSize: 13 },
                                            }}
                                            style={{ fontSize: "10px" }}
                                            className="text-white text-sm"
                                            primary={"Add Employee"}
                                          />
                                        </ListItemButton>
                                      </Link>
                                    </ListItem>
                                    <ListItem disablePadding>
                                      <Link
                                        onClick={() => toggleDrawer()}
                                        to="#"
                                        className="w-full"
                                      >
                                        <ListItemButton className="!p-2 !rounded-lg w-full">
                                          <ListItemIcon className="p-2 !min-w-[25px]">
                                            <EditIcon className="text-white" />
                                          </ListItemIcon>
                                          <ListItemText
                                            primaryTypographyProps={{
                                              style: { fontSize: 13 },
                                            }}
                                            style={{ fontSize: "10px" }}
                                            className="text-white text-sm"
                                            primary={"Update Employee"}
                                          />
                                        </ListItemButton>
                                      </Link>
                                    </ListItem>
                                    <ListItem disablePadding>
                                      <Link
                                        onClick={() => toggleDrawer()}
                                        to="#"
                                        className="w-full"
                                      >
                                        <ListItemButton className="!p-2 !rounded-lg w-full">
                                          <ListItemIcon className="p-2 !min-w-[25px]">
                                            <DeleteIcon className="text-white" />
                                          </ListItemIcon>
                                          <ListItemText
                                            primaryTypographyProps={{
                                              style: { fontSize: 13 },
                                            }}
                                            style={{ fontSize: "10px" }}
                                            className="text-white text-sm"
                                            primary={"Delete Employee"}
                                          />
                                        </ListItemButton>
                                      </Link>
                                    </ListItem>
                                    <ListItem disablePadding>
                                      <Link
                                        onClick={() => toggleDrawer()}
                                        to="#"
                                        className="w-full"
                                      >
                                        <ListItemButton className="!p-2 !rounded-lg w-full">
                                          <ListItemIcon className="p-2 !min-w-[25px]">
                                            <ListAltIcon className="text-white" />
                                          </ListItemIcon>
                                          <ListItemText
                                            primaryTypographyProps={{
                                              style: { fontSize: 13 },
                                            }}
                                            style={{ fontSize: "10px" }}
                                            className="text-white text-sm"
                                            primary={"Employee List"}
                                          />
                                        </ListItemButton>
                                      </Link>
                                    </ListItem>
                                  </List>
                                </Accordion>
                              </List>
                            </AccordionDetails>
                          </Accordion>
                        </ListItem>
                      </List>
                    );

                  default:
                    break;

                  // default:
                  //   return "Good Morning";
                }
              })()}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default NavItems;
