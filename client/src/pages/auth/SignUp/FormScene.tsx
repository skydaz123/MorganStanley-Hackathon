import { Button, Link, Stack, Typography } from "@mui/material"
import Wrapper from "../Wrapper"
import FormField from "../../../components/FormField"
import Divider from "@mui/material/Divider"
import CustomButton from "../../../components/CustomButton"
import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useDispatch } from "react-redux"
import { updateData } from "../../../redux/slices/signUpSlice"

const formSchema = z.object({
    email: z.string()
        .min(1, "Email is required")
        .email("Invalid email"),
    password: z.string()
        .min(1, "Password is required")
        .min(8, "Password must have more than 8 characters"),
    confirmPassword: z.string()
        .min(1, "Password confirmation is required"),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
})

type Props = {
    nextPage: () => any
}
export default function FormScene({ nextPage }: Props) {
    const dispatch = useDispatch()
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        resolver: zodResolver(formSchema),
        mode: "all",
    })

    const submit = handleSubmit(async values => {
        const { email, password } = values
        dispatch(updateData({ email, password }))
        nextPage()
    })

    return (
        <Wrapper reverse title="Sign Up">
            <Stack spacing="16px">
                <FormField id="email" control={control} placeholder="Email"/>
                <FormField id="password" control={control} placeholder="Password" type="password"/>
                <FormField id="confirmPassword" control={control} placeholder="Confirm Password" type="password"/>
            </Stack>
            <Typography variant="body2" sx={{
                fontFamily: "Montserrat, sans-serif",
                textAlign: "center",
                marginTop: "16px",
                marginBottom: "8px",
            }}>
                Already have an account? <Link href="/auth/login">Log In</Link>!
            </Typography>
            <Divider sx={{
                borderColor: "#EC701B",
                marginBottom: "16px",
                borderWidth: "0.5px"
            }}/>
            <Stack spacing="16px">
                {/*<CustomButton>*/}
                {/*    Sign In with Google*/}
                {/*</CustomButton>*/}
                <CustomButton onClick={submit}>Sign Up</CustomButton>
            </Stack>
        </Wrapper>
    )
}
