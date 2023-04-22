import Wrapper from "./Wrapper"
import { Link, Stack, Typography } from "@mui/material"
import React from "react"
import { useForm } from "react-hook-form"
import FormField from "../../../components/FormField"
import Divider from "@mui/material/Divider"
import CustomButton from "../../../components/CustomButton"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
    email: z.string()
        .min(1, "Email is required")
        .email("Invalid email"),
    password: z.string()
        .min(1, "Password is required")
        .min(8, "Password must have more than 8 characters"),
})

export default function LogIn() {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(formSchema),
        mode: "all",
    })

    const submit = handleSubmit(async values => {
        console.log("[LogIn]", values)
    })

    return (
        <Wrapper>
            <Typography variant="h3" sx={{
                color: "#F46E21",
                textAlign: "center",
                fontFamily: "Montserrat, sans-serif",
                marginBottom: "48px",
            }}>
                Log In
            </Typography>
            <Stack spacing="16px">
                <FormField id="email" control={control} placeholder="Email"/>
                <FormField id="password" control={control} placeholder="Password" type="password"/>
            </Stack>
            <Typography variant="body2" sx={{
                fontFamily: "Montserrat, sans-serif",
                textAlign: "center",
                marginTop: "16px",
                marginBottom: "8px",
            }}>
                Don't have an account? <Link href="/auth/signup">Sign Up</Link>!
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
                <CustomButton onClick={submit}>Log In</CustomButton>
            </Stack>
        </Wrapper>
    )
}
