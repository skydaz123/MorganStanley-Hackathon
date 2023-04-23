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
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase"
import { useDispatch } from "react-redux"
import { register } from "../../redux/slices/authSlice"
import { useLazyGetUserQuery } from "../../redux/apis/localApi/firebaseApi"
import Role from "../../enums/role"

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
    const dispatch = useDispatch()

    const [getUser] = useLazyGetUserQuery()
    const [loading, setLoading] = useState(false)

    const { control, handleSubmit, reset } = useForm({
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

        const { email, password, } = values

        try {
            setLoading(true)

            const { user } = await signInWithEmailAndPassword(auth, email, password)

            const token = await user.getIdToken(true)

            const result = await getUser(token).unwrap()
            console.log(result)

            // add result to dispatch
            dispatch(register({
                email,
                id: user.uid,
                name: user.displayName,
                token,
            }))

            // use result.role to navigate
            switch (result.role) {
                case Role.Partner:
                    navigate("/partner")
                    break
                case Role.Distributor:
                    navigate("/map")
                    break
                case Role.Unknown:
                default:
                    console.error("Invalid role detected")
                    break
            }

            reset()
        } catch (error) {
            console.error(error)
        }

        setLoading(false)
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
                <CustomButton onClick={submit} disabled={loading}>Log In</CustomButton>
            </Stack>
        </Wrapper>
    )
}
