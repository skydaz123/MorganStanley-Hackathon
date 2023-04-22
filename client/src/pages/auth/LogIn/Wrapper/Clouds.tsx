import content from "../../../../images/wavy-clouds.png"
import { Box } from "@mui/material"

export default function Clouds() {
    return (
        <Box sx={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: "translate(-30%, -25%)",
            zIndex: -1,
        }}>
            <img src={content} height="200px"/>
        </Box>
    )
}
