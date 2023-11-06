import { Button, Container, TextField, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import axios from "axios";
import React, { useContext, useState } from "react";
import { TestContext } from "../../../State/Function/Main";
import useProfileForm from "../../../hooks/useProfileForm";
import { UseContext } from "../../../State/UseState/UseContext";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Department Admin",
  "Department Head",
  "Hr",
  "Manager",
  "Super Admin Deligate",
];

const AddEmployee = () => {
  const { cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];

  const { handleAlert } = useContext(TestContext);

  const {
    first_name,
    middle_name,
    last_name,
    email,
    password,
    phone_number,
    emergency_contact,
    address,
    location,
    firstNameError,
    lastNameError,
    emailError,
    passwordError,
    setFirstName,
    setLastName,
    setMiddalName,
    setEmail,
    setPassword,
    setEmailError,
    setFirstNameError,
    setLastNameError,
    setPasswordError,
    setPhoneNumber,
    setEmergencyContact,
    setAddress,
    setLocation,
    joining_date,
    setJoiningDate,
  } = useProfileForm();

  const [selectedValue, setSelectedValue] = useState("");

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const [profile, setProfile] = React.useState([]);

  const handleRoleChange = (event) => {
    const {
      target: { value },
    } = event;

    setProfile(typeof value === "string" ? value.split(",") : value);
  };

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      first_name,
      last_name,
      middle_name,
      email,
      password,
      phone_number,
      emergency_contact,
      address,
      location,
      selectedValue,
      joining_date,
      profile: profile.length <= 0 ? "Employee" : profile,
    };
    console.log(user);
    try {
      console.log(process.env.REACT_APP_API);

      const response = await axios.post(
        `${process.env.REACT_APP_API}/route/profile/create`,
        user,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      console.log(`🚀 ~ response:`, response);
      if (response.data.success) {
        console.log("hii i am called as error");
        handleAlert(true, "error", "Invalid authorization");
      }
      handleAlert(true, "success", response.data.message);
    } catch (error) {
      console.error(error.response.data.message);
      handleAlert(true, "error", error.response.data.message);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          height: "180vh",
          width: "100%",
        }}
        action=""
      >
        <Container
          style={{
            display: "flex",
            paddingTop: "10px",
            backgroundColor: "#fefdff",
            padding: "20px",
            paddingBottom: "30px",
            borderRadius: "5px",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            height: "170vh",
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
            Add Employee
          </Typography>
          <TextField
            size="small"
            type="text"
            label="First Name"
            name="first_name"
            id="first_name"
            value={first_name}
            onChange={(e) => {
              const enteredFirstName = e.target.value;
              setFirstName(enteredFirstName);

              if (
                enteredFirstName.length < 2 ||
                enteredFirstName.length > 30 ||
                /[^a-zA-Z]/.test(enteredFirstName)
              ) {
                setFirstNameError(
                  "First Name must be between 2 and 30 characters and should only contain letters."
                );
              } else {
                setFirstNameError("");
              }
            }}
            required
            fullWidth
            margin="normal"
            error={!!firstNameError}
            helperText={firstNameError}
          />

          <TextField
            size="small"
            type="text"
            label="Middal Name"
            name="middle_name"
            id="middle_name"
            value={middle_name}
            onChange={(e) => setMiddalName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            size="small"
            type="text"
            label="Last Name"
            name="last_name"
            id="last_name"
            value={last_name}
            onChange={(e) => {
              const enteredLastName = e.target.value;
              setLastName(enteredLastName);
              if (
                enteredLastName.length < 2 ||
                enteredLastName.length > 30 ||
                /[^a-zA-Z]/.test(enteredLastName)
              ) {
                setLastNameError(
                  "Last Name must be between 2 and 30 characters and should only contain letters"
                );
              } else {
                setLastNameError("");
              }
            }}
            error={!!lastNameError}
            helperText={lastNameError}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            size="small"
            type="email"
            label="Email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => {
              const enteredEmail = e.target.value;
              setEmail(enteredEmail);

              if (!isValidEmail(enteredEmail)) {
                setEmailError("Invalid email format");
              } else {
                setEmailError("");
              }
            }}
            required
            fullWidth
            margin="normal"
            error={!!emailError}
            helperText={emailError}
          />

          <TextField
            size="small"
            type="password"
            label="Password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (!e.target.value.match(passwordRegex)) {
                setPasswordError(
                  "Password must contain at least one number , special character.and and min length is 8"
                );
              } else {
                setPasswordError("");
              }
            }}
            required
            fullWidth
            margin="normal"
            error={!!passwordError}
            helperText={passwordError}
            InputProps={{
              inputProps: {
                pattern: passwordRegex.source,
              },
            }}
          />

          <TextField
            size="small"
            type="text"
            label="Phone Number"
            name="phone_number"
            id="phone_number"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            size="small"
            type="text"
            label="Emergency Contact"
            name="emergency_contact"
            id="emergency_contact"
            value={emergency_contact}
            onChange={(e) => setEmergencyContact(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            size="small"
            type="text"
            label="Address"
            name="address"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            size="small"
            type="text"
            label="Location"
            name="location"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <div className="w-full">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                className="w-full"
                components={["DatePicker"]}
                required
              >
                <DatePicker
                  label="Joining Date"
                  value={joining_date}
                  onChange={(newDate) => {
                    setJoiningDate(newDate);
                  }}
                  slotProps={{
                    textField: { size: "small", fullWidth: true },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <div className="w-full">
            <FormControl sx={{ width: "100%", mt: 1, mb: 2 }}>
              <InputLabel id="demo-multiple-checkbox-label">Profile</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={profile}
                onChange={handleRoleChange}
                input={<OutlinedInput label="profile" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={profile.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="w-full">
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedValue}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div className="text-center m-6">
            <Button
              className="px-4 py-2 text-base bg-blue-500 text-white rounded-lg"
              type="submit"
              variant="contained"
              color="primary"
              fullWidth={false}
              margin="normal"
            >
              Submit
            </Button>
          </div>
        </Container>
      </form>
    </>
  );
};

export default AddEmployee;
