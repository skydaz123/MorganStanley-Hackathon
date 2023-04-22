import { Suspense } from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { Outlet } from "react-router-dom"
import { DrawerProvider } from "../../contexts/DrawerProvider"
import CustomDrawer from "./CustomDrawer"
import BigLoader from "../../loaders/BigLoader"

export default function PartnerLayout() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline/>
            <DrawerProvider>
                <CustomDrawer/>
            </DrawerProvider>
            <Suspense fallback={<BigLoader/>}>
                <Box component="main" sx={{ flexGrow: 1, p: "32px" }}>
                    <Outlet/>
                </Box>
            </Suspense>
        </Box>
    )
}
