import React, { useEffect, useState } from 'react';
import { Container, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { io } from 'socket.io-client';

const ShiftDisplay = () => {
  const [shiftList, setShiftList] = useState([]);
  const socket = io('http://localhost:4000');

  useEffect(() => {

    axios.get("http://localhost:4000/route/shifts/create").then((response) => {
      setShiftList(response.data.shifts);
    });

    socket.on('updateShiftList', (updatedShiftList) => {
      setShiftList(updatedShiftList);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/route/shifts/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className='relative top-5' style={{ border: "1px solid rgb(177, 177, 177)", width: "30vw" }}>
      {shiftList.map((data) => (
        <div key={data._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: "space-between" }}>
          <h4 style={{ marginRight: '10px', color: "rgb(177, 0, 177)" }}>{data.shiftName}</h4>
          <div>
            <IconButton color="primary" aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={() => handleDelete(data._id)} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default ShiftDisplay;
