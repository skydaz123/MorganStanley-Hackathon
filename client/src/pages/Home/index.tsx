import { Stack, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import CustomButton from "../../components/CustomButton"
import logo from "../../images/acfb-logo.png"
import Wrapper from "./Wrapper"
import TextTransition from "react-text-transition"
import { useNavigate } from "react-router-dom"

const TEXTS = [
    "Engage",
    "Educate",
    "Empower",
    "End Hunger",
]

export default function Home() {
    const navigate = useNavigate()
    const [index, setIndex] = useState(0)

    const signIn = () => navigate("/auth")

    useEffect(() => {
        let update = true
        function freeze() {
            update = false
        }
        function unfreeze() {
            update = true
        }
        window.addEventListener("focusin", unfreeze)
        window.addEventListener("focusout", freeze)

        const iid = setInterval(() => {
            if (!update)
                return
            setIndex(prev => {
                if (prev === TEXTS.length - 1)
                    return 0
                return prev + 1
            })
        }, 1000)
        return () => {
            clearInterval(iid)
            window.removeEventListener("focusin", unfreeze)
            window.removeEventListener("focusout", unfreeze)
        }
    }, [])

    return (
        <Wrapper>
            <Stack spacing="8px">
                <img src={logo} alt="Placeholder" width="200px"/>
                <Typography sx={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "#EC701B",
                    fontSize: "32px",
                    textAlign: "center",
                    fontWeight: 600,
                }}>Placeholder</Typography>
            </Stack>
            <Typography component="q" sx={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "32px",
                display: "flex",
                flexDirection: "row",
            }}>
                <TextTransition inline>{TEXTS[index]}</TextTransition>
                <span style={{
                    color: '#EC701B',
                    fontStyle: 'oblique',
                    fontWeight: 600,
                    padding: "0 4px 0 4px",
                }}>Together</span>
            </Typography>
            <CustomButton variant="outlined" onClick={signIn}>
                Continue to Platform
            </CustomButton>
        </Wrapper>
    )
}