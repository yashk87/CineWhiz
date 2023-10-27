import { Menu } from "@mui/icons-material";
import { AppBar, Badge, IconButton, Toolbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import * as React from "react";
import NavItems from "./nav-items";

export default function SwipeableTemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => (event) => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const list = (
    <Box
      sx={{ width: 250, height:100 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <NavItems />
    </Box>
  );

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            edge="start"
            sx={{
              marginRight: 5,
            }}
          >
            <Menu />
          </IconButton>
          <Badge
            badgeContent={
              <div className=" text-sm rounded-full bg-sky-500 text-white h-4 w-4 box-border flex items-center justify-center">
                +
              </div>
            }
            color="primary"
          >
            <Typography variant="h6" noWrap component="div">
              AegisPlus
            </Typography>
          </Badge>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        PaperProps={{ style: { background: "#0ea5e9" } }}
        color="blue"
        anchor="left"
        open={open}
        onClose={toggleDrawer()}
        onOpen={toggleDrawer()}
      >
        {list}
      </SwipeableDrawer>
    </div>
  );
}
