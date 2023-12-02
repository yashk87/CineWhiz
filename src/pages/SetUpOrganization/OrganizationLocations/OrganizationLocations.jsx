import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Country, State } from "country-state-city";
import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage, IntlProvider } from "react-intl";
import { useParams } from "react-router-dom";
import { TestContext } from "../../../State/Function/Main";
import { UseContext } from "../../../State/UseState/UseContext";
import Selector from "./selector";
import Setup from "../Setup";

const OrganizationLocation = () => {
  const { cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];
  const { handleAlert } = useContext(TestContext);
  const organizationId = useParams().id;
  let countryData = Country.getAllCountries();
  const continents = [
    { name: "Asia" },
    { name: "Africa" },
    { name: "Europe" },
    { name: "North America" },
    { name: "South America" },
    { name: "Australia" },
    { name: "Antarctica" },
  ];

  const [locationList, setLocationList] = useState([]);
  const [addressLine1, setAddressLine1] = useState("");
  const [editing, setEditing] = useState(false);
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [continent, setContinent] = useState(continents[0] || "");
  const [shortName, setShortName] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [country, setCountry] = useState(countryData[0]);
  const [stateData, setStateData] = useState(
    State.getStatesOfCountry(country?.name)
  );
  const [editIndex, setEditIndex] = useState(null);
  const [state, setState] = useState(
    State.getStatesOfCountry(country?.isoCode)[0]
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchLocationList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/route/location/getOrganizationLocations",
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        setLocationList(response.data);
      } catch (error) {
        console.error(error.response.data.message);
      }
    };

    fetchLocationList();
  }, [authToken]);

  useEffect(() => {
    if (open) {
      setStateData(
        (prevData) => State.getStatesOfCountry(country?.isoCode) || prevData
      );
    }

    if (!open) {
      setState("");
      setContinent(continents[0]);
      setStateData("");
    }
    // eslint-disable-next-line
  }, [open, country]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEditing(false);
    setOpen(false);
    setEditIndex(null);
    setAddressLine1("");
    setAddressLine2("");
    setCity("");
    setShortName("");
    setContinent(continents[0]?.name);
    setState("");
    setPinCode("");
    setCountry(Country.getAllCountries()[0]);
  };

  const handleAddLocation = async () => {
    const newLocation = {
      country: country?.name,
      state: state?.name,
      city,
      shortName,
      continent: continent?.name,
      pinCode,
      addressLine1,
      addressLine2,
      organizationId,
    };
    try {
      await axios.post(
        "http://localhost:4000/route/location/addOrganizationLocations",
        newLocation,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      const response = await axios.get(
        "http://localhost:4000/route/location/getOrganizationLocations",
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      setLocationList(response.data);

      handleAlert(true, "success", "Location added successfully");
      handleClose();
    } catch (error) {
      console.error(error.response.data.message);
      handleAlert(true, "error", error.response.data.error);
      console.log(error);
    }
  };

  const handleEditLocation = async (index) => {
    setEditing(true);
    setEditIndex(index);
    const selectedLocation = locationList[index];
    setAddressLine1(selectedLocation.addressLine1);
    setAddressLine2(selectedLocation.addressLine2);
    setCity(selectedLocation.city);
    setShortName(selectedLocation.shortName);
    setContinent(
      continents.find(
        (continent) => continent?.name === selectedLocation.continent
      )
    );
    setPinCode(selectedLocation.pinCode);
    const selectedCountry = Country.getAllCountries().find(
      (country) => country?.name === selectedLocation.country
    );
    setCountry(
      Country.getAllCountries().find(
        (country) => country?.name === selectedLocation.country
      ) || null
    );
    setStateData(Country.getAllCountries(country?.isoCode));
    setState(
      State.getStatesOfCountry(selectedCountry.isoCode).find(
        (state) => state?.name === selectedLocation.state
      )
    );

    setOpen(true);
  };

  const handleUpdateLocation = async (index) => {
    setEditIndex(index);

    const newLocation = {
      country: country?.name,
      state: state?.name,
      continent: continent?.name,
      shortName,
      city,
      pinCode,
      addressLine1,
      addressLine2,
      organizationId,
    };
    try {
      await axios.put(
        `http://localhost:4000/route/location/updateOrganizationLocations/${locationList[index]._id}`,
        newLocation,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      const response = await axios.get(
        "http://localhost:4000/route/location/getOrganizationLocations",
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      setLocationList(response.data);
      handleAlert(true, "success", "Location updated successfully");
      handleClose();
    } catch (error) {
      console.error("error is: ", error.response.data.error);
      handleAlert(true, "error", error.response.data.error);
    }
  };

  const handleDeleteLocation = async (index) => {
    try {
      await axios.delete(
        `http://localhost:4000/route/location/deleteOrganizationLocations/${locationList[index]._id}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      const response = await axios.get(
        "http://localhost:4000/route/location/getOrganizationLocations",
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      setLocationList(response.data);

      handleAlert(true, "success", "Location deleted successfully");
    } catch (error) {
      console.error(error.response.data.message);
      handleAlert(true, "error", error.response.data.error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (editing) handleUpdateLocation();
      else handleAddLocation();
      handleClose();
    }
  };

  return (
    <Setup>
      <IntlProvider locale="en">
        <Container>
          <div className="flex items-center justify-between px-4 py-2">
            <Typography
              variant="h4"
              gutterBottom
              color={"primary"}
              fontWeight={800}
              fontSize={20}
              className="text-2xl"
            >
              <FormattedMessage
                id="organizationLocations"
                defaultMessage="Organization Locations"
              />
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={handleOpen}
            >
              <FormattedMessage id="addLocation" defaultMessage="Add Location" />
            </Button>
          </div>

          {locationList.length === 0 ? (
            <Typography variant="body1">No Locations Added</Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <FormattedMessage id="continent" defaultMessage="Continent" />
                  </TableCell>
                  <TableCell>
                    <FormattedMessage id="country" defaultMessage="Country" />
                  </TableCell>
                  <TableCell>
                    <FormattedMessage id="state" defaultMessage="State" />
                  </TableCell>
                  <TableCell>
                    <FormattedMessage
                      id="shortname"
                      defaultMessage="Short Name"
                    />
                  </TableCell>
                  <TableCell>
                    <FormattedMessage id="address" defaultMessage="Address" />
                  </TableCell>
                  <TableCell>
                    <FormattedMessage id="actions" defaultMessage="Actions" />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {locationList
                  .sort((a, b) => {
                    if (a.continent !== b.continent) {
                      return a.continent.localeCompare(b.continent);
                    }
                    return a.country.localeCompare(b.country);
                  })
                  .map((location, index) => (
                    <TableRow key={index}>
                      <TableCell>{location.continent}</TableCell>
                      <TableCell>{location.country}</TableCell>
                      <TableCell>{location.state}</TableCell>
                      <TableCell>{location.shortName}</TableCell>
                      <TableCell>
                        {`${location.addressLine1} ${location.addressLine2} ${location.pinCode}`}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleEditLocation(index)}
                          aria-label="edit"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteLocation(index)}
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}

        <Dialog open={open} onClose={handleClose} onKeyDown={handleKeyDown}>
          <DialogTitle>
            {editIndex !== null ? (
              <FormattedMessage
                id="editLocation"
                defaultMessage="Edit Location"
              />
            ) : (
              <FormattedMessage
                id="addLocation"
                defaultMessage="Add Location"
              />
            )}
          </DialogTitle>
          <DialogContent>
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "8px",
                marginBottom: "8px",
              }}
            >
              <div>
                <p>Continent:</p>
                <Selector
                  required
                  key={continent?.name}
                  data={continents}
                  selected={continent}
                  setSelected={setContinent}
                />
              </div>
              <div className="!w-[46%]">
                <p>Short Name:</p>
                <TextField
                  label={"short name *"}
                  className="pb-0"
                  variant="outlined"
                  size="small"
                  value={shortName}
                  onChange={(e) => setShortName(e.target.value)}
                  fullWidth
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "8px",
                marginBottom: "8px",
              }}
            >
              <div>
                <p>Country:</p>
                <Selector
                  key={country?.phonecode}
                  data={Country.getAllCountries()}
                  selected={country}
                  setSelected={setCountry}
                  required
                />
              </div>
              {stateData && (
                <div>
                  <div>State:</div>
                  <Selector
                    key={country?.phonecode}
                    data={stateData}
                    selected={state}
                    setSelected={setState}
                    required
                  />
                </div>
              )}
            </div>
            <TextField
              label={<FormattedMessage id="city" defaultMessage="City" />}
              variant="outlined"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
              style={{ marginTop: "8px" }}
              required
            />
            <TextField
              label={
                <FormattedMessage
                  id="pinCode"
                  defaultMessage="Pin Code/Zip Code"
                />
              }
              variant="outlined"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              fullWidth
              required
              style={{ marginTop: "8px" }}
            />
            <TextField
              label={
                <FormattedMessage
                  id="addressLine1"
                  defaultMessage="Address Line 1"
                />
              }
              variant="outlined"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              style={{ marginTop: "8px" }}
              fullWidth
              required
            />
            <TextField
              label={
                <FormattedMessage
                  id="addressLine2"
                  defaultMessage="Address Line 2"
                />
              }
              variant="outlined"
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
              style={{ marginTop: "8px" }}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              <FormattedMessage id="cancel" defaultMessage="Cancel" />
            </Button>
            <Button
              onClick={() => {
                if (editIndex !== null) {
                  handleUpdateLocation(editIndex);
                } else {
                  handleAddLocation();
                }
              }}
              color="primary"
            >
              {editIndex !== null ? (
                <FormattedMessage
                  id="saveChanges"
                  defaultMessage="Save Changes"
                />
              ) : (
                <FormattedMessage
                  id="addLocation"
                  defaultMessage="Add Location"
                />
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </IntlProvider>
    </Setup>
  );
};

export default OrganizationLocation;
