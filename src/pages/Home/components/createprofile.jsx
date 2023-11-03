import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TestContext } from "../../../State/Function/Main";
import TermsCondition from "../../../components/termscondition/termsCondition";
import useProfileForm from "../../../hooks/useProfileForm";
import RoleSelect from "./roleselect";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const CreateProfile = () => {
  const { handleAlert } = useContext(TestContext);

  const {
    first_name,
    middle_name,
    last_name,
    email,
    password,
    phone_number,
    emergency_contact,
    gender,
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
  } = useProfileForm();

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };
  return (
    <>
      <div className="flex items-center justify-center p-8 box-border ">
        <div className="flex w-full h-full rounded-lg shadow-xl border bg-white">
          <div className="w-full md:w-1/2 p-8 flex flex-col items-center gap-4 justify-center">
            <form>
              <h1 className="text-3xl font-semibold  text-center text-blue-500">
                Add Employee
              </h1>
              <div className=" w-[300px]">
                <TextField
                  size="small"
                  type="text"
                  label="First Name"
                  name="firstName"
                  id="firstName"
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
                  name="middalName"
                  id="middalName"
                  value={middle_name}
                  onChange={(e) => setMiddalName(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  size="small"
                  type="text"
                  label="Last Name"
                  name="lastName"
                  id="lastName"
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
                  label="phone_number"
                  name="phone_number"
                  id="phone_number"
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
                  required
                  fullWidth
                  margin="normal"
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    className="w-full"
                    components={["DatePicker"]}
                    required
                  >
                    <DatePicker
                      label="Joining Date"
                      slotProps={{
                        textField: { size: "small", fullWidth: true },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <div>
                  <RoleSelect />
                </div>
                <div>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Gender
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
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

                <div>
                  <TermsCondition />
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
              </div>
            </form>
          </div>
          <div className="w-full md:w-1/2 p-8 bg-blue-500 rounded-r-lg items-center flex-col justify-center hidden md:flex ">
            <img
              src="/argan_logo.png"
              alt="My Img"
              className="w-36 h-36 object-cover mb-6 rounded-lg p-6 bg-white m-24"
            />
            <Link to="/">
              <Button
                variant="contained"
                fullWidth
                size="small"
                className=" bg-white"
                style={{
                  marginTop: "38px",
                  background: "white",
                  color: "#1976d2",
                }}
              >
                Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProfile;
