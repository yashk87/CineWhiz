import React, { useState } from 'react';
import { Container, Typography, Button, InputLabel, Select, MenuItem, TextField, FormControl  } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Axios from 'axios';
import ShiftDisplay from './ShiftDisplay';


const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Shifts = () => {



    const [selectedStartTime, setSelectedStartTime] = useState(null);
    const [selectedEndTime, setSelectedEndTime] = useState(null);
    const [workingFrom, setWorkingFrom] = useState(null);
    const [shiftName, setShiftName] = useState(null);
    const [selectedDays, setSelectedDays] = useState([]);
    const [error, setError] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const startTime = selectedStartTime;
        const endTime = selectedEndTime;

        if (!startTime || !endTime || selectedDays.length === 0) {
            setError('Please fill in all the mandatory fields');
            return;
        }

        const timeDiffInMilliseconds = endTime - startTime;
        const timeDiffInMinutes = timeDiffInMilliseconds / (1000 * 60);

        if (timeDiffInMinutes >= 540) {
            try {
                const data = {
                    startTime,
                    endTime,
                    selectedDays,
                    workingFrom,
                    shiftName
                };


                const response = await Axios.post('http://localhost:4000/route/shifts/create', data);

                if (response.status === 201) {
                    setError('');
                    setSelectedStartTime("")
                    setSelectedEndTime("")
                    setWorkingFrom('')
                    setShiftName("")
                } else {
                    setError('Failed to create a new shift');
                }
            } catch (error) {
                console.error(error);
                setError('An error occurred while creating a new shift');
            }
        } else {
            setError('Time difference must be 9 hours or greater');
        }
    };

    return (
        <>
            <form style={{width:"100%", display: "flex" }} action="">
                <Container style={{
                    display: "flex", paddingTop: "5px",
                    backgroundColor: "#fefdff",
                    padding: "10px",
                    paddingBottom: "30px",
                    borderRadius: "5px",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "2rem",
                    height:"75vh",
                    border: "1.5px solid rgb(177, 177, 177)",
                    marginLeft:"5rem",
                    position: "relative",
                    top: "20px",
                }} maxWidth="sm">

                    <Typography style={{ color: "#1D6EB7", fontWeight: "600", position: "relative", top: "20px", fontSize: "1.5rem", width: "80%" }} variant='h4'>Set Shifts</Typography>
                    <FormControl
                        required
                        style={{ marginTop: "20px", width: "80%", height: "10px" }}
                        size="small"
                    >
                        <InputLabel id="industry-type-label">working from</InputLabel>
                        <Select
                            labelId="industry-type-label"
                            id="industry-type"
                        >
                            <MenuItem onClick={() => setWorkingFrom("Remote")} value="Remote">Remote</MenuItem>
                            <MenuItem onClick={() => setWorkingFrom("Office")} value="Office">Office</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        required
                        style={{ marginTop: "20px", height: "10px" }}
                        name='name'
                        size="small"
                        className='w-[80%]'
                        label='what is your shift name'
                        type='text'
                        value={shiftName}
                        onChange={(e) => setShiftName(e.target.value)}
                    />

                    <div style={{ display: "flex", justifyContent: "space-between", width: "80%" }}>
                        <div style={{ border: "1px solid #c4c3c5", marginTop: "19px" }}>
                            <h5 style={{ position: "relative", left: "6px", color: "#817a8b" }}>starting time</h5>
                            <DatePicker
                                selected={selectedStartTime}
                                onChange={handleStartTimeChange}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                className='p-1'
                            />
                        </div>
                        <div style={{ border: "1px solid #c4c3c5", marginTop: "19px" }}>
                            <h5 style={{ position: "relative", left: "6px", color: "#817a8b" }}>ending time</h5>
                            <DatePicker
                                selected={selectedEndTime}
                                onChange={handleEndTimeChange}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                className='p-1'
                            />
                        </div>
                    </div>
                    <h5 style={{ color: "#817a8b" }} className='w-[80%] relative top-[-20px]'>select days</h5>
                    <div style={{ width: "80%", justifyContent: "space-between" }}>
                        <ToggleButtonGroup
                            value={selectedDays}
                            onChange={handleDaySelection}
                            aria-label="selectedDays"
                            style={{ display: "flex", justifyContent: "space-between", position: "relative", top: "-40px" }}
                        >
                            {daysOfWeek.map((day) => (
                                <ToggleButton
                                    key={day}
                                    value={day}
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        border: "1px solid #c5c4c6",
                                        backgroundColor: isSelected(day) ? "rgb(189 50 214)" : "transparent",
                                        color: isSelected(day) ? "white" : "#737d90"
                                    }}
                                >
                                    {day}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "80%" }}>
                        <Button className='relative top-[-30px]' name='submit' onClick={handleSubmit} variant="contained" style={{ background: "#1D6EB7", color: "white" }}>Submit</Button>
                    </div>
                    {error && <Typography style={{ color: 'red', position: "absolute", fontSize: "0.8rem" }}>{error}</Typography>}
                </Container>
                <Container >
                <ShiftDisplay />
                </Container>
            </form>

        </>
    );
};

export default Shifts;
