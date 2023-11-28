import React, { useState, useEffect, } from 'react';
import {
  Container,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
  Button,

  MenuItem,
  Select,
  FormControl,
  InputLabel,


//   FormControlLabel,
//   Checkbox,
  Typography,
} from "@mui/material";
import axios from 'axios'

const DepartmentDeletion = () => {
    const [departments, setDepartments] = useState([])
    const [locations, setLocations] = useState([])

    useEffect(() => {
         axios.get('http://localhost:4000/route/department/get').then((response) => {
            setDepartments(response.data.department)
            console.log(response.data.department[0].departmentName);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, []);
      useEffect(() =>{
            axios.get('http://localhost:4000/route/location/getOrganizationLocations').then((response) =>{
            setLocations(response.data)
            console.log(response.data);
            })
      })

  return (
    <>
    <Container style={{width:"500px", position:"relative", top:"5rem", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", paddingTop:"1rem"}}>
    <Typography style={{ fontSize: "1.5rem" }}>Delete Department</Typography>
        <FormControl
                required
                style={{ width: "100%", height: "10px", marginBottom: 50, marginTop:20 }}
                size="small"
              >
                <InputLabel id="industry-type-label">Select Department</InputLabel>

                {
                        departments.map((data, index) =>(
                            <Select
                            labelId="industry-type-label"
                            id="industry-type"
                            name="industry_type"
                          >
                            <MenuItem value="IT">{data.departmentName}</MenuItem>
                            </Select>
                        ))
                    }
              </FormControl>
        <FormControl
                required
                style={{ width: "100%", height: "10px", marginBottom: 50 }}
                size="small"
              >
                <InputLabel id="industry-type-label">Select Location</InputLabel>
                <Select
                            labelId="industry-type-label"
                            id="industry-type"
                            name="industry_type"
                          >

                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="MECH">MECH</MenuItem>
                  <MenuItem value="ACCOUNTS">ACCOUNTS</MenuItem>
                  </Select>

              </FormControl>
              <Button variant='contained' style={{marginBottom:"2rem"}}>Delete</Button>
    </Container>
    </>
  )
}

export default DepartmentDeletion