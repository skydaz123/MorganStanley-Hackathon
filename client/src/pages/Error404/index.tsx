import { Box, Stack } from "@mui/material"
import logo from "../../images/acfb-logo.png"
import CustomButton from "../../components/CustomButton"
import RedWord from "./RedWord"
import { useNavigate } from "react-router-dom"

export default function Error404() {
    const navigate = useNavigate()

    const goHome = () => navigate("/")

    return (
        <Stack spacing="48px" sx={{
            m: "36px",
            minHeight: "calc(100vh - 2*36px)",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
            }}>
                <RedWord>4</RedWord>
                <img src={logo} alt="ACFB" height="200px"/>
                <RedWord>4</RedWord>
            </Box>
            <Box>
                <CustomButton variant="outlined" onClick={goHome}>
                    Back to Home Page
                </CustomButton>
            </Box>
        </Stack>
    )
}
