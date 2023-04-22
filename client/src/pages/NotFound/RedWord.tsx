import { ReactNode } from "react"
import { Typography } from "@mui/material"

type Props = {
    children?: ReactNode
}
export default function RedWord({ children }: Props) {
    return (
        <Typography variant="h1" sx={{
            fontSize: "200px",
            fontWeight: "bold",
            color: "white",
            strokeLinecap: "butt",
            strokeDasharray: 0,
            WebkitTextStroke: "#EC701B 5px",
        }}>
            {children}
        </Typography>
    )
}
