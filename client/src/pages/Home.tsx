import { Box, Button, Stack, Typography } from "@mui/material"

export default function Home() {
    return (
        <Stack sx={{ p: "32px", mt: "32px" }} spacing="24px">
            <Typography variant="h3" textAlign="center">
                Insert Logo, Perhaps an Orange dipping into the water to make it look like a
                sunset?
            </Typography>
            <Typography variant="h5" textAlign="center">
                "Engage. Educate. Empower. End Hunger. Together."
            </Typography>
            <Box display="flex" justifyContent="center">
                <Button variant="contained" sx={{ mt: "36px" }}>Sign Up</Button>
            </Box>
        </Stack>
    )
}
