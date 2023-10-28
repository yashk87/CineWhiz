import React, { useState } from 'react'
import { Button, TextField, Autocomplete } from '@mui/material';


const DepartmentForm = () => {

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
      { label: 'The Shawshank Redemption', year: 1994 },
      { label: 'The Godfather', year: 1972 },
      { label: 'The Godfather: Part II', year: 1974 },
      { label: 'The Dark Knight', year: 2008 },
      { label: '12 Angry Men', year: 1957 },
      { label: "Schindler's List", year: 1993 },
      { label: 'Pulp Fiction', year: 1994 },
      {
        label: 'The Lord of the Rings: The Return of the King',
        year: 2003,
      }]

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
                  minLength: 5,
                  maxLength: 10
                }}
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
                required
                size="small"
                inputProps={{
                  minLength: 8,
                  maxLength: 50
                }}
                fullWidth
                multiline
                name="DepartmentDescription"
                label="Department Description"
                type="text"
                placeholder="Enter Department Description"
                onChange={handleChange}
            />
            <TextField
                required
                size="small"
                fullWidth
                name="DepartmentLocation"
                label="Department location"
                type="text"
                placeholder="Enter Department location"
                onChange={handleChange}
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
                required
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
              required
              size='small'
              fullWidth
              disablePortal
              id="DepartmentHeadName"
              options={Employees}
              renderInput={(params) => <TextField {...params} label="Department head name" />}
            />
            <Autocomplete
              required
              size='small'
              fullWidth
              disablePortal
              id="DepartmentDelegateName"
              options={Employees}
              renderInput={(params) => <TextField {...params} label="Department delegate name" />}
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

export default DepartmentForm;