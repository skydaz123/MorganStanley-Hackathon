import FormField from "./FormField";
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import {Button, Stack, Typography} from "@mui/material";
import React from "react";


export default function ReportComponent() {
    const { control, handleSubmit    } = useForm({
        defaultValues: {
            perishReceived: "",
            nonPerishReceived: "",
            perishGiven: "",
            nonPerishGiven: ""
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
                <FormField id="perishReceived" control={control} label="Enter the amount of perishable food received (in lbs)" separateLabel/>
                <FormField id="nonPerishReceived" control={control} label="Enter the amount of non-perishable food received (in lbs)" separateLabel/>
                <FormField id="perishGiven" control={control} label="Enter the amount of perishable food donated" separateLabel/>
                <FormField id="nonPerishGiven" control={control} label="Enter the amount of non-perishable food donated" separateLabel/>
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