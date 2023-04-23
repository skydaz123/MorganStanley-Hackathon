import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import { ChevronLeft, ChevronRight, ExitToApp } from "@mui/icons-material"
import ListItemText from "@mui/material/ListItemText"
import ListItem from "@mui/material/ListItem"
import * as React from "react"
import { useDrawer } from "../../contexts/DrawerProvider"
import { useNavigate } from "react-router-dom"

export default function LogOutTab() {
    const { isOpen } = useDrawer()
    const navigate = useNavigate()

    const logOut = () => {
        const ok = window.confirm("Are you sure you want to log out?")
        if (!ok)
            return
        console.log("Logging out...")
        navigate("/")
    }

    return (
        <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
                onClick={logOut}
                sx={{
                    minHeight: 48,
                    justifyContent: isOpen ? "initial" : "center",
                    px: 2.5,
                }}
            >
                <ListItemIcon sx={{
                    minWidth: 0,
                    mr: isOpen ? 3 : "auto",
                    justifyContent: "center",
                    color: "#F46E21",
                }}>
                    <ExitToApp/>
                </ListItemIcon>
                <ListItemText
                    primary="Sign Out"
                    sx={{
                        opacity: isOpen ? 1 : 0,
                        color: "#F46E21",
                    }}
                />
            </ListItemButton>
        </ListItem>
    )
}
