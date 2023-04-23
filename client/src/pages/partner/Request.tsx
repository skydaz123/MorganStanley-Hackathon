import useHideSlidingWindowOnLoad from "../../hooks/useHideSlidingWindowOnLoad"
import { Box, LinearProgress, Stack, Typography } from "@mui/material"
import { z } from "zod"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import FormField from "../../components/FormField"
import CustomButton from "../../components/CustomButton"

const inputSchema = z.number()
    .positive("Amount needs to be positive")
    .or(z.string().regex(/\d+/, "Invalid number").transform(Number))
    .refine((n) => n >= 0)

const formSchema = z.object({
    perishReceived: inputSchema,
    nonPerishReceived: inputSchema,
    perishGiven: inputSchema,
    nonPerishGiven: inputSchema,
    foodThrownOut: inputSchema,
})

export default function Request() {
    useHideSlidingWindowOnLoad()

    const [loading, setLoading] = useState(false)
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            foodReceived: "",
            foodDonated: "",
        },
        resolver: zodResolver(formSchema),
        mode: "all",
    })

    const submit = handleSubmit(async values => {
        setLoading(true)

        // REPLACE THIS WITH ACTUAL CALL TO API
        await new Promise(res => {
            setTimeout(() => {
                res(undefined)
            }, 2000)
        })

        setLoading(false)

        console.log("[ReportComponent]", values)
        reset()
    })

    return (
        <Box sx={{ p: "32px" }}>
            <Typography variant="h4" gutterBottom sx={{
                color: '#F46E21',
                fontSize: '30px',
                fontFamily: 'Montserrat',
            }}>
                Report Submission
            </Typography>
            <Stack spacing="20px" maxWidth="500px">
                {
                    loading &&
                    <LinearProgress sx={{
                        "& .MuiLinearProgress-bar": {
                            backgroundColor: "#EC701B"
                        }
                    }}/>
                }
                <FormField
                    control={control}
                    id="foodReceived"
                    label="Enter the amount of food received (in lbs)"
                    separateLabel
                />
                <FormField
                    control={control}
                    id="foodDonated"
                    label="Enter the amount of food donated (in lbs)"
                    separateLabel
                />

                <CustomButton variant="outlined" onClick={submit} disabled={loading}>
                    Submit Report
                </CustomButton>
            </Stack>
        </Box>
    )
}
