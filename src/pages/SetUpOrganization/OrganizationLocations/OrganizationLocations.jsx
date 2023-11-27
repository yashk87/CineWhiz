import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
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
    { name: "Antartica" },
  ];

  const [locationList, setLocationList] = useState([]);
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [continent, setContinent] = useState(continents[0] || "");
  const [shortName, setShortName] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [country, setCountry] = useState(countryData[0]);
  const [stateData, setStateData] = useState(
    State.getStatesOfCountry(country?.name)
  );
  const [state, setState] = useState(stateData[0]?.name || "");
  const [editIndex, setEditIndex] = useState(null);
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
    console.log("open", open);
    if (!open) {
      console.log(`🚀 ~ country:`, country);
      setStateData(State.getStatesOfCountry(country?.isoCode));
    }
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditIndex(null);
    setAddressLine1("");
    setAddressLine2("");
    setCity("");
    setState("");
    setPinCode("");
    setCountry(Country.getAllCountries()[0]);
  };

  const handleAddLocation = async () => {
    const newLocation = {
      country: country.name,
      state: state.name,
      city,
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
      handleAlert(true, "error", error.response.data.message);
    }
  };
  useEffect(() => {
    stateData && setState(stateData[0]);
  }, [stateData]);
  const handleEditLocation = async (index) => {
    setEditIndex(index);
    const selectedLocation = locationList[index];
    setAddressLine1(selectedLocation.addressLine1);
    setAddressLine2(selectedLocation.addressLine2);
    setCity(selectedLocation.city);
    setPinCode(selectedLocation.pinCode);
    const selectedCountry = Country.getAllCountries().find(
      (country) => country.name === selectedLocation.country
    );
    console.log(selectedCountry);
    setCountry(
      Country.getAllCountries().find(
        (country) => country.name === selectedLocation.country
      ) || null
    );
    setState(
      State.getStatesOfCountry(selectedCountry.isoCode).find(
        (state) => state.name === selectedLocation.state
      )
    );

    // console.log(selectedCountry);
    // console.log(state);
    setOpen(true);
    // };

    // const handleEditLocation = async ( index ) => {
    //     setEditIndex(index);
    //   const newLocation = {
    //     country:locationList[index].country,
    //     state:locationList[index].state,
    //     city:locationList[index].city,
    //     pinCode:locationList[index].pinCode,
    //     addressLine1:locationList[index].addressLine1,
    //     addressLine2:locationList[index].addressLine2,
    //     organizationId:locationList[index].organizationId,
    //   };
    //   setOpen(true)
    // try {
    //   await axios.put(`http://localhost:4000/route/location/updateOrganizationLocations/${locationList[index]._id}`, newLocation, {
    //     headers: {
    //       Authorization: authToken,
    //     },
    //   });

    //   const response = await axios.get("http://localhost:4000/route/location/getOrganizationLocations", {
    //     headers: {
    //       Authorization: authToken,
    //     },
    //   });
    //   setLocationList(response.data);

    //   handleAlert(true, "success", "Location added successfully");
    //   handleClose();
    // } catch (error) {
    //   console.error(error.response.data.message);
    //   handleAlert(true, "error", error.response.data.message);
    // }
  };
  const handleUpdateLocation = async (index) => {
    setEditIndex(index);

    const newLocation = {
      country: country.name,
      state: state.name,
      city,
      pinCode,
      addressLine1,
      addressLine2,
    };
    console.log(`🚀 ~ index:`, index);
    console.log(`🚀 ~ locationList:`, locationList[index - 1]);
    try {
      await axios.put(
        `http://localhost:4000/route/location/updateOrganizationLocation/${locationList[index]._id}`,
        newLocation,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
    } catch (error) {
      console.log(`🚀 ~ error:`, error);
      console.error(error.response.data.message);
      handleAlert(true, "error", error.response.data.message);
    }
  };

  const handleDeleteLocation = async (index) => {
    try {
      await axios.delete(
        `http://localhost:4000/route/location/deleteOrganizationLocation/${locationList[index]._id}`,
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
      handleAlert(true, "error", error.response.data.message);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddLocation();
      handleClose();
    }
  };

  return (
    <IntlProvider locale="en">
      <Container>
        <Typography
          variant="h4"
          gutterBottom
          color={"primary"}
          fontWeight={800}
          fontSize={20}
          className="text-2xl pt-5"
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
          style={{ marginBottom: "16px" }}
        >
          <FormattedMessage id="addLocation" defaultMessage="Add Location" />
        </Button>
        {locationList.length === 0 ? (
          <Typography variant="body1">No Locations Added</Typography>
        ) : (
          <List>
            {locationList.map((location, index) => (
              <ListItem key={index} style={{ marginBottom: "8px" }}>
                <Card
                  variant="outlined"
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <CardContent>
                    <Typography variant="body1">
                      {location.country && `${location.country}, `}
                      {location.state && `${location.state}, `}
                      {location.city && `${location.city}, `}
                      {location.pinCode && `${location.pinCode}, `}
                      {location.addressLine1 && `${location.addressLine1}, `}
                      {location.addressLine2 && `${location.addressLine2}.`}
                    </Typography>
                  </CardContent>
                  <CardActions
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
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
                    </div>
                  </CardActions>
                </Card>
              </ListItem>
            ))}
          </List>
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
                  key={1}
                  data={continents}
                  selected={continent}
                  setSelected={setContinent}
                />
              </div>
              <TextField
                label={
                  <FormattedMessage id="shortname" defaultMessage="ShortName" />
                }
                variant="outlined"
                value={shortName}
                onChange={(e) => setShortName(e.target.value)}
                fullWidth
                style={{ marginTop: "8px" }}
              />
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
                  key={1}
                  data={Country.getAllCountries()}
                  selected={country}
                  setSelected={setCountry}
                />
              </div>
              {stateData && (
                <div>
                  <div>State:</div>
                  <Selector
                    key={2}
                    data={stateData}
                    selected={state}
                    setSelected={setState}
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
              onClick={() => handleUpdateLocation(editIndex)}
              color="primary"
            >
              {editIndex !== null ? (
                <FormattedMessage
                  id="saveChanges"
                  defaultMessage="Save Changes"
                />
              ) : (
                <FormattedMessage id="add" defaultMessage="Add" />
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </IntlProvider>
  );
};

export default OrganizationLocation;
