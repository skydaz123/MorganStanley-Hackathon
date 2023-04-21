import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent"
import Box from '@mui/material/Box';

export default function Home() {
    return (
        <Box sx={{ display: 'flex' }}>
            <LoginComponent/>
            <RegisterComponent/>
        </Box>
    )
}
