import Wrapper from "./Wrapper"
import { LinearProgress, Link, Stack, Typography } from "@mui/material"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import FormField from "../../components/FormField"
import Divider from "@mui/material/Divider"
import CustomButton from "../../components/CustomButton"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
    email: z.string()
        .min(1, "Email is required")
        .email("Invalid email"),
    password: z.string()
        .min(1, "Password is required")
        .min(8, "Password must have more than 8 characters"),
})

export default function LogIn() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(formSchema),
        mode: "all",
    })

    const submit = handleSubmit(async values => {
        if (loading)
            return

        console.log("[LogIn]", values)

        setLoading(true)

        await new Promise(res => {
            setTimeout(() => {
                res(undefined)
            }, 2000)
        })

        setLoading(false)

        if (Math.random() < 0.5) {
            navigate("/map")
        } else {
            navigate("/partner")
        }
    })

    return (
        <Wrapper title="Log In">
            <Stack spacing="16px">
                {
                    loading &&
                    <LinearProgress sx={{
                        "& .MuiLinearProgress-bar": {
                            backgroundColor: "#EC701B"
                        }
                    }}/>
                }
                <FormField id="email" control={control} placeholder="Email"/>
                <FormField id="password" control={control} placeholder="Password" type="password"/>
            </Stack>
            <Typography variant="body2" sx={{
                fontFamily: "Montserrat, sans-serif",
                textAlign: "center",
                marginTop: "16px",
                marginBottom: "8px",
            }}>
                Already have an account? <Link href="/auth/signup">Sign Up</Link>!
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
                <CustomButton onClick={submit} disabled={loading}>Log In</CustomButton>
            </Stack>
        </Wrapper>
    )
}
