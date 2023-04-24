import { ReactNode } from "react"
import { Box, Stack, Typography } from "@mui/material"

type Props = {
    children?: ReactNode
}
export default function Wrapper({ children }: Props) {
    return (
        <Stack margin="48px 24px" minHeight="calc(100vh - 2*48px)" spacing="32px" boxSizing="border-box">
            <Typography variant="h3" textAlign="center" color="#EC701B">Please select your Role</Typography>
            <Box sx={{
                display: "grid",
                gridTemplateColumns: "min-content 1fr min-content",
                gridTemplateRows: "1fr min-content",
                gap: "24px",
                width: "100%",
                maxWidth: "800px",
                alignSelf: "center",
            }}>
                {children}
            </Box>
        </Stack>
    )
}
