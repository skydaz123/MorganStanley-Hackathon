import { Box, Typography } from "@mui/material"
import logo from "../../images/acfb-logo.png"

export default function BigLoader() {
    return (
        <Box sx={{
            m: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - 2*32px)",
            flexDirection: "column",
            gap: "24px",
        }}>
            <img src={logo} width="250"/>
            <Typography variant="h3" color="#EC701B">Loading</Typography>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                "@keyframes bounce": {
                    to: {
                        opacity: 0.3,
                        transform: "translateY(-32px)",
                    }
                },
                "& > div": {
                    width: "32px",
                    height: "32px",
                    margin: "48px 32px 0px 32px",
                    borderRadius: "50%",
                    backgroundColor: "#EC701B",
                    opacity: 1,
                    animation: "bounce 0.5s infinite alternate",
                },
                "& > div:nth-of-type(2)": {
                    animationDelay: "0.167s"
                },
                "& > div:nth-of-type(3)": {
                    animationDelay: "0.333s"
                },
            }}>
                <div/>
                <div/>
                <div/>
            </Box>
        </Box>
    )
}
