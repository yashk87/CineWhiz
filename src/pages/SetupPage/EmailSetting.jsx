import React, { useState, useContext } from 'react';
import {
    Container,
    Typography,
    Button,
    TextField
} from "@mui/material";
import axios from 'axios';
import { UseContext } from '../../State/UseState/UseContext'; // Adjust the path based on your project structure

const EmailSetting = () => {
    const { setAppAlert } = useContext(UseContext); // Use the setAppAlert function from UseContext

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

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
            await axios.post('http://localhost:4000/route/email/create', { email });

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
            <Container style={{ width: "500px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", position: "relative", top: "8rem", paddingTop: "1rem" }}>
                <Typography style={{ fontSize: "1.5rem" }}>Add email</Typography>
                <TextField
                    style={{ marginBottom: "1rem", marginTop: "1rem" }}
                    required
                    name="emailId"
                    size="small"
                    className="w-full"
                    label="Email ID"
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    error={Boolean(error)}
                    helperText={error}
                />
                <Button
                    style={{ marginBottom: "2rem", marginTop: '0.5rem' }}
                    color='warning'
                    variant='contained'
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Container>
        </>
    );
};

export default EmailSetting;
