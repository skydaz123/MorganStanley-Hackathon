import logo from "../../../images/acfb-logo.png"
import { Box, Typography } from "@mui/material"

export default function Logo() {
    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "16px",
            flex: 1,
            overflow: "hidden",
        }}>
            <img src={logo} width="200px"/>
            <Typography variant="h4" sx={{
                // fontFamily: "Montserrat, sans-serif",
                textAlign: "center",
                color: "#EC701B",
                paddingBottom: "48px",
                WebkitTextStroke: "white 1px",
                fontWeight: "bold",
            }}>Placeholder</Typography>
        </Box>
    )
}
