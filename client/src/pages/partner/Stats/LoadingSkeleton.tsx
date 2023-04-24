import Grid from "@mui/material/Grid"
import { Skeleton } from "@mui/material"

export default function LoadingSkeleton() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Skeleton variant="rectangular" height="300px"/>
            </Grid>
            <Grid item xs={6}>
                <Skeleton variant="rectangular" height="300px"/>
            </Grid>
        </Grid>
    )
}
