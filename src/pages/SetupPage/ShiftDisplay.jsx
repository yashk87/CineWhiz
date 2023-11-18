import React, { useState, useEffect } from "react";
import {
  Container,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const ShiftDisplay = () => {
  const [shiftList, setShiftList] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  const handleDeleteConfirmation = (id) => {
    setDeleteConfirmation(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/route/shifts/${id}`);
      setDeleteConfirmation(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseConfirmation = () => {
    setDeleteConfirmation(null);
  };

  useEffect(() => {
    axios.get("http://localhost:4000/route/shifts/create").then((response) => {
      setShiftList(response.data.shifts);
    });
  }, []);

  return (
    <Container
      className="relative top-5"
      style={{ border: "1px solid rgb(177, 177, 177)", width: "30vw" }}
    >
      {shiftList.map((data) => (
        <div
          key={data._id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            justifyContent: "space-between",
          }}
        >
          <h4 style={{ marginRight: "10px", color: "rgb(177, 0, 177)" }}>
            {data.shiftName}
          </h4>
          <div>
            <IconButton color="primary" aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => handleDeleteConfirmation(data._id)}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      ))}
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmation !== null}
        onClose={handleCloseConfirmation}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <p>This action cannot be undone.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(deleteConfirmation)}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ShiftDisplay;
