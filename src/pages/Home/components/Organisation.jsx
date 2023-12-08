import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem } from "@mui/material";
import { Delete } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Warning } from "@mui/icons-material";
import { useContext } from "react";
import { UseContext } from "../../../State/UseState/UseContext";
import { TestContext } from "../../../State/Function/Main";
const Organisation = ({ item }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const { handleAlert } = useContext(TestContext);
  const { cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];

  const navigate = useNavigate();
  const handleCreateProfile = () => {
    navigate(`/organisation/${item._id}/add-profile`, {
      state: { orgName: item.name },
    });
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // Delete Query for deleting single Organization
  const handleDeleteConfirmation = (id) => {
    console.log(id);
    setDeleteConfirmation(id);
  };
  const handleCloseConfirmation = () => {
    setDeleteConfirmation(null);
  };
  // delete query for deleting Single Organization
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API}/route/organization/delete/${id}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      console.log(response);
      handleAlert(true, "success", "Organization deleted successfully");
    } catch (error) {
      console.log(error);
      handleAlert(true, "error", "Failed to delete Organization    ");
    } finally {
      handleCloseConfirmation();
      setAnchorEl(null);
    }
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
                <MenuItem onClick={() => handleDeleteConfirmation(item._id)}>
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
        open={deleteConfirmation !== null}
        onClose={handleCloseConfirmation}
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
            onClick={handleCloseConfirmation}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={() => handleDelete(deleteConfirmation)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Organisation;
