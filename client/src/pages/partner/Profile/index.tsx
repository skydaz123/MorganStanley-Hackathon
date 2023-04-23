import { useEffect } from 'react'
import useHideSlidingWindowOnLoad from "../../../hooks/useHideSlidingWindowOnLoad"
import logo from "../../../images/acfb-logo.png"
import Grid from '@mui/material/Grid'
import { useGetUserQuery } from "../../../redux/apis/localApi/firebaseApi"
import BigLoader from "../../../loaders/BigLoader"
import Header from "./Header"
import { Stack } from '@mui/material'
import GridRow from "./GridRow"

export default function Profile() {
    useHideSlidingWindowOnLoad()

    const { data: user, isFetching, error, isError } = useGetUserQuery(undefined)

    useEffect(() => {
        if (!isError)
            return
        console.error(error)
    }, [isError, error])

    if (isFetching)
        return <BigLoader/>

    if (!user)
        return <>No user found.</>

    return (
        <Stack spacing="20px" sx={{ p: "32px" }}>
            <Header logo={logo} title={user.name}/>
            <Grid container spacing={2} sx={{
                maxWidth: "600px",
                ml: "-16px !important"
            }}>
                <GridRow label="Org. Address">{user.address}</GridRow>
                <GridRow label="Org. Email">{user.email}</GridRow>
                <GridRow label="Phone Number">{user.phoneNumber}</GridRow>
                <GridRow label="Storage Capacity">{user.maxCapacity}</GridRow>
            </Grid>
        </Stack>
    )
}
