import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, Typography } from '@mui/material';

export default function AddProfiles() {
  return (
    <div className='flex items-center justify-center flex-col h-full bg-slate-300'>
      <div className="shadow-xl p-8 m-6 rounded-md bg-white">
        <Typography
          className='font-semibold text-blue-500 text-2xl mb-4'
          variant="h4"
        >
          Add Profiles for Organisation
        </Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Department Head" />
          <FormControlLabel control={<Checkbox />} label="Department Head Delegate" />
          <FormControlLabel control={<Checkbox />} label="Department Admin" />
          <FormControlLabel control={<Checkbox />} label="Manager" />
          <FormControlLabel control={<Checkbox />} label="Human Resource (HR)" />
        </FormGroup>
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </div>
  );
}
