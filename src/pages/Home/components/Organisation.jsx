import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem } from "@mui/material";
import { Delete } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Warning } from "@mui/icons-material";
const Organisation = ({ item }) => {
  const [showConfirmationExcel, setShowConfirmationExcel] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();
  const handleCreateProfile = () => {
    navigate(`/organisation/${item._id}/add-profile`, {
      state: { orgName: item.name },
    });
  };

  const handleClick = (e, currentItem) => {
    setAnchorEl(e.currentTarget);
    // Additional logic if needed when clicking the MoreVertIcon
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Card
        className="hover:shadow-lg transition-all h-max w-[320px]"
        sx={{ overflow: "visible" }}
      >
        <div className="cursor-pointer scroll-smooth transition-all">
          <CardContent className="flex justify-between items-center">
            <div className="cursor-pointer">
              <Typography
                color="#1D6EB7"
                gutterBottom
                variant="h6"
                component="div"
              >
                {item.name}
              </Typography>
            </div>
            <div>
              <MoreVertIcon
                onClick={(e) => handleClick(e, item)}
                className="cursor-pointer"
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>
                  <EditIcon style={{ color: "green", marginRight: "10px" }} />
                  <span>Update</span>
                </MenuItem>
                <MenuItem onClick={() => setShowConfirmationExcel(true)}>
                  <Delete style={{ color: "red", marginRight: "10px" }} />
                  <span>Delete</span>
                </MenuItem>
              </Menu>
            </div>
          </CardContent>
        </div>
        <Typography variant="body2" color="text.secondary">
          Description : {item.description}
        </Typography>
        <div className="space-x-4 p-2 pb-6">
          <Link to={`/setup/add-roles/${item._id}`}>
            <Button size="small" className="cursor-pointer" variant="contained">
              Go to setuppage
            </Button>
          </Link>
          <Button
            size="small"
            className="cursor-pointer"
            variant="contained"
            onClick={handleCreateProfile}
          >
            Create Profile
          </Button>
        </div>
      </Card>

      <Dialog
        open={showConfirmationExcel}
        onClose={() => setShowConfirmationExcel(false)}
      >
        <DialogTitle color={"error"}>
          <Warning color="error" /> “ All information in this orgnisation will
          be deleted. Are you sure you want to delete it?”
        </DialogTitle>
        <DialogContent>
          <p>
            Please confirm your decision to delete this Organization, as this
            action cannot be retrived
          </p>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => setShowConfirmationExcel(false)}
          >
            Cancel
          </Button>
          <Button variant="contained" size="small" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Organisation;
