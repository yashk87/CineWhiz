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

const NavItems = () => {
  return (
    <div className="bg-blue">
      {" "}
      <List>
        <ListItem onClick={(e) => e.stopPropagation()}>
          {/* <ListItemButton className="!px-2"> */}
          <Accordion
            className="w-full"
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
                  <ListItemButton className="!p-2 rounded-lg">
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
                  <ListItemButton className="!p-2 rounded-lg">
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
