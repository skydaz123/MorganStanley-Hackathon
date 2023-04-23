import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import ListItemText from "@mui/material/ListItemText"
import ListItem from "@mui/material/ListItem"
import { useDrawer } from "../../contexts/DrawerProvider"

export default function ControllerTab() {
    const { isOpen, toggle } = useDrawer()

    return (
        <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
                onClick={toggle}
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
                    {isOpen ? <ChevronLeft/> : <ChevronRight/>}
                </ListItemIcon>
                <ListItemText
                    primary={isOpen ? "Hide" : ""}
                    sx={{
                        opacity: isOpen ? 1 : 0,
                        color: "#F46E21",
                    }}
                />
            </ListItemButton>
        </ListItem>
    )
}
