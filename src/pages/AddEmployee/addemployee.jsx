import * as React from "react";
import { Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import useAddEmpForm from "../../hooks/useAddEmpForm";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Checkbox, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import axios from "axios";
import { TestContext } from "../../State/Function/Main";
import { useContext } from "react";
import { UseContext } from "../../State/UseState/UseContext";
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
const designationData = ["Manager", "Engineer", "Analyst", "Developer"];
const locationData = ["Mumbai", "Delhi", "Pune"];
const AddEmployee = () => {
  const { handleAlert } = useContext(TestContext);
  const { cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];
  const {
    first_name,
    setFirstName,
    last_name,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    companyemail,
    setCompanyEmail,
    address,
    setAddress,
    phone_number,
    setPhoneNumber,
    deptname,
    setDeptName,
    mgrempid,
    setMgrEmpId,
    citizenship,
    setCitizenShip,
    joining_date,
    setJoiningDate,
    date_of_birth,
    setDateOfBirth,
    gender,
    setGender,
    worklocation,
    setWorkLocation,
    designation,
    setDesignation,
    employmentType,
    setEmploymentType,
    firstNameError,
    lastNameError,
    emailError,
    passwordError,
    setFirstNameError,
    setLastNameError,
    setEmailError,
    setPasswordError,
  } = useAddEmpForm();
  const handleEmploymentTypeChange = (event) => {
    setEmploymentType(event.target.value);
  };
  const handleRadioChange = (event) => {
    setGender(event.target.value);
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDesignation(typeof value === "string" ? value.split(",") : value);
  };
  const handleLocationChange = (event) => {
    const {
      target: { value },
    } = event;
    setWorkLocation(typeof value === "string" ? value.split(",") : value);
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      first_name,
      last_name,
      email,
      password,
      companyemail,
      address,
      phone_number,
      deptname,
      mgrempid,
      citizenship,
      employmentType,
      date_of_birth,
      joining_date,
      designation,
      worklocation,
      gender,
    };
    console.log("user", user);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/route/employee/add-employee`,
        user,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      if (response.data.success) {
        handleAlert(true, "error", "Invalid authorization");
      } else {
        handleAlert(true, "success", response.data.message);
      }
    } catch (error) {
      handleAlert(
        true,
        "error",
        error.response ? error.response.data.message : error.message
      );
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          padding: "20px 0 0",
          boxSizing: "border-box",
        }}
      >
        <div className="content-center flex justify-center my-0 p-0 bg-[#F8F8F8]">
          <div className="w-[400px] shadow-lg rounded-lg border py-3 px-8 grid items-center">
            <Button>Add Employee</Button>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center space-y-5"
            >
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
                error={!!firstNameError}
                helperText={firstNameError}
                fullWidth
                margin="normal"
                required
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
                fullWidth
                margin="normal"
                required
              />
              <TextField
                size="small"
                type="email"
                label="Personal Email ID"
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
                error={!!emailError}
                helperText={emailError}
                fullWidth
                margin="normal"
                required
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
                type="email"
                label="Company email ID"
                name="companyemail"
                id="companyemail"
                value={companyemail}
                onChange={(e) => setCompanyEmail(e.target.value)}
                fullWidth
                margin="normal"
                required
              />

              <TextField
                size="small"
                type="text"
                label="Residential current Address"
                name="address"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
                margin="normal"
                required
              />

              <TextField
                size="small"
                type="text"
                label="Phone Number"
                name="phone_number"
                id="phone_number"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                fullWidth
                margin="normal"
                required
              />

              <TextField
                size="small"
                type="text"
                label="Department name"
                name="deptname"
                id="deptname"
                value={deptname}
                onChange={(e) => setDeptName(e.target.value)}
                fullWidth
                margin="normal"
                required
              />

              <TextField
                size="small"
                type="text"
                label="Manager Employee ID"
                name="mgrempid"
                id="mgrempid"
                value={mgrempid}
                onChange={(e) => setMgrEmpId(e.target.value)}
                fullWidth
                margin="normal"
                required
              />

              <TextField
                size="small"
                type="text"
                label="Citizenship status"
                name="citizenship"
                id="citizenship"
                value={citizenship}
                onChange={(e) => setCitizenShip(e.target.value)}
                fullWidth
                margin="normal"
                required
              />

              <div className="w-full">
                <FormControl sx={{ width: 330 }}>
                  <Select
                    value={employmentType}
                    onChange={handleEmploymentTypeChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Employment Type" }}
                  >
                    <MenuItem value="" disabled>
                      Select Employment Type
                    </MenuItem>
                    <MenuItem value="fullTime">Full-time</MenuItem>
                    <MenuItem value="partTime">Part-time</MenuItem>
                    <MenuItem value="contractor">Contractor</MenuItem>
                    <MenuItem value="freelancer">Freelancer</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="w-full">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    className="w-full"
                    components={["DatePicker"]}
                    required
                  >
                    <DatePicker
                      label="Date of Birth"
                      value={date_of_birth}
                      onChange={(newDate) => {
                        const formattedDate =
                          dayjs(newDate).format("YYYY-MM-DD");
                        setDateOfBirth(formattedDate);
                      }}
                      slotProps={{
                        textField: { size: "small", fullWidth: true },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

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
                        const formattedDate =
                          dayjs(newDate).format("YYYY-MM-DD");
                        setJoiningDate(formattedDate);
                      }}
                      slotProps={{
                        textField: { size: "small", fullWidth: true },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              <div className="w-full">
                <FormControl sx={{ width: 330 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Designation
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={designation}
                    onChange={handleChange}
                    input={<OutlinedInput label="Designation" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={
                              <>
                                {value}
                                <span
                                  style={{
                                    cursor: "pointer",
                                    marginLeft: "4px",
                                  }}
                                  onClick={() => {
                                    const updatedDesignation =
                                      designation.filter(
                                        (item) => item !== value
                                      );
                                    setDesignation(updatedDesignation);
                                  }}
                                ></span>
                              </>
                            }
                          />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {designationData.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={designation.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="w-full">
                <FormControl sx={{ width: 330 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Work Location
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={worklocation}
                    onChange={handleLocationChange}
                    input={<OutlinedInput label="Work Location" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={
                              <>
                                {value}
                                <span
                                  style={{
                                    cursor: "pointer",
                                    marginLeft: "4px",
                                  }}
                                  onClick={() => {
                                    const updatedWorkLocation =
                                      worklocation.filter(
                                        (item) => item !== value
                                      );
                                    setWorkLocation(updatedWorkLocation);
                                  }}
                                ></span>
                              </>
                            }
                          />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {locationData.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={worklocation.indexOf(name) > -1} />
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
                    value={gender}
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
                      value="transgender"
                      control={<Radio />}
                      label="Transgender"
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
