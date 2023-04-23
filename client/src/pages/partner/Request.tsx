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
            perishReceived: "",
            nonPerishReceived: "",
            perishGiven: "",
            nonPerishGiven: "",
            foodThrownOut: "",
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
            <Typography variant="h4" gutterBottom>Request Resources</Typography>
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
                    id="perishReceived"
                    label="Enter the amount of perishable food received (in lbs)"
                    separateLabel
                />
                <FormField
                    control={control}
                    id="nonPerishReceived"
                    label="Enter the amount of non-perishable food received (in lbs)"
                    separateLabel
                />
                <FormField
                    control={control}
                    id="perishGiven"
                    label="Enter the amount of perishable food donated"
                    separateLabel
                />
                <FormField
                    control={control}
                    id="nonPerishGiven"
                    label="Enter the amount of non-perishable food donated"
                    separateLabel
                />
                <FormField
                    control={control}
                    id="foodThrownOut"
                    label="Enter the amount of food thrown out (in lbs)"
                    separateLabel
                />
                <CustomButton variant="outlined" onClick={submit} disabled={loading}>
                    Submit Report
                </CustomButton>
            </Stack>
        </Box>
    )
}
