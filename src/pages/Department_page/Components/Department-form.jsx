import React, { useState } from 'react'
import { Button, TextField } from '@mui/material';


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


  return( 
  <div className="content-center flex justify-center my-4">
      <div className="w-[400px] shadow-lg rounded-lg border p-6 gap-6 grid items-center">
        <h4 className="p-2 text-center text-lg font-bold text-blue-500">
          Add Department details
        </h4>
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-5">
            <TextField
                required
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
                fullWidth
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
                label="Cost Center"
                type="text"
                placeholder="Enter Cost Center"
                onChange={handleChange}
            />
            <TextField
                required
                size="small"
                fullWidth
                name="CostCenterDescription"
                label="Cost Center description"
                type="text"
                placeholder="Enter Cost Center description"
                onChange={handleChange}
            />
            <TextField
                required
                size="small"
                fullWidth
                name="DepartmentDeligateName"
                label="Department deligate name"
                type="text"
                placeholder="Enter Department deligate name"
                onChange={handleChange}
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
)};

export default DepartmentForm;