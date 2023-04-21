import { Button } from "@mui/material"
import BaseHeader from "./BaseHeader"

export default function UnauthenticatedHeader() {
    return (
        <BaseHeader>
            <Button color="inherit">Login</Button>
        </BaseHeader>
    )
}
