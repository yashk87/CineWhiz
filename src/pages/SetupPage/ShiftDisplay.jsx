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
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [workingFrom, setWorkingFrom] = useState(null);
  const [shiftName, setShiftName] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const [error, setError] = useState('');
  const [shiftList, setShiftList] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  const handleDeleteConfirmation = (id) => {
    setDeleteConfirmation(id);
  };

  const handleEdit = (shift) => {
    setEditShift(shift);
    setSelectedStartTime(new Date(shift.startTime));
    setSelectedEndTime(new Date(shift.endTime));
    setWorkingFrom(shift.workingFrom);
    setShiftName(shift.shiftName);
    setSelectedDays(shift.selectedDays);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/route/shifts/${id}`);
      setDeleteConfirmation(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleCloseConfirmation = () => {
    setDeleteConfirmation(null);
  };

  const handleEditSubmit = async () => {
    try {
      const updatedShift = {
        _id: editShift._id,
        startTime: selectedStartTime.toISOString(),
        endTime: selectedEndTime.toISOString(),
        workingFrom,
        shiftName,
        selectedDays,
      };

      const response = await axios.patch(`http://localhost:4000/route/shifts/${editShift._id}`, updatedShift);

      if (response.status === 200) {
        setEditShift(null);
        const updatedShiftList = await axios.get('http://localhost:4000/route/shifts/create');
        setShiftList(updatedShiftList.data.shifts);
        socket.emit('updateShiftList', updatedShiftList.data.shifts);
        handleSnackbarOpen('Shift successfully edited!');
      }
    } catch (error) {
      console.error(error);
      handleSnackbarOpen('Error editing shift. Please try again.');
    }
  };
  const handleStartTimeChange = (time) => {
    setSelectedStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setSelectedEndTime(time);
  };

  const handleDaySelection = (event, newSelectedDays) => {
    setSelectedDays(newSelectedDays);
  };

  const isSelected = (day) => {
    return selectedDays.includes(day);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:4000/route/shifts/create');
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
            <IconButton color="primary" aria-label="edit" onClick={() => handleEdit(data)}>
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

      <Dialog open={editShift !== null} onClose={() => setEditShift(null)}>
        <DialogTitle>Edit Shift</DialogTitle>
        <DialogContent>
          <form action="">
            <Container
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#fefdff',
                padding: '10px',
                borderRadius: '5px',
                gap: '2rem',
                minHeight: '75vh',
                border: '1.5px solid rgb(177, 177, 177)',
              }}
              maxWidth="xl"
            >
              <Typography
                style={{
                  color: '#1D6EB7',
                  fontWeight: '600',
                  fontSize: '1.5rem',
                }}
                variant="h4"
              >
                Set Shifts
              </Typography>
              <FormControl required style={{ marginTop: '20px', width: '80%' }} size="small">
                <InputLabel id="industry-type-label">Working From</InputLabel>
                <Select
                  labelId="industry-type-label"
                  id="industry-type"
                  value={workingFrom || ''}
                  onChange={(e) => setWorkingFrom(e.target.value)}
                >
                  <MenuItem value="Remote">Remote</MenuItem>
                  <MenuItem value="Office">Office</MenuItem>
                </Select>
              </FormControl>
              <TextField
                required
                style={{ marginTop: '20px', width: '80%' }}
                name="name"
                size="small"
                label="Shift Name"
                type="text"
                value={shiftName || ''}
                onChange={(e) => setShiftName(e.target.value)}
              />

              <div style={{ width: '80%', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '48%' }}>
                  <h5 style={{ color: '#817a8b' }}>Starting Time</h5>
                  <DatePicker
                    selected={selectedStartTime}
                    onChange={handleStartTimeChange}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    className="p-1 w-[70%]"
                  />
                </div>
                <div style={{ width: '48%' }}>
                  <h5 style={{ color: '#817a8b' }}>Ending Time</h5>
                  <DatePicker
                    selected={selectedEndTime}
                    onChange={handleEndTimeChange}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    className="p-1 w-[70%]"
                  />
                </div>
              </div>
              <h5 style={{ color: '#817a8b' }}>Select Days</h5>
              <ToggleButtonGroup
                value={selectedDays}
                onChange={handleDaySelection}
                aria-label="selectedDays"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '80%',
                }}
              >
                {daysOfWeek.map((day) => (
                  <ToggleButton
                    key={day}
                    value={day}
                    style={{
                      width: '40px',
                      height: '40px',
                      border: '1px solid #c5c4c6',
                      backgroundColor: isSelected(day) ? 'rgb(189 50 214)' : 'transparent',
                      color: isSelected(day) ? 'white' : '#737d90',
                    }}
                  >
                    {day}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              <div style={{ width: '80%', display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  style={{ marginTop: '20px', background: '#1D6EB7', color: 'white' }}
                  name="submit"
                  onClick={handleEditSubmit}
                  variant="contained"
                >
                  Save
                </Button>
              </div>
              {error && (
                <Typography style={{ color: 'red', fontSize: '0.8rem', marginTop: '10px' }}>{error}</Typography>
              )}
            </Container>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ShiftDisplay;
