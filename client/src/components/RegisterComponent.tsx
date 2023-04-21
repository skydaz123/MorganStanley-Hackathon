import FormField from "./FormField";
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import {Button, Stack, Typography} from "@mui/material";
import React from "react";
import Divider from '@mui/material/Divider';
import GoogleButton from 'react-google-button'


export default function RegisterComponent() {
    const { control } = useForm({
        defaultValues: {
            providerName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
            street: "",
            city: "",
            state: "",
            zip: "",
            maxCapacity: "",
            fridgeNumber: ""
        },
        mode: "all"
    })

    // MULTILINE IS FOR ADDING NOTES AND ROWS
    // USE CTRL ALT L FOR REFORMAT
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
            <Typography sx={{
                color: '#F46E21',
                fontSize: 40,
                textAlign: 'center',
                fontFamily: 'Montserrat, sans-serif'
            }}>
                Sign up
            </Typography>
            <Stack spacing='20px'>
                <FormField id="providerName" control={control} placeholder="Provider Name"/>
                <FormField id="email" control={control} placeholder="Email"/>
                <FormField id="password" control={control} placeholder="Password" type="password"/>
                <FormField id="confirmPassword" control={control} placeholder="Confirm Password" type="password"/>
                <FormField id="phoneNumber" control={control} placeholder="Phone Number"/>
                <FormField id="street" control={control} placeholder="Street"/>
                <FormField id="city" control={control} placeholder="City"/>
                <FormField id="state" control={control} placeholder="State/Province"/>
                <FormField id="zip" control={control} placeholder="Zip/Postal Code"/>
                <FormField id="maxCapacity" control={control} label="Please enter the max capacity of food your establishment can hold (in lbs)" separateLabel/>
                <FormField id="fridgeNumber" control={control} label="Please enter the number of fridges your establishment contains" separateLabel/>
                <Button variant="outlined" sx={{
                    border: '3px solid #EC701B !important',
                    '&:hover': {
                        border: '3px solid #EC701B !important',
                        backgroundColor: '#F46E21cc',
                        color: 'white !important'
                    },
                    color: '#EC701B',
                    fontSize: 20,
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '650'
                }}>
                    Register
                </Button>
            </Stack>
            <Typography sx={{
                fontFamily: 'Montserrat',
                color: '#EC701B',
                fontSize: 10,
                textAlign: 'center',
                marginBottom: '2px'
            }}>
                Already have an account? <a href="">Sign in!</a>
            </Typography>
            <Divider sx={{ borderColor: '#EC701B', marginBottom: '8px', borderWidth:'0.5px' }}/>
            <GoogleButton
                onClick={() => { console.log('Google button clicked') }}
            />
        </Box>
    )
}