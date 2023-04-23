import useHideSlidingWindowOnLoad from "../../hooks/useHideSlidingWindowOnLoad"
import { Box, Stack, Typography } from "@mui/material"
import { z } from "zod"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import FormField from "../../components/FormField"
import CustomButton from "../../components/CustomButton"
import { useAddReportMutation } from "../../redux/apis/localApi/firebaseApi"
import { useSelector } from "react-redux"
import { getAuthSlice } from "../../redux/store"
import { zodResolver } from "@hookform/resolvers/zod"
import positiveNumberSchema from "../../schemas/positiveNumberSchema"
import LoadingBar from "../../components/LoadingBar"

const formSchema = z.object({
    foodReceived: positiveNumberSchema,
    foodGiven: positiveNumberSchema,
})

export default function Request() {
    useHideSlidingWindowOnLoad()

    const { user } = useSelector(getAuthSlice)
    const [loading, setLoading] = useState(false)
    const [addReport] = useAddReportMutation()

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            foodReceived: "",
            foodDonated: "",
        },
        resolver: zodResolver(formSchema),
        mode: "all",
    })

    const submit = handleSubmit(async values => {
        const {
            foodReceived,
            foodDonated
        } = values

        try {
            setLoading(true)

            await addReport({
                lb_recieved: Number(foodReceived),
                lb_given: Number(foodDonated),
                email: user?.email ?? "[UNKNOWN]",
            }).unwrap()

            setLoading(false)
            reset()
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
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
                    <LoadingBar/>
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
