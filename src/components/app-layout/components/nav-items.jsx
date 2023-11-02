import { Add, ExpandMore, Group } from "@mui/icons-material";
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
import React from "react";
import { Link } from "react-router-dom";

const NavItems = ({ toggleDrawer }) => {
  return (
    <div className="bg-blue">
      {" "}
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
              <Typography className="text-white">Add Organisation</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem disablePadding>
                  <ListItemButton className="!p-2 !rounded-md">
                    <ListItemIcon className="p-2 !min-w-[25px]">
                      <Group className="text-white" />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ style: { fontSize: 13 } }}
                      style={{ fontSize: "10px" }}
                      className="text-white text-sm"
                      primary={"It-Consultancy"}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <Link
                    onClick={() => toggleDrawer()}
                    to="/add-organisation"
                    className="w-full"
                  >
                    <ListItemButton className="!p-2 !rounded-lg w-full">
                      <ListItemIcon className="p-2 !min-w-[25px]">
                        <Add className="text-white" />
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ style: { fontSize: 13 } }}
                        style={{ fontSize: "10px" }}
                        className="text-white text-sm"
                        primary={"Add Organization"}
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          {/* </ListItemButton> */}
        </ListItem>
      </List>
    </div>
  );
};

export default NavItems;
