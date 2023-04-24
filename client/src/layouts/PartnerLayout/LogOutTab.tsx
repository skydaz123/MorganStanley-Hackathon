import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import { ExitToApp } from "@mui/icons-material"
import ListItemText from "@mui/material/ListItemText"
import ListItem from "@mui/material/ListItem"
import { useState } from "react"
import { useDrawer } from "../../contexts/DrawerProvider"
import { auth } from "../../firebase"
import { signOut } from "firebase/auth"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/slices/authSlice"
import localApi from "../../redux/apis/localApi"

export default function LogOutTab() {
    const dispatch = useDispatch()

    const { isOpen } = useDrawer()
    const [loading, setLoading] = useState(false)

    const logOut = async () => {
        if (loading)
            return

        const ok = window.confirm("Are you sure you want to log out?")
        if (!ok)
            return

        setLoading(true)

        try {
            await signOut(auth)
            dispatch(localApi.util.resetApiState())
            dispatch(logout())
            setLoading(false)
        } catch (err) {
            console.error(err)
            setLoading(false)
        }
    }

    return (
        <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
                onClick={logOut}
                disabled={loading}
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
