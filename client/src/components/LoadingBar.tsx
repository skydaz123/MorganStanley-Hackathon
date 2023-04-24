import { LinearProgress } from "@mui/material"
import React from "react"

export default function LoadingBar() {
    return (
        <LinearProgress sx={{
            "& .MuiLinearProgress-bar": {
                backgroundColor: "#EC701B"
            }
        }}/>
    )
}
