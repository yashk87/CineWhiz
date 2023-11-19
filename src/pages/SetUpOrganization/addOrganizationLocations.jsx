import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  List,
  ListItem,
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { FormattedMessage, IntlProvider } from 'react-intl';

const AddOrganizationLocations = () => {
  const [open, setOpen] = useState(false);
  const [locationList, setLocationList] = useState([]);
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [country, setCountry] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditIndex(null);
    setAddressLine1('');
    setAddressLine2('');
    setCity('');
    setState('');
    setPinCode('');
    setCountry('');
  };

  const handleAddLocation = () => {
    const newLocation = {
      addressLine1,
      addressLine2,
      city,
      state,
      pinCode,
      country,
    };

    if (editIndex !== null) {
      const updatedList = [...locationList];
      updatedList[editIndex] = newLocation;
      setLocationList(updatedList);
    } else {
      setLocationList([...locationList, newLocation]);
    }

    handleClose();
  };

  const handleEditLocation = (index) => {
    setEditIndex(index);
    const selectedLocation = locationList[index];
    setAddressLine1(selectedLocation.addressLine1);
    setAddressLine2(selectedLocation.addressLine2);
    setCity(selectedLocation.city);
    setState(selectedLocation.state);
    setPinCode(selectedLocation.pinCode);
    setCountry(selectedLocation.country);
    setOpen(true);
  };

  const handleDeleteLocation = (index) => {
    const updatedList = [...locationList];
    updatedList.splice(index, 1);
    setLocationList(updatedList);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
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
        className="text-2xl pt-5">
          <FormattedMessage id="organizationLocations" defaultMessage="Organization Locations" />
        </Typography>

        <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginBottom: '16px' }}>
          <FormattedMessage id="addLocation" defaultMessage="Add Location" />
        </Button>

        <List>
          {locationList.map((location, index) => (
            <ListItem key={index} style={{ marginBottom: '8px' }}>
              <Card variant="outlined" style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <CardContent>
                  <Typography variant="body1">
                    {location.pinCode && `${location.pinCode}, `}
                    {location.country && `${location.country}`}
                    {location.addressLine1 && `${location.addressLine1}, `}
                    {location.addressLine2 && `${location.addressLine2}, `}
                    {location.city && `${location.city}, `}
                    {location.state && `${location.state} - `}
                  </Typography>
                </CardContent>
                <CardActions style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <div>
                    <IconButton onClick={() => handleEditLocation(index)} aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteLocation(index)} aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </CardActions>
              </Card>
            </ListItem>
          ))}
        </List>

        <Dialog open={open} onClose={handleClose} onKeyDown={handleKeyDown}>
          <DialogTitle>
            {editIndex !== null ? (
              <FormattedMessage id="editLocation" defaultMessage="Edit Location" />
            ) : (
              <FormattedMessage id="addLocation" defaultMessage="Add Location" />
            )}
          </DialogTitle>
          <DialogContent>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <TextField
                label={<FormattedMessage id="pinCode" defaultMessage="Pin Code/Zip Code" />}
                variant="outlined"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                style={{ flex: '1' }}
              />
              <TextField
                label={<FormattedMessage id="country" defaultMessage="Country" />}
                variant="outlined"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                style={{ flex: '1' }}
              />
            </div>
            <TextField
              label={<FormattedMessage id="addressLine1" defaultMessage="Address Line 1" />}
              variant="outlined"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              fullWidth
            />
            <TextField
              label={<FormattedMessage id="addressLine2" defaultMessage="Address Line 2" />}
              variant="outlined"
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
              fullWidth
              style={{ marginTop: '8px' }}
            />
            <TextField
              label={<FormattedMessage id="city" defaultMessage="City" />}
              variant="outlined"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
              style={{ marginTop: '8px' }}
            />
            <TextField
              label={<FormattedMessage id="state" defaultMessage="State/Province/Region" />}
              variant="outlined"
              value={state}
              onChange={(e) => setState(e.target.value)}
              fullWidth
              style={{ marginTop: '8px' }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              <FormattedMessage id="cancel" defaultMessage="Cancel" />
            </Button>
            <Button onClick={handleAddLocation} color="primary">
              {editIndex !== null ? (
                <FormattedMessage id="saveChanges" defaultMessage="Save Changes" />
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

export default AddOrganizationLocations;
