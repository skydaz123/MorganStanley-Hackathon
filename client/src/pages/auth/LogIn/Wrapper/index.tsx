import { ReactNode } from "react"
import { Box, Paper } from "@mui/material"
import Background from "./Background"
import Logo from "./Logo"
import Clouds from "./Clouds"

type Props = {
    children?: ReactNode
}
export default function Wrapper({ children }: Props) {
    return (
        <Box sx={{
            m: "64px auto",
            minHeight: "calc(100vh - 2*64px)",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "flex-end",
            paddingX: "32px",
            maxWidth: "1000px",
            boxSizing: "border-box",
            position: "relative",
        }}>
            <Background/>
            <Logo/>
            <Paper variant="outlined" sx={{
                maxWidth: "500px",
                boxSizing: "border-box",
                flex: 1,
                p: "48px 80px",
                borderColor: "#EC701B",
                borderWidth: "3px",
                borderRadius: "0 12px 12px 0",
                position: "relative",
            }}>
                <Clouds/>
                {children}
            </Paper>
        </Box>
    )
}


