import { Button, Checkbox, ListItemText, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import axios from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { TestContext } from "../../../State/Function/Main";
import { UseContext } from "../../../State/UseState/UseContext";
import useProfileForm from "../../../hooks/useProfileForm";
const AddProfile = () => {
  const locations = useLocation();
  const { orgName } = locations.state;

  const { handleAlert } = useContext(TestContext);
  const { cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];

  const [userId, setUserId] = useState(null);
  const { id } = useParams();
  const {
    first_name,
    middle_name,
    last_name,
    email,
    password,
    phone_number,
    emergency_contact,
    address,
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
    joining_date,
    setJoiningDate,
  } = useProfileForm();

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  useEffect(() => {
    try {
      const decodedToken = jwtDecode(authToken);
      if (decodedToken && decodedToken.user._id) {
        setUserId(decodedToken.user._id);
      } else {
        setUserId("");
      }
    } catch (error) {
      console.error("Failed to decode the token:", error);
    }
  }, [authToken]);

  const [gender, setGender] = useState("");
  const handleRadioChange = (event) => {
    setGender(event.target.value);
  };

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
  const [profile, setProfile] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setProfile(typeof value === "string" ? value.split(",") : value);
  };

  const [availableProfiles, setAvailableProfiles] = useState([]);
  const fetchAvailableProfiles = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/route/profile/role/${id}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      if (response.data && response.data.roles) {
        if (response.data.roles.length > 0) {
          const filteredProfiles = response.data.roles.filter((role) => {
            return role.isActive;
          });

          if (filteredProfiles.length > 0) {
            setAvailableProfiles(filteredProfiles);
          } else {
            console.log(availableProfiles);
            handleAlert(
              true,
              "error",
              "No active profiles available. Please add active profiles for your organization."
            );
          }
        }
      }
    } catch (error) {
      console.error(error);
      handleAlert(true, "error", "Failed to fetch available profiles");
    }
  };

  useEffect(() => {
    fetchAvailableProfiles();
    // eslint-disable-next-line
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = {
        first_name,
        last_name,
        middle_name,
        email,
        password,
        phone_number,
        emergency_contact,
        address,
        gender,
        joining_date,
        profile,
        organizationId: id,
        creatorId: userId,
      };
      console.log(user);
      const response = await axios.post(
        `${process.env.REACT_APP_API}/route/employee/create-profile`,
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
  // if (response.data && response.data.profile) {
  //   const confirmCreateProfile = window.confirm(
  //     `${profile} is already exist . Do you want to create one More ?`
  //   );

  //   if (!confirmCreateProfile) {
  //     return;
  //   }
  // }

  const staticTitle =
    "This form is used to add relavant information of employee for";
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "50px 0 0",
          boxSizing: "border-box",
        }}
      >
        <div className="content-center flex justify-center my-0 p-0 bg-[#F8F8F8]">
          <div className="w-[700px] shadow-lg rounded-lg border py-3 px-8">
            <div className="flex items-center justify-center gap-4">
              <Tooltip title={`${staticTitle} ${orgName}`}>
                <Button>Add Profile</Button>
              </Tooltip>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
              <div className="flex items-center gap-20">
                <div className="w-full">
                  <FormControl sx={{ width: 280 }}>
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
                  </FormControl>
                </div>
                <div className="w-full">
                  <FormControl sx={{ width: 280 }}>
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
                  </FormControl>
                </div>
              </div>

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

              <div className="flex items-center gap-20">
                <div className="w-full">
                  <FormControl sx={{ width: 280 }}>
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
                  </FormControl>
                </div>
                <div className="w-full">
                  <FormControl sx={{ width: 280 }}>
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
                  </FormControl>
                </div>
              </div>

              <div className="flex items-center gap-20">
                <div className="w-full">
                  <FormControl sx={{ width: 280 }}>
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
                  </FormControl>
                </div>
                <div className="w-full">
                  <FormControl sx={{ width: 280 }}>
                    <TextField
                      size="small"
                      type="text"
                      label="Emergency Contact"
                      name="emergency_contact"
                      id="emergency_contact"
                      value={emergency_contact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                      fullWidth
                      margin="normal"
                    />
                  </FormControl>
                </div>
              </div>

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

              <div className="flex items-center gap-20">
                <div className="w-full">
                  <FormControl sx={{ width: 280 }}>
                    <InputLabel id="demo-multiple-checkbox-label">
                      Profile
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={profile}
                      onChange={handleChange}
                      input={<OutlinedInput label="profile" />}
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
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
                                      const updatedProfile = profile.filter(
                                        (item) => item !== value
                                      );
                                      setProfile(updatedProfile);
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
                      {availableProfiles.length === 0 ? (
                        <MenuItem disabled>
                          No roles available. Please add roles for your
                          organization.
                        </MenuItem>
                      ) : (
                        availableProfiles.map((name) => (
                          <MenuItem key={name._id} value={name.roleName}>
                            <Checkbox
                              checked={profile.indexOf(name.roleName) > -1}
                            />
                            <ListItemText primary={name.roleName} />
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>
                </div>
                <div className="w-full">
                  <FormControl sx={{ width: 280 }}>
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
                  </FormControl>
                </div>
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
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              <div className="flex justify-center">
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

      {/* <div
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
            <Tooltip title={`${staticTitle} ${orgName}`}>
              <Button>Add Profile</Button>
            </Tooltip>

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

              <div className="w-full">
                <FormControl sx={{ width: 330 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Profile
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={profile}
                    onChange={handleChange}
                    input={<OutlinedInput label="profile" />}
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
                                    const updatedProfile = profile.filter(
                                      (item) => item !== value
                                    );
                                    setProfile(updatedProfile);
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
                    {availableProfiles.length === 0 ? (
                      <MenuItem disabled>
                        No roles available. Please add roles for your
                        organization.
                      </MenuItem>
                    ) : (
                      availableProfiles.map((name) => (
                        <MenuItem key={name._id} value={name.roleName}>
                          <Checkbox
                            checked={profile.indexOf(name.roleName) > -1}
                          />
                          <ListItemText primary={name.roleName} />
                        </MenuItem>
                      ))
                    )}
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
            </form>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default AddProfile;
