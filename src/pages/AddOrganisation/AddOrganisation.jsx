import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import React, { useContext, useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
  Avatar,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { TestContext } from "../../State/Function/Main";
import { UseContext } from "../../State/UseState/UseContext";

function AddOrganisation() {
  const data = {
    name: "",
    logo: "",
    web_url: "",
    organization_linkedin_url: "",
    organization_tagline: "",
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
  const [organizationLinkedinUrlLabel, setOrganizationLinkedinUrlLabel] =
    useState("Organization Linkedin Url");
  const [organizationLinkedinUrlError, setOrganizationLinkedinUrlError] =
    useState(false);
  const { handleAlert } = useContext(TestContext);

  const { cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];

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

      });
  };

  const isEmailValid = (email) => {
    return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email);
  };

  const isOrganizationLinkedinUrlValid = (organizationLinkedinUrl) => {
    return /^(http(s)?:\/\/)?([a-zA-Z]+\.)*linkedin\.com\/[-\w/]+/gm.test(
      organizationLinkedinUrl
    );
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
    } else if (name === "organization_linkedin_url") {
      if (!isOrganizationLinkedinUrlValid(value)) {
        setOrganizationLinkedinUrlLabel("enter valid linkedin url");
        setOrganizationLinkedinUrlError(true);
        if (e.target.value === "") {
          setOrganizationLinkedinUrlError(false);
          setOrganizationLinkedinUrlLabel("Organisation Linkedin Url");
        }
      } else {
        setOrganizationLinkedinUrlLabel("Organisation Linkedin Url");
        setOrganizationLinkedinUrlError(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:4000/route/organization/create",
        inputdata,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      console.log(result);

      console.log("pipe check one  1");

      if (result.data.success) {
        console.log("hii i am called as error");
        handleAlert(true, "error", "Invalid authorization");
      }

    
      handleAlert(true, "success", "Organization created successfully");
    } catch (error) {
      console.error(error.response.data.message);
      handleAlert(true, "error", error.response.data.message);


    }
    setInputData({
      name: "",
      web_url: "",
      organization_linkedin_url: "",
      organization_tagline: "",
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
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          padding: "40px 0 0",
          boxSizing: "border-box",
        }}
        className="bg-gray-50"
      >
        <div className="content-center bg-white flex justify-center my-0 p-0 ">
          <div className="w-[600px] shadow-lg rounded-lg border py-8 px-8 grid items-center">
            <h4 className="mb-6 text-2xl font-semibold text-blue-500">
              Add Organization
            </h4>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center space-y-5"
            >
              <TextField
                required
                name="name"
                onChange={handleData}
                value={inputdata.name}
                size="small"
                className="w-full"
                label="My Organisation Name"
                type="text"
              />
              <TextField
                required
                name="web_url"
                onChange={handleData}
                value={inputdata.web_url}
                size="small"
                className="w-full"
                label="Url Of Website"
                type="text"
              />
              <TextField
                name="organization_linkedin_url"
                onChange={handleData}
                error={organizationLinkedinUrlError}
                value={inputdata.organization_linkedin_url}
                size="small"
                className="w-full"
                InputProps={{
                  style: {
                    borderColor: organizationLinkedinUrlError ? "red" : "blue",
                  },
                }}
                label={organizationLinkedinUrlLabel}
                type="text"
              />
              <TextField
                name="organization_tagline"
                onChange={handleData}
                value={inputdata.organization_tagline}
                size="small"
                className="w-full"
                label="Organization Tagline"
                type="text"
              />
              <FormControl
                required
                style={{ width: "100%", height: "10px", marginBottom: 30 }}
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
                name="email"
                onChange={handleData}
                value={inputdata.email}
                size="small"
                className="w-full"
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
                name="location"
                onChange={handleData}
                value={inputdata.location}
                size="small"
                className="w-full"
                label="Location"
                type="text"
              />
              <TextField
                required
                name="contact_number"
                onChange={handleData}
                value={inputdata.contact_number}
                size="small"
                className="w-full"
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
                name="description"
                onChange={handleData}
                value={inputdata.description}
                size="small"
                className="w-full"
                label="Organisation Description"
                type="text"
              />
              <div
                style={{ marginTop: "15px", display: "block", width: "100%" }}
              >
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
                        setInputData({
                          ...inputdata,
                          foundation_date: newDate,
                        });
                        console.log(newDate);
                      }}
                      slotProps={{
                        textField: { size: "small", fullWidth: true },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <div
                  className="flex"
                  style={{ position: "relative", top: "20px" }}
                >
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

              <div className="w-full">
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  style={{
                    background: "#1D6EB7",
                    color: "white",
                    bottom: "-15px",
                  }}
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddOrganisation;
