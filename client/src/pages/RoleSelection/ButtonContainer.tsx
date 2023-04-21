import { ReactNode } from "react"
import { Box, ButtonProps, IconButton } from "@mui/material"

type Props = {
    children?: ReactNode
    onClick: ButtonProps["onClick"]
}
export default function ButtonContainer({ children, onClick }: Props) {
    return (
        <Box display="flex" alignItems="center">
            <IconButton size="large" sx={{ color: "#EC701B" }} onClick={onClick}>
                {children}
            </IconButton>
        </Box>
    )
}
