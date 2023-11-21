import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import CategoryIcon from "@mui/icons-material/Category";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ReportIcon from "@mui/icons-material/Report";
import SettingsIcon from "@mui/icons-material/Settings";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
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
import AddIcon from "@mui/icons-material/Add";

const NavItems = ({ toggleDrawer }) => {
  const [userRole, setUserRole] = useState(null);
  const { cookies } = useContext(UseContext);
  const token = cookies["aeigs"];

  useEffect(() => {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.user.profile) {
        setUserRole(decodedToken.user.profile);
      } else {
        setUserRole("guest");
      }
    } catch (error) {
      console.error("Failed to decode the token:", error);
    }
  }, [token]);

  function formatRoles(userRole) {
    if (userRole.length === 1) {
      return userRole[0];
    } else if (userRole.length === 2) {
      return `${userRole[0]} and ${userRole[1]}`;
    } else {
      const otherRoles = userRole.slice(0, -1).join(", ");
      const lastRole = userRole[userRole.length - 1];
      return `${otherRoles}, and ${lastRole}`;
    }
  }

  return (
    <>
      {userRole &&
        (userRole.includes("Employee") ||
        userRole.includes("Manager") ||
        userRole.includes("Department Admin") ||
        userRole.includes("Delagate Department Admin") ||
        userRole.includes("Department Head") ||
        userRole.includes("Delagate Department Head") ||
        userRole.includes("HR") ||
        userRole.includes("Delegate Hr") ||
        userRole.includes("Super-Admin") ? (
          <List>
            <ListItem onClick={(e) => e.stopPropagation()}>
              <Accordion
                expanded={true}
                className="w-full !shadow-none border-[#0093d6] border"
                style={{ background: "rgb(14, 165, 233)" }}
              >
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography
                    style={{ fontSize: "15px" }}
                    className="text-white text-sm"
                  >
                    {formatRoles(userRole)}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
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
                      to="/leave"
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
                </AccordionDetails>
              </Accordion>
            </ListItem>
          </List>
        ) : null)}

      {userRole &&
        (userRole.includes("Employee") ||
        userRole.includes("Manager") ||
        userRole.includes("Department Admin") ||
        userRole.includes("Delagate Department Admin") ||
        userRole.includes("Department Head") ||
        userRole.includes("Delagate Department Head") ||
        userRole.includes("HR") ||
        userRole.includes("Delegate Hr") ||
        userRole.includes("Super-Admin") ? (
          <List>
            <ListItem onClick={(e) => e.stopPropagation()}>
              <Accordion
                expanded={true}
                className="w-full !shadow-none border-[#0093d6] border"
                style={{ background: "rgb(14, 165, 233)" }}
              >
                <Accordion
                  className="w-full !shadow-none border-[#0093d6] border"
                  style={{ background: "rgb(14, 165, 233)" }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className="text-white" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="text-white">Notification</Typography>
                  </AccordionSummary>
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
                </Accordion>
              </Accordion>
            </ListItem>
          </List>
        ) : null)}

      {userRole &&
        (userRole.includes("Department Admin") ||
        userRole.includes("Delagate Department Admin") ||
        userRole.includes("HR") ||
        userRole.includes("Delegate Hr") ||
        userRole.includes("Super-Admin") ? (
          <List>
            <ListItem onClick={(e) => e.stopPropagation()}>
              <Accordion
                className="w-full !shadow-none border-[#0093d6] border"
                style={{ background: "rgb(14, 165, 233)" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className="text-white" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="text-white">Employee</Typography>
                </AccordionSummary>
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
              </Accordion>
            </ListItem>
          </List>
        ) : null)}

      {userRole &&
        (userRole.includes("Department Head") ||
        userRole.includes("Delagate Department Head") ||
        userRole.includes("Super-Admin") ? (
          <List>
            <ListItem onClick={(e) => e.stopPropagation()}>
              <Accordion
                expanded={true}
                className="w-full !shadow-none border-[#0093d6] border"
                style={{ background: "rgb(14, 165, 233)" }}
              >
                <Accordion
                  className="w-full !shadow-none border-[#0093d6] border"
                  style={{ background: "rgb(14, 165, 233)" }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className="text-white" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="text-white">Department</Typography>
                  </AccordionSummary>
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
                </Accordion>
              </Accordion>
            </ListItem>
          </List>
        ) : null)}

      {userRole &&
        (userRole.includes("Super-Admin") ? (
          <List>
            <ListItem onClick={(e) => e.stopPropagation()}>
              <Accordion
                expanded={true}
                className="w-full !shadow-none border-[#0093d6] border"
                style={{ background: "rgb(14, 165, 233)" }}
              >
                <Accordion
                  className="w-full !shadow-none border-[#0093d6] border"
                  style={{ background: "rgb(14, 165, 233)" }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className="text-white" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="text-white">Organization</Typography>
                  </AccordionSummary>

                  <ListItem disablePadding>
                    <Link
                      onClick={() => toggleDrawer()}
                      to="#"
                      className="w-full"
                    >
                      <ListItemButton className="!p-2 !rounded-lg w-full">
                        <ListItemIcon className="p-2 !min-w-[25px]">
                          <AddIcon className="text-white" />
                        </ListItemIcon>
                        <ListItemText
                          primaryTypographyProps={{
                            style: { fontSize: 13 },
                          }}
                          style={{ fontSize: "10px" }}
                          className="text-white text-sm"
                          primary={"Add Organization"}
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
                          primary={"Update Organization"}
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
                          primary={"Delete Organization"}
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
                          primary={"Organization List"}
                        />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                </Accordion>
              </Accordion>
            </ListItem>
          </List>
        ) : null)}

      {userRole &&
        (userRole.includes("Department Admin") ||
        userRole.includes("Delagate Department Admin") ||
        userRole.includes("Department Head") ||
        userRole.includes("Delagate Department Head") ||
        userRole.includes("HR") ||
        userRole.includes("Delegate Hr") ||
        userRole.includes("Super-Admin") ? (
          <List sx={{ padding: "0px" }}>
            <ListItem onClick={(e) => e.stopPropagation()}>
              <ListItem disablePadding>
                <Link onClick={() => toggleDrawer()} to="#" className="w-full">
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
            </ListItem>
          </List>
        ) : null)}

      {userRole &&
        (userRole.includes("HR") ||
        userRole.includes("Delegate Hr") ||
        userRole.includes("Super-Admin") ? (
          <List sx={{ padding: "0px" }}>
            <ListItem onClick={(e) => e.stopPropagation()}>
              <ListItem disablePadding>
                <Link onClick={() => toggleDrawer()} to="#" className="w-full">
                  <ListItemButton className="!p-2 !rounded-lg w-full">
                    <ListItemIcon className="p-2 !min-w-[25px]">
                      <MonetizationOnIcon className="text-white" />
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
            </ListItem>
          </List>
        ) : null)}

      {userRole &&
        (userRole.includes("Manager") ? (
          <>
            <List sx={{ padding: "0px" }}>
              <ListItem onClick={(e) => e.stopPropagation()}>
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
              </ListItem>
              <ListItem onClick={(e) => e.stopPropagation()}>
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
              </ListItem>
            </List>
          </>
        ) : null)}
    </>
  );
};

export default NavItems;
