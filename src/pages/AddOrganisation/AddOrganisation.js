import React, { useState } from "react";
// import "./addorganisation.css"
// import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, Container, TextField, Typography } from "@mui/material";
// import { DateField } from '@mui/x-date-pickers/DateField';

const AddOrganisation = () => {
  const data = { name: "", adminName: "", visionMission: "", location: "" };
  const [inputdata, setInputData] = useState(data);

  const handleData = (e) => {
    setInputData({ ...inputdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <form
        style={{
          display: "flex",
          alignItems: "center",
          height: "80vh",
          width: "100%",
        }}
        action=""
      >
        <Container
          style={{
            display: "flex",
            paddingTop: "10px",
            borderRadius: "5px",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            height: "60vh",
            border: "1.5PX solid rgb(177, 177, 177)",
            padding: "20px",
          }}
          maxWidth="sm"
        >
          <Typography
            style={{ color: "#1D6EB7", fontWeight: "600" }}
            variant="h4"
          >
            Add Organisation
          </Typography>
          <TextField
            name="name"
            onChange={handleData}
            value={data.name}
            size="small"
            className=" w-[80%] "
            placeholder="Organisation Name"
            type="text"
          />
          <TextField
            name="admin"
            onChange={handleData}
            value={data.adminName}
            size="small"
            className=" w-[80%] "
            placeholder="Admin Name"
            type="text"
          />
          <TextField
            name="vision"
            onChange={handleData}
            value={data.visionMission}
            size="small"
            className=" w-[80%] "
            placeholder="Vision And Mission"
            type="text"
          />
          <TextField
            name="location"
            onChange={handleData}
            value={data.location}
            size="small"
            className=" w-[80%] "
            placeholder="Location"
            type="text"
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            style={{ background: "#1D6EB7", color: "white" }}
          >
            Submit
          </Button>
        </Container>
      </form>
    </>
  );
};
    const data = { name: "", adminName: "", visionAndMission: "", location: "" }
    const [inputdata, setInputData] = useState(data)

    const handleData = (e) => {
        setInputData({ ...inputdata, [e.target.name]: e.target.value })
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post("http://localhost:4000/route/organization/create", inputdata)
    }
    return (
        <>
            <form style={{ display: "flex", alignItems: "center", height: "80vh", width: "100%" }} action="">
                <div style={{
                    display: "flex", paddingTop: "5px",
                    padding: "10px",
                    width:"50%",
                    paddingBottom: "30px",
                    gap:"10px",
                    borderRadius: "5px",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                    height: "97vh",
                    border: "1.5PX solid rgb(177, 177, 177)",
                    margin: "auto",
                    position: "relative",
                    top: "15px"
                }} maxWidth="sm">
                    <Typography style={{ color: "#1D6EB7", fontWeight: "600" }} variant='h4'>Add Organisation</Typography>
                    <TextField style={{ marginTop: "20px", height: "10px" }} name='name' onChange={handleData} value={data.name} size="small" className=' w-[80%] ' label="My Organisation Name" type="text" />
                    <TextField style={{ marginTop: "20px", height: "10px" }} name='admin' onChange={handleData} value={data.adminName} size="small" className=' w-[80%] ' label="My Logo" type="text" />
                    <TextField style={{ marginTop: "20px", height: "10px" }} name='location' onChange={handleData} value={data.location} size="small" className=' w-[80%] ' label="Url Of Website" type="text" />
                    <TextField style={{ marginTop: "20px", height: "10px" }} name='location' onChange={handleData} value={data.location} size="small" className=' w-[80%] ' label="Industry Type (ex: IT)" type="text" />
                    <TextField style={{ marginTop: "20px", height: "10px" }} name='location' onChange={handleData} value={data.location} size="small" className=' w-[80%] ' label="Number of Employee (ex: 30-40)" type="text" />
                    <TextField style={{ marginTop: "20px", height: "10px" }} name='location' onChange={handleData} value={data.location} size="small" className=' w-[80%] ' label="Organization email" type="text" />
                    <TextField style={{ marginTop: "20px", height: "10px" }} name='location' onChange={handleData} value={data.location} size="small" className=' w-[80%] ' label="Location" type="text" />
                    <TextField style={{ marginTop: "20px", height: "10px" }} name='location' onChange={handleData} value={data.location} size="small" className=' w-[80%] ' label="Contact Number" type="text" />
                    <TextField style={{ marginTop: "20px", height: "10px" }} name='location' onChange={handleData} value={data.location} size="small" className=' w-[80%] ' label="Organisation Description" type="text" />
                    <div style={{marginTop:"15px",display:"block", width:"80%"}}>
                    <LocalizationProvider  dateAdapter={AdapterDayjs}>
                        <DemoContainer  className='w-full' components={['DatePicker']}>
                            <DatePicker
                                label="Foundation Date"
                                slotProps={{ textField: { size:"small", fullWidth:true } }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    </div>
                    <Button onClick={handleSubmit} variant="contained" style={{ background: "#1D6EB7", color: "white", position: "relative", bottom: "-10px" }}>Submit</Button>

                </div>
            </form>
        </>
    )
}

export default AddOrganisation;
