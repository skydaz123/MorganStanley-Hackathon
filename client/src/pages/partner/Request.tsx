import useHideSlidingWindowOnLoad from "../../hooks/useHideSlidingWindowOnLoad"
import { Box, LinearProgress, Stack, Typography } from "@mui/material"
import { z } from "zod"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import FormField from "../../components/FormField"
import CustomButton from "../../components/CustomButton"
import { useAddReportMutation } from "../../redux/apis/localApi/firebaseApi"
import { useDispatch, useSelector } from "react-redux"
import { getAuthSlice } from "../../redux/store"

const inputSchema = z.number()
    .positive("Amount needs to be positive")
    .or(z.string().regex(/\d+/, "Invalid number").transform(Number))
    .refine((n) => n >= 0)

const formSchema = z.object({
    foodReceived: inputSchema,
    foodGiven: inputSchema
})

export default function Request() {
    useHideSlidingWindowOnLoad()

    const state = useSelector(getAuthSlice)
    const [loading, setLoading] = useState(false)
    const [addReport] = useAddReportMutation()

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            foodReceived: "",
            foodDonated: "",
        },
        //resolver: zodResolver(formSchema),
        mode: "all",
    })

    const submit = handleSubmit(async values => {
        setLoading(true)
        console.log("State is", state);
        const {foodReceived, foodDonated} = values;
        let lb_recieved = parseInt(foodReceived)
        let lb_given = parseInt(foodDonated);

        // @ts-ignore
        let email: any = state.user.email;

        try{
            setLoading(true);
            const result = await addReport({
                lb_recieved,
                lb_given,
                email,

            }).unwrap()

        }
        catch (error) {
            console.error(error)
        }

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
