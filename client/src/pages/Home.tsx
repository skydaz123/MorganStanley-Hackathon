import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent"
import Box from '@mui/material/Box';
import ReportComponent from "../components/ReportComponent";
import SignUp from "../components/SignUp";

export default function Home() {
    return (
        <Box sx={{ display: 'flex' }}>

            {/*<LoginComponent/>*/}
            {/*<RegisterComponent/>*/}
            {/*<ReportComponent/>*/}
            <SignUp />
        </Box>
    )
}
