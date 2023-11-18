import React from 'react';
import { Container, TextField, Typography } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select, Checkbox, FormControlLabel } from '@mui/material';

const labelStyle = {
    fontSize: "12px",
    color: "gray",
};

const AddRole = () => {
    return (
        <>
            <form style={{ display: "flex", alignItems: "center", height: "80vh" }} action="">
                <Container style={{
                    display: "flex", paddingTop: "5px",
                    backgroundColor: "#fefdff",
                    padding: "10px",
                    paddingBottom: "30px",
                    borderRadius: "5px",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "2rem",
                    height: "75vh",
                    border: "1.5px solid rgb(177, 177, 177)",
                    margin: "auto",
                    position: "relative",
                    top: "20px"
                }} maxWidth="sm">

                    <Typography style={{ color: "#1D6EB7", fontWeight: "600", position: "relative", top: "20px", fontSize: "1.5rem", width: "80%" }} variant='h4'>Add Role To Your Organisation Role</Typography>
                    <TextField
                        required
                        style={{ marginTop: "20px", height: "10px" }}
                        name='name'
                        size="small"
                        className='w-[80%]'
                        label='What is your role-name'
                        type='text'
                    />
                    <FormControl
                        required
                        style={{ marginTop: "20px", width: "80%", height: "10px" }}
                        size="small"
                    >
                        <InputLabel id="industry-type-label">Select Role to be added in organisation</InputLabel>
                        <Select
                            labelId="industry-type-label"
                            id="industry-type"
                        >
                            <MenuItem value="IT">organisation1</MenuItem>
                            <MenuItem value="MECH">organisation2</MenuItem>
                            <MenuItem value="ACCOUNTS">organisation3</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography style={{ color: "#1D6EB7", fontWeight: "600", position: "relative", top: "30px", fontSize: "1.5rem", width: "80%" }} variant='h4'>Select his Rights</Typography>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "80%", position: "relative", top: "30px" }}>
                        <div style={{ display: "flex", flexDirection: "column", width: "50%", gap: "15px" }}>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Is able to update employee data"
                                style={labelStyle}
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Is able to delete employee"
                                style={labelStyle}
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Is able to create employee"
                                style={labelStyle}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", width: "50%", gap: "15px" }}>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Is he organisation admin"
                                style={labelStyle}
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Is he department admin"
                                style={labelStyle}
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Is he able to approve leave requests"
                                style={labelStyle}
                            />
                        </div>
                    </div>
                </Container>
            </form>
        </>
    )
}

export default AddRole;
