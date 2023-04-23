import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material"
import { Menu } from "@mui/icons-material"
import { ReactNode } from "react"

type Props = {
    children?: ReactNode
}
export default function BaseHeader({ children }: Props) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        PlaceHolder
                    </Typography>
                    {children}
                </Toolbar>
            </AppBar>
        </Box>
    )
}
