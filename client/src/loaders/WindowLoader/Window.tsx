import { Box } from "@mui/material"
import { DURATION } from "./config"

type Props = {
    color: string
    delay?: number
    isRetreating?: boolean
}
export default function Window({ color, delay, isRetreating }: Props) {
    return (
        <Box sx={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            zIndex: 99999,
            backgroundColor: color,
            top: 0,
            left: isRetreating ? 0 : "-100vw",
            "@keyframes slide-in-right": {
                from: { left: "-100vw" },
                to: { left: 0 },
            },
            "@keyframes slide-out-right": {
                from: { left: 0 },
                to: { left: "100vw" },
            },
            animation: `${isRetreating ? "slide-out-right" : "slide-in-right"} ${DURATION}ms forwards`,
            animationDelay: delay ? `${delay}ms` : undefined,
        }}/>
    )
}