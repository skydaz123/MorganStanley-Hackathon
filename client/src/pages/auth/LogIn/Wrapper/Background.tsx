import { Box, Typography } from "@mui/material"
import back from "../../../../images/wavy-background.png"

export default function Background() {
    return (
        <>
            <Box sx={{
                position: "absolute",
                bottom: "-4px",
                left: "32px",
                right: "32px",
                overflow: "hidden",
                zIndex: -1,
                borderBottomRightRadius: "24px",
            }}>
                <img src={back} width="100%"/>
            </Box>
        </>
    )
}
