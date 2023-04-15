import { useRouteError } from "react-router-dom"
import { useEffect } from "react"
import { Box } from "@mui/material"

export default function RootBoundary() {
    const error = useRouteError()

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <Box sx={{ p: "8px 16px", backgroundColor: "#eee" }}>
            <pre>
                {
                    error instanceof Error ?
                        error.stack :
                        JSON.stringify(error, null, 2)
                }
            </pre>
        </Box>
    )
}
