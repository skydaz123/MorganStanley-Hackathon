import { Button } from "@mui/material"
import BaseHeader from "./BaseHeader"

export default function AuthenticatedHeader() {
    return (
        <BaseHeader>
            <Button color="inherit">Account</Button>
            <Button color="inherit">Log Out</Button>
        </BaseHeader>
    )
}
