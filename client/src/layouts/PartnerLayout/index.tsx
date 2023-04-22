import * as React from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { Outlet } from "react-router-dom"
import { DrawerProvider } from "../../contexts/DrawerProvider"
import CustomDrawer from "./CustomDrawer"


export default function PartnerLayout() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline/>
            <DrawerProvider>
                <CustomDrawer/>
            </DrawerProvider>
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Outlet/>
            </Box>
        </Box>
    )
}
