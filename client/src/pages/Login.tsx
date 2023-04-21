import { Box, Button, Stack, TextField, Typography } from "@mui/material"

export default function Login() {
    return (
        <Box sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "row",
            flexWrap: "no-wrap",
            alignItems: "stretch",
        }}>
            <Box flex={1} sx={{
                background: `repeating-linear-gradient(
                                to right, transparent, 
                                transparent 50px, 
                                white 50px, 
                                white 55px
                            ),
                            repeating-linear-gradient(
                                to bottom, transparent,  
                                transparent 50px, 
                                white 50px, 
                                white 55px
                            ),
                            linear-gradient(45deg, black, black);`
            }}>
                Checkered
            </Box>
            <Box flex={1} sx={{ backgroundColor: "#eee" }}>
                <Stack spacing="32px" sx={{ p: "32px" }}>
                    <Typography>Login</Typography>
                    <TextField label="Email" type="email"/>
                    <TextField label="Password" type="password"/>
                    <Box>
                        <Button variant="outlined">Login</Button>
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}
