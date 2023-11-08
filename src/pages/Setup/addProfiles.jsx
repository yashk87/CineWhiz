import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, Typography } from '@mui/material';


export default function AddProfiles() {
  return (
    <div className='flex items-center justify-center flex-col'>
    <div className="shadow-xl w-[900px] m-10">
      <FormGroup className="py-8 px-16">
        <h4
        
          className='font-semibold  text-blue-500  text-2xl pb-10'
          variant="h4"  
        >
          Add Profiles for Organisation
        </h4>
        <div>
          <FormControlLabel control={<Checkbox />} label="Department Head" />
          <FormControlLabel control={<Checkbox />} label="Department Head Delegate" />
          <FormControlLabel control={<Checkbox />} label="Department Admin" />
          <FormControlLabel control={<Checkbox />} label="Manager" />
          <FormControlLabel control={<Checkbox />} label="Human Resource (HR)" />
        </div>
      </FormGroup>
      <Button label="Submit" />
    </div>
    </div>
  );
}
