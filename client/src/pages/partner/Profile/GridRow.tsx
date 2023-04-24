import { ReactNode } from "react"
import Grid from "@mui/material/Grid"
import CustomText from "./CustomText"

type Props = {
    label: ReactNode
    children: ReactNode
}
export default function GridRow({ label, children }: Props) {
    return (
        <>
            <Grid item xs={4}>
                <CustomText>{label}</CustomText>
            </Grid>
            <Grid item xs={8}>
                {children}
            </Grid>
        </>
    )
}
