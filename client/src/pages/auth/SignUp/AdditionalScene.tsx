import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { updateData } from "../../../redux/slices/signUpSlice"
import FormField from "../../../components/FormField"
import { Button, Stack } from "@mui/material"
import React, { useState } from "react"
import CustomButton from "../../../components/CustomButton"
import { useLazyGetAddressInfoQuery } from "../../../redux/apis/mapsApi/geocodeApi"
import LoadingBar from "../../../components/LoadingBar"

const formSchema = z.object({
    providerName: z.string()
        .min(1, "Provider name is required"),
    phoneNumber: z.string()
        .min(1, "Phone number is required"),
    street: z.string()
        .min(1, "Street is required"),
    city: z.string()
        .min(1, "City is required"),
    state: z.string()
        .min(1, "State is required"),
    zip: z.string()
        .min(1, "Zip code is required"),
    maxCapacity: z.number()
        .positive("Amount needs to be positive")
        .or(z.string().regex(/\d+/, "Invalid number").transform(Number))
        .refine((n) => n >= 0),
})

type Props = {
    nextPage: () => any
}
export default function AdditionalScene({ nextPage }: Props) {
    const dispatch = useDispatch()

    const [lookup] = useLazyGetAddressInfoQuery()
    const [loading, setLoading] = useState(false)

    const { control, handleSubmit, setError } = useForm({
        defaultValues: {
            providerName: "",
            phoneNumber: "",
            street: "",
            city: "",
            state: "",
            zip: "",
            maxCapacity: "",
        },
        resolver: zodResolver(formSchema),
        mode: "all",
    })

    const submit = handleSubmit(async values => {
        const {
            maxCapacity,
            zip,
            street,
            state,
            city,
            ...rest
        } = values

        const address = [street, city, state, zip].join(", ")

        try {
            setLoading(true)

            const { results: [res] } = await lookup(address).unwrap()
            const { geometry: { location: { lat, lng } } } = res

            dispatch(updateData({
                ...rest,
                lat,
                lng,
                zip,
                address,
                maxCapacity: Number(maxCapacity)
            }))

            setLoading(false)
            nextPage()
        } catch (e) {
            setError("street", {
                type: "server",
                message: "Your street address may be incorrect"
            })
            setError("city", {
                type: "server",
                message: "Your city may be incorrect"
            })
            setError("state", {
                type: "server",
                message: "Your state may be incorrect"
            })
            setError("zip", {
                type: "server",
                message: "Your zip code may be incorrect"
            })

            setLoading(false)
        }
    })

    return (
        <Stack spacing="20px" maxWidth="500px" margin="32px">
            {
                loading &&
                <LoadingBar/>
            }
            <FormField
                control={control}
                id="providerName"
                placeholder="Provider Name"
            />
            <FormField
                control={control}
                id="phoneNumber"
                placeholder="Phone Number"
            />
            <FormField
                control={control}
                id="street"
                placeholder="Street"
            />
            <FormField
                control={control}
                id="city"
                placeholder="City"
            />
            <FormField
                control={control}
                id="state"
                placeholder="State/Province"
            />
            <FormField
                control={control}
                id="zip"
                placeholder="Zip/Postal Code"
            />
            <FormField
                control={control}
                id="maxCapacity"
                label="Please enter the max capacity of food your establishment can hold (in lbs)" separateLabel
            />
            <CustomButton variant="outlined" onClick={submit}>
                Continue
            </CustomButton>
        </Stack>
    )
}
