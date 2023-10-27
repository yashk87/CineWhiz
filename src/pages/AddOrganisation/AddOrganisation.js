import React, { useState } from "react";
// import "./addorganisation.css"
import { Button, Container, TextField, Typography } from "@mui/material";

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

export default AddOrganisation;
