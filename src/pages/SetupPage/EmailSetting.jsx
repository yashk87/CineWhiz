import React, { useState, useContext } from 'react';
import {
    Typography,
    Button,
    TextField
} from "@mui/material";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { UseContext } from '../../State/UseState/UseContext'; // Adjust the path based on your project structure
import Setup from "../SetUpOrganization/Setup";

const EmailSetting = () => {
    const { organisationId } = useParams();
    console.log(organisationId);
    const { setAppAlert } = useContext(UseContext); // Use the setAppAlert function from UseContext

    const [email, setEmail] = useState('');
    const [organizationId, setOrganizationId] = useState()
    const [error, setError] = useState('');
    // setorgId(id)

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) {
            setError('Email is required');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setError('Invalid email address');
            return;
        }

        try {
            // Assuming the API call is successful
            // setOrganizationId(id)
            
            await axios.post(`${process.env.REACT_APP_API}/route/email/create`, { email,organizationId:organisationId });

            // Show success alert
            setAppAlert({
                alert: true,
                type: 'success',
                msg: 'Email submitted successfully!',
            });

            // Clear the email and error after successful submission
            setEmail('');
            setError('');
        } catch (error) {
            // Handle error and show error alert if needed
            console.error('Error submitting email:', error);
            setAppAlert({
                alert: true,
                type: 'error',
                msg: 'Error submitting email. Please try again.',
            });
        }
    };

    return (
        <>
         <section className="bg-gray-50 overflow-hidden min-h-screen w-full">
        <Setup>
        <article className="SetupSection bg-white w-[80%] flex gap-5  h-max shadow-md rounded-sm border  items-center">
                <Typography className='pl-5 py-2' style={{ fontSize: "1.5rem" }}>Add email</Typography>
                <TextField
                    style={{ marginBottom: "1rem", marginTop: "1rem" }}
                    required
                    name="emailId"
                    size="small"
                    className="pl-5 w-[30vw]"
                    label="Email ID"
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    error={Boolean(error)}
                    helperText={error}
                />
                <Button
                    color='warning'
                    variant='contained'
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </article>
            </Setup>
            </section>
        </>
    );
};

export default EmailSetting;
