import { Add, DevicesRounded, ExpandMore, Group } from "@mui/icons-material";
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
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UseContext } from "../../../State/UseState/UseContext";
import { jwtDecode } from "jwt-decode";

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

  return (
    // <div className="bg-blue">
    //   {userRole === null ? (
    //     <p>Loading ...</p>
    //   ) : (
    //     <>
    //       {(() => {
    //         switch (userRole) {
    //           case "employee":
    //             return (
    //               <List>
    //                 <ListItem onClick={(e) => e.stopPropagation()}>
    //                   <Accordion
    //                     expanded={true}
    //                     className="w-full !shadow-none border-[#0093d6] border"
    //                     style={{ background: "rgb(14, 165, 233)" }}
    //                   >
    //                     <AccordionSummary
    //                       expandIcon={<ExpandMore className="text-white" />}
    //                       aria-controls="panel1a-content"
    //                       id="panel1a-header"
    //                     >
    //                       <Typography className="text-white">
    //                         Add Organisation
    //                       </Typography>
    //                     </AccordionSummary>
    //                     <AccordionDetails>
    //                       <List>
    //                         <ListItem disablePadding>
    //                           <ListItemButton className="!p-2 !rounded-md">
    //                             <ListItemIcon className="p-2 !min-w-[25px]">
    //                               <Group className="text-white" />
    //                             </ListItemIcon>
    //                             <ListItemText
    //                               primaryTypographyProps={{
    //                                 style: { fontSize: 13 },
    //                               }}
    //                               style={{ fontSize: "10px" }}
    //                               className="text-white text-sm"
    //                               primary={"It-Consultancy"}
    //                             />
    //                           </ListItemButton>
    //                         </ListItem>
    //                         <ListItem disablePadding>
    //                           <Link
    //                             onClick={() => toggleDrawer()}
    //                             to="/add-organisation"
    //                             className="w-full"
    //                           >
    //                             <ListItemButton className="!p-2 !rounded-lg w-full">
    //                               <ListItemIcon className="p-2 !min-w-[25px]">
    //                                 <Add className="text-white" />
    //                               </ListItemIcon>
    //                               <ListItemText
    //                                 primaryTypographyProps={{
    //                                   style: { fontSize: 13 },
    //                                 }}
    //                                 style={{ fontSize: "10px" }}
    //                                 className="text-white text-sm"
    //                                 primary={"Add Organization"}
    //                               />
    //                             </ListItemButton>
    //                           </Link>
    //                         </ListItem>
    //                       </List>
    //                     </AccordionDetails>
    //                   </Accordion>
    //                 </ListItem>
    //               </List>
    //             );
    //           case "hr":
    //             return "Good Morning";
    //           default:
    //             return "Hello";
    //         }
    //       })()}
    //     </>
    //   )}
    // </div>
    <div className="bg-blue">
      {userRole === null ? (
        <p>Loading ...</p>
      ) : (
        <>
          {userRole.map((role, index) => (
            <div key={index}>
              {(() => {
                switch (role) {
                  case "employee":
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
                                        <Add className="text-white" />
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
                                        <Add className="text-white" />
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
                                        <Add className="text-white" />
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
                                        <Add className="text-white" />
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
                                        <Add className="text-white" />
                                      </ListItemIcon>
                                      <ListItemText
                                        primaryTypographyProps={{
                                          style: { fontSize: 13 },
                                        }}
                                        style={{ fontSize: "10px" }}
                                        className="text-white text-sm"
                                        primary={"Apply For Leaves"}
                                      />
                                    </ListItemButton>
                                  </Link>
                                </ListItem>
                              </List>
                            </AccordionDetails>
                          </Accordion>
                        </ListItem>
                      </List>
                    );
                  case "hr":
                    return "hello";
                  default:
                    return "Good Morning";
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
