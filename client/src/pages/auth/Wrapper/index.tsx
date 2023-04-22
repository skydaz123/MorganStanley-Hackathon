import React, { ReactNode } from "react"
import { Box, Paper, Typography } from "@mui/material"
import Background from "./Background"
import Logo from "./Logo"
import Clouds from "./Clouds"

type Props = {
    title: string
    reverse?: boolean
    children?: ReactNode
}
export default function Wrapper({ title, reverse, children }: Props) {
    return (
        <Box sx={{
            m: "64px auto",
            minHeight: "calc(100vh - 2*64px)",
            display: "flex",
            alignItems: "stretch",
            flexDirection: reverse ? "row-reverse" : "row",
            paddingX: "32px",
            maxWidth: "1000px",
            boxSizing: "border-box",
            position: "relative",
        }}>
            <Background reverse={reverse}/>
            <Logo/>
            <Paper variant="outlined" sx={{
                maxWidth: "500px",
                boxSizing: "border-box",
                flex: 1,
                p: "48px 80px",
                borderColor: "#EC701B",
                borderWidth: "3px",
                borderRadius: reverse ? "12px 0 0 12px" : "0 12px 12px 0",
                position: "relative",
            }}>
                <Clouds reverse={reverse}/>
                <Typography variant="h3" sx={{
                    color: "#F46E21",
                    textAlign: "center",
                    fontFamily: "Montserrat, sans-serif",
                    marginBottom: "48px",
                }}>
                    {title}
                </Typography>
                {children}
            </Paper>
        </Box>
    )
}


