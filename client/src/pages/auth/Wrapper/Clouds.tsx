import content from "../../../images/wavy-clouds.png"
import { Box } from "@mui/material"

type Props = {
    reverse?: boolean
}
export default function Clouds({ reverse }: Props) {
    return (
        <Box sx={{
            position: "absolute",
            top: 0,
            ...(
                reverse ? {
                    right: 0,
                } : {
                    left: 0,
                }
            ),
            transform: reverse ? "translate(30%, -25%)" : "translate(-30%, -25%)",
            zIndex: -1,
        }}>
            <img src={content} height="200px"/>
        </Box>
    )
}
