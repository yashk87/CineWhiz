import React, { useState } from 'react'
import { Button, TextField, Autocomplete } from '@mui/material';


const Department = () => {

    const [formValues, setFormValues] = useState({
        DepartmentName : "",
        DepartmentDescription: "",
        DepartmentLocation: "",
        CostCenter: "",
        CostCenterDescription: "",
        DepartmentDeligateName: ""
    })

    const handleChange = e => {
        const{ name, value } = e.target
        setFormValues({
            ...formValues,
            [name] : value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log("Form values: ", formValues);
    }

    // Dummy list for combobox
    const Employees = [
      { label: 'Ramesh patnayak', email: "ramesh1@gmail.com" },
      { label: 'Raj Sathe', email: "rsathe@gmail.com" },
      { label: 'Jay Jadhav', email: "jayjadhav1@gmail.com" },
      { label: 'Vaibhav Pawar', email: "vaibhavp@gmail.com" },
      { label: 'Ram Desai', email: "ramdesai1@gmail.com" },
      { label: "Vishal Solanki", email: "vsolanki1@gmail.com" },
      { label: 'Viraj Raman', email: "vraman@gmail.com" },
      { label: 'Harsh Modi', email: "harshmodi2@gmail.com",}
      ]

      const Locations = [
        { City: "Banglore" },
        { City: "Chennai" },
        { City: "Tokyo" },
        { City: "Pune" },
        { City: "Nagpur" },
        { City: "Jaipur" },
        { City: "New York" }
      ]

  return(
  <div
    style={{
      display: "flex",
      width: "100%",
      // height: "100%",         //
      justifyContent: "center",
      padding: "20px 0 0",
      boxSizing: "border-box",
    }}
  >
    <div className="content-center flex justify-center my-0 p-0 bg-[#F8F8F8]">
      <div className="w-[400px] shadow-lg rounded-lg border py-3 px-8 grid items-center">
        <h4 className="text-center mb-2 text-lg font-bold text-blue-500">
          Add Department details
        </h4>
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-5">
            <TextField
                required
                inputProps={{
                  pattern: '^[a-zA-Z0-9]*$',
                  minLength: 2,
                  maxLength: 40
                }}
              error={true}
                helperText={"No special characters, Max 5 words allowed"}
                size="small"
                fullWidth
                name="DepartmentName"
                label="Department Name"
                type="text"
                placeholder="Enter Department name"
                onChange={handleChange}
            />
            <TextField
                size="small"
                inputProps={{
                  minLength: 8,
                  maxLength: 250
                }}
                helperText={"Max 250 characters allowed"}
                fullWidth
                multiline
                name="DepartmentDescription"
                label="Department Description"
                type="text"
                placeholder="Enter Department Description"
                onChange={handleChange}
            />
            <Autocomplete
              size='small'
              fullWidth
              disablePortal
              id="DepartmentLocation"
              options={Locations}
              getOptionLabel={(option) => option.City}
              renderInput={(params) => <TextField {...params} label="Enter Department location" required/>}
            />
            <TextField
                required
                size="small"
                fullWidth
                name="CostCenter"
                label="Cost Center (Prefix)"
                type="text"
                placeholder="Enter Cost Center"
                onChange={handleChange}
            />
            <TextField
                size="small"
                fullWidth
                inputProps={{
                  minLength: 8,
                  maxLength: 50
                }}
                name="CostCenterDescription"
                label="Cost Center description"
                multiline
                type="text"
                placeholder="Enter Cost Center description"
                onChange={handleChange}
            />
            <Autocomplete
              size='small'
              fullWidth
              disablePortal
              id="addDepartmentHeadName"
              options={Employees}
              renderInput={(params) => <TextField {...params} label="Add Department head name" required/>}
            />
            <Autocomplete
              size='small'
              fullWidth
              disablePortal
              id="addDepartmentHeadDelegateName"
              options={Employees}
              renderInput={(params) => <TextField {...params} label="Add Department head delegate name" />}
            />
            <Button
                fullWidth={false}
                variant="contained"
                className="w-[100px] content-center text-white m-auto"
                type="submit"
                style={{backgroundColor:"#1d6eb7", color:"white"}}
            >
                Submit
            </Button>
        </form>
      </div>
    </div>
  </div>
  
)};

export default Department;