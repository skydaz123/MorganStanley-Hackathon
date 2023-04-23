import * as React from 'react'
import { useEffect } from 'react'
import { Box, styled, Typography } from "@mui/material"
import useHideSlidingWindowOnLoad from "../../hooks/useHideSlidingWindowOnLoad"
import logo from "../../images/acfb-logo.png"
import backdrop from "../../images/random_hackathon_image.jpg"
import Grid from '@mui/material/Grid'
import { useGetUserQuery } from "../../redux/apis/localApi/firebaseApi"
import BigLoader from "../../loaders/BigLoader"

const CustomText = styled(Typography)(() => ({
    color: "#EC701B",
    fontSize: 20,
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "bold"
}))

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
        <Box>
            <Typography sx={{
                fontSize: '30px',
                fontFamily: 'Montserrat, sans-serif',
                color: '#EC701B',
                position: 'absolute',
                left: '42%',
                top: '8%'
            }}>
                Organization name
            </Typography>
            <Box sx={{
                border: '3px solid #EC701B',
                width: '650px',
                height: '500px',
                position: 'absolute',
                left: '30%',
                top: '18%'
            }}>
                <img src={backdrop} style={{ width: '100%', height: '30%', zIndex: 1 }}/>
                <div className="circle">
                    <div style={{ position: 'absolute', left: '45%', top: '48%', transform: 'translate(-50%, -50%)' }}>
                        <img src={logo} alt="Placeholder" style={{ width: '120%', height: 'auto' }}/>
                    </div>
                </div>
                <Grid container spacing={2} sx={{
                    position: 'absolute',
                    left: '5%',
                    top: '55%',
                    gap: 1
                }}>
                    <Grid item xs={6}>
                        <CustomText >Org. Address: {user.address}</CustomText>
                    </Grid>
                    <Grid item xs={6}>
                        <CustomText >Org. Email: {user.email}</CustomText>
                    </Grid>
                    <Grid item xs={6}>
                        <CustomText >Phone Number: {user.phoneNumber}</CustomText>
                    </Grid>
                    <Grid item xs={6}>
                        <CustomText >Storage Capacity: {user.maxCapacity}</CustomText>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
