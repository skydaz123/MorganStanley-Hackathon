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
        <ListItem alignItems="flex-start" sx={{
            transition: "margin-bottom 225ms",
            marginBottom: isOpen ? "32px" : "16px",
        }}>
            <ListItemAvatar>
                <Avatar alt="some_company" src={logo} sx={{
                    transition: "all 225ms",
                    ...(
                        !isOpen ? {
                            width: "24px",
                            height: "24px",
                        } : {}
                    )
                }}/>
            </ListItemAvatar>
            <ListItemText primary={name} sx={{
                opacity: isOpen ? 1 : 0,
                alignSelf: "flex-end",
                color: "#F46E21",
            }}/>
        </ListItem>
    )
}
