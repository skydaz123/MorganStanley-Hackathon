import { Avatar, ListItemAvatar } from "@mui/material"
import ListItemText from "@mui/material/ListItemText"
import ListItem from "@mui/material/ListItem"
import * as React from "react"
import { useDrawer } from "../../contexts/DrawerProvider"

type Props = {
    logo: HTMLImageElement["src"]
    name: string
}
export default function LogoTab({ logo, name }: Props) {
    const { isOpen } = useDrawer()

    return (
        <ListItem alignItems="flex-start" sx={{ marginBottom: "32px" }}>
            <ListItemAvatar>
                <Avatar alt="some_company" src={logo}/>
            </ListItemAvatar>
            <ListItemText primary={name} sx={{
                opacity: isOpen ? 1 : 0,
                alignSelf: "flex-end",
                color: "#F46E21",
            }}/>
        </ListItem>
    )
}
