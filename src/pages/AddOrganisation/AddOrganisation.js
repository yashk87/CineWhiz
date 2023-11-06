import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import React, { useContext, useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
  Avatar,
  Input,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import { TestContext } from "../../State/Function/Main";

const AddOrganisation = () => {
  const data = {
    name: "",
    logo: "",
    web_url: "",
    industry_type: "",
    email: "",
    location: "",
    contact_number: "",
    description: "",
    foundation_date: "",
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [emailLabel, setEmailLabel] = useState("Organisation Email");
  const [numberLabel, setNumberLabel] = useState("Phone Number");
  const [emailError, setEmailError] = useState(false);
  const [inputdata, setInputData] = useState(data);

  const [contactNumberError, setContactNumberError] = useState(false);
  const { handleAlert } = useContext(TestContext);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "lhyvmmdu");
    await axios
      .post("https://api.cloudinary.com/v1_1/dnpj0dyxu/image/upload", formData)
      .then((resp) => {
        console.log(resp.data.secure_url);
        setInputData((prev) => ({
          ...prev,
          logo: resp.data.secure_url,
        }));
        // setLogo(resp.data.secure_url)
      });
  };

  const isEmailValid = (email) => {
    return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email);
  };

  const isContactNumberValid = (contactNumber) => {
    return /^\d{10}$/.test(contactNumber);
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputdata,
      [name]: name === "email" ? value.toLowerCase() : value,
    });

    if (name === "contact_number") {
      if (!isContactNumberValid(value)) {
        setNumberLabel("number should be 10 digits only");
        setContactNumberError(true);
      } else {
        setNumberLabel("Phone Number");
        setContactNumberError(false);
      }
    } else if (name === "email") {
      if (!isEmailValid(value)) {
        setEmailLabel("enter valid email");
        setEmailError(true);
        if (e.target.value === "") {
          setEmailError(false);
          setEmailLabel("Organisation Email");
        }
      } else {
        setEmailLabel("Organisation Email");
        setEmailError(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:4000/route/organization/create",
        inputdata
      );
      console.log(result);

      console.log("pipe check one  1");

      if (result.data.success) {
        console.log("hii i am called as error");
        handleAlert(true, "error", "Invalid authorization");
      }

      // Show a success alert
      handleAlert(true, "success", "Organization created successfully");
    } catch (e) {
      console.error(e.response.data.msg);
      handleAlert(true, "error", e.response.data.msg);

      // Show an error alert
    }
    setInputData({
      name: "",
      web_url: "",
      industry_type: "",
      email: "",
      location: "",
      description: "",
      foundation_date: "",
      contact_number: "",
    });
    setSelectedImage(null);
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
            paddingTop: "5px",
            backgroundColor: "#fefdff",
            padding: "10px",
            paddingBottom: "30px",
            borderRadius: "5px",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            height: "90vh",
            border: "1.5PX solid rgb(177, 177, 177)",
            margin: "auto",
            position: "relative",
            top: "20px",
          }}
          maxWidth="sm"
        >
          <Typography
            style={{
              color: "#1D6EB7",
              fontWeight: "600",
              position: "relative",
              top: "15px",
            }}
            variant="h4"
          >
            Add Organisation
          </Typography>
          <TextField
            required
            style={{ marginTop: "20px", height: "10px" }}
            name="name"
            onChange={handleData}
            value={inputdata.name}
            size="small"
            className="w-[80%]"
            label="My Organisation Name"
            type="text"
          />
          <TextField
            required
            style={{ marginTop: "20px", height: "10px" }}
            name="web_url"
            onChange={handleData}
            value={inputdata.web_url}
            size="small"
            className="w-[80%]"
            label="Url Of Website"
            type="text"
          />
          <FormControl
            required
            style={{ marginTop: "20px", width: "80%", height: "10px" }}
            size="small"
          >
            <InputLabel id="industry-type-label">Industry Type</InputLabel>
            <Select
              labelId="industry-type-label"
              id="industry-type"
              name="industry_type"
              value={inputdata.industry_type}
              onChange={handleData}
            >
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="MECH">MECH</MenuItem>
              <MenuItem value="ACCOUNTS">ACCOUNTS</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            style={{ marginTop: "20px", height: "10px" }}
            name="email"
            onChange={handleData}
            value={inputdata.email}
            size="small"
            className="w-[80%]"
            label={emailLabel}
            type="email"
            error={emailError}
            InputProps={{
              style: {
                borderColor: emailError ? "red" : "blue",
              },
            }}
          />
          <TextField
            required
            style={{ marginTop: "20px", height: "10px" }}
            name="location"
            onChange={handleData}
            value={inputdata.location}
            size="small"
            className="w-[80%]"
            label="Location"
            type="text"
          />
          <TextField
            required
            style={{ marginTop: "20px", height: "10px" }}
            name="contact_number"
            onChange={handleData}
            value={inputdata.contact_number}
            size="small"
            className="w-[80%]"
            label={numberLabel}
            type="number"
            error={contactNumberError}
            InputProps={{
              style: {
                borderColor: contactNumberError ? "red" : "blue",
              },
            }}
          />
          <TextField
            required
            style={{ marginTop: "20px", height: "10px" }}
            name="description"
            onChange={handleData}
            value={inputdata.description}
            size="small"
            className="w-[80%]"
            label="Organisation Description"
            type="text"
          />
          <div style={{ marginTop: "15px", display: "block", width: "80%" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                className="w-full"
                components={["DatePicker"]}
                required
              >
                <DatePicker
                  label="Foundation Date"
                  value={inputdata.foundation_date}
                  onChange={(newDate) => {
                    setInputData({ ...inputdata, foundation_date: newDate });
                    console.log(newDate);
                  }}
                  slotProps={{ textField: { size: "small", fullWidth: true } }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <div className="flex" style={{ position: "relative", top: "20px" }}>
              <Input
                type="file"
                id="imageInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
                required
              />
              <label htmlFor="imageInput">
                <Button
                  variant="outlined"
                  color="primary"
                  component="span"
                  startIcon={<PhotoCamera />}
                >
                  Choose logo
                </Button>
              </label>
              {selectedImage && (
                <Avatar
                  src={selectedImage}
                  alt="Selected Image"
                  sx={{ width: 40, height: 40 }}
                  style={{ marginLeft: "3rem" }}
                  required
                />
              )}
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            variant="contained"
            style={{
              background: "#1D6EB7",
              color: "white",
              position: "relative",
              bottom: "-15px",
            }}
          >
            Submit
          </Button>
        </Container>
      </form>
    </>
  );
};

export default AddOrganisation;
