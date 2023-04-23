import List from "@mui/material/List"
import LogoTab from "./LogoTab"
import Tab from "./Tab"
import { BarChart, Person, Send, Timeline } from "@mui/icons-material"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import * as React from "react"
import { CSSObject, styled, Theme } from "@mui/material/styles"
import MuiDrawer from "@mui/material/Drawer"
import { useDrawer } from "../../contexts/DrawerProvider"
import ControllerTab from "./ControllerTab"
import logo from "../../images/acfb-logo.png"
import LogOutTab from "./LogOutTab"

const DRAWER_WIDTH = 240

const openedMixin = (theme: Theme): CSSObject => ({
    width: DRAWER_WIDTH,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
})

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
})

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: DRAWER_WIDTH,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
)

export default function CustomDrawer() {
    const { isOpen } = useDrawer()

    return (
        <Drawer variant="permanent" open={isOpen}>
            <List>
                <LogoTab logo={logo} name="Placeholder"/>
                <Tab text="Report" icon={<Send/>} link="report"/>
                <Tab text="Statistics" icon={<BarChart/>} link="stats"/>
                <Tab text="History" icon={<Timeline/>} link="history"/>
                <Tab text="Profile" icon={<Person/>} link="profile"/>
            </List>
            <Box flex={1}/>
            <Divider/>
            <LogOutTab/>
            <Divider/>
            <ControllerTab/>
        </Drawer>
    )
}
