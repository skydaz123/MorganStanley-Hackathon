import React, { ReactNode } from "react"
import { Box, styled } from "@mui/material"

const SpecialBox = styled(Box)(() => ({
    width: "150px",
    height: "150px",
    border: "2px solid #EC701B",
    position: "fixed",
    transform: "translate(-50%, -50%)",
}))

type Props = {
    children?: ReactNode
}
export default function Wrapper({ children }: Props) {
    return (
        <Box sx={{
            padding: "32px",
            boxSizing: "border-box",
            minHeight: "100vh",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <SpecialBox sx={{
                width: "400px",
                height: "400px",
                borderRadius: "50%",
                borderBottom: 0,
                top: "100%",
                left: "100%",
            }}/>
            <SpecialBox sx={{
                left: "4%",
                top: "50%",
            }}/>
            <SpecialBox sx={{
                left: "10%",
                top: "60%",
            }}/>
            <SpecialBox sx={{
                width: "160px",
                left: "80%",
                top: "22%",
            }}/>
            <SpecialBox sx={{
                width: "160px",
                left: "83%",
                top: "31%",
            }}/>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "32px",
            }}>
                {children}
            </Box>
        </Box>
    )
}
