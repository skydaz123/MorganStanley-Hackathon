import Wrapper from "./Wrapper"
import { Link, Stack, Typography } from "@mui/material"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import FormField from "../../components/FormField"
import Divider from "@mui/material/Divider"
import CustomButton from "../../components/CustomButton"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase"
import { useDispatch } from "react-redux"
import { addToken, register } from "../../redux/slices/authSlice"
import { useLazyGetUserQuery } from "../../redux/apis/localApi/firebaseApi"
import LoadingBar from "../../components/LoadingBar"
import useRedirectIfLoggedIn from "../../hooks/useRedirectIfLoggedIn"
import localApi from "../../redux/apis/localApi"

const formSchema = z.object({
    email: z.string()
        .min(1, "Email is required")
        .email("Invalid email"),
    password: z.string()
        .min(1, "Password is required")
        .min(8, "Password must have more than 8 characters"),
})

export default function LogIn() {
    useRedirectIfLoggedIn()

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

            const {
                token,
                expirationTime,
            } = await user.getIdTokenResult(true)
            dispatch(addToken({
                value: token,
                expirationTime: new Date(expirationTime).getTime(),
            }))

            const result = await getUser(undefined).unwrap()
            dispatch(register({
                role: result.role,
                email: result.email,
                name: result.name,
                id: user.uid,
            }))

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
                    <LoadingBar/>
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
