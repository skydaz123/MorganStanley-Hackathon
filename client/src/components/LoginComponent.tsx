import FormField from "./FormField";
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import {Button, Stack, Typography} from "@mui/material";
import React from "react";
import Divider from '@mui/material/Divider';
import GoogleButton from 'react-google-button'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginComponent() {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            userName: "",
            password: "",
        },
        mode: "all"
    })

    const submit = handleSubmit(values => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, values.userName, values.password)
            .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            // ...
            })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error, errorMessage);
            // ..
        });
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
                Sign in
            </Typography>
            <Stack spacing='20px'>
                <FormField id="userName" control={control} placeholder="Email"/>
                <FormField id="password" control={control} placeholder="Password" type="password"/>
                <Button variant="outlined" onClick={submit} sx={{
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
                    Login
                </Button>
            </Stack>
            <Typography sx={{
                fontFamily: 'Montserrat',
                color: '#EC701B',
                fontSize: 10,
                textAlign: 'center',
                marginBottom: '2px'
            }}>
                Don't have an account? <a href="">Sign up!</a>
            </Typography>
            <Divider sx={{ borderColor: '#EC701B', marginBottom: '8px', borderWidth:'0.5px' }}/>
            <GoogleButton
                onClick={() => { console.log('Google button clicked') }}
            />
        </Box>
    )
}