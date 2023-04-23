import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import ListItem from "@mui/material/ListItem"
import * as React from "react"
import { ReactNode, useMemo } from "react"
import { useDrawer } from "../../contexts/DrawerProvider"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getSlidingWindowSlice } from "../../redux/store"
import { DELAYS, DURATION } from "../../loaders/WindowLoader/config"
import { changeState } from "../../redux/slices/slidingWindowSlice"

type Props = {
    icon: ReactNode
    text: string
    link: string
}
export default function Tab({ icon, text, link }: Props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { state } = useSelector(getSlidingWindowSlice)
    const { isOpen } = useDrawer()

    const to = useMemo(() => `/partner/${link}`, [link])

    const goToAnchor = () => {
        if (window.location.pathname === to)
            return
        if (state != "inactive") {
            console.log("Busy")
            return
        }
        dispatch(changeState("covering"))
        setTimeout(() => {
            navigate(to)
        }, DURATION)
    }

    return (
        <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
                selected={window.location.pathname === to}
                onClick={goToAnchor}
                sx={{
                    minHeight: 48,
                    justifyContent: isOpen ? "initial" : "center",
                    px: 2.5,
                    "&.Mui-selected": {
                        backgroundColor: "#F46E2133"
                    },
                    paddingY: "16px",
                }}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: isOpen ? 3 : "auto",
                        justifyContent: "center",
                        color: "#F46E21",
                    }}
                >
                    {icon}
                </ListItemIcon>
                <ListItemText primary={text} sx={{
                    opacity: isOpen ? 1 : 0,
                    color: "#F46E21",
                }}/>
            </ListItemButton>
        </ListItem>
    )
}
