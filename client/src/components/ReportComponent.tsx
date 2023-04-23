import FormField from "./FormField";
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import {Button, Stack, Typography} from "@mui/material";
import React from "react";


export default function ReportComponent() {
    const { control, handleSubmit    } = useForm({
        defaultValues: {
            foodReceived: "",
            foodGiven: "",
        },
        mode: "all"
    })
    const submit = handleSubmit(values => {
        console.log(values)
    })
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
            <Typography sx={{
                color: '#F46E21',
                fontSize: 40,
                textAlign: 'center',
                fontFamily: 'Montserrat, sans-serif'
            }}>
                Report Form
            </Typography>
            <Stack spacing='20px'>
                <FormField id="foodReceived" control={control} label="Enter the amount of food received (in lbs)" separateLabel/>
                <FormField id="foodGiven" control={control} label="Enter the amount of food donated (in lbs)" separateLabel/>
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
                    Submit Report
                </Button>
            </Stack>
        </Box>
    )
}