import * as React from 'react';
import {Box, Button, Typography} from "@mui/material";
import useHideSlidingWindowOnLoad from "../../hooks/useHideSlidingWindowOnLoad"
import logo from "../../images/acfb-logo.png";
import backdrop from "../../images/random_hackathon_image.jpg";
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from "react-redux"
import { getAuthSlice } from "../../redux/store"
import { useState, useEffect } from 'react'
import { useLazyGetUserQuery } from "../../redux/apis/localApi/firebaseApi";

export default function Profile() {
    useHideSlidingWindowOnLoad()

    const [userDisplay, setUser] = useState();
    const [getUser] = useLazyGetUserQuery()
    const {isLoggedIn, user} = useSelector(getAuthSlice)
    const getUserInfo = async(token: any) => {
        const result = await getUser(token).unwrap();
        setUser(result);
    }
    useEffect(() => {
         // @ts-ignore
        let token: any = user.token;
        getUserInfo(token);
    }, [])

    const textStyle = {
        color: '#EC701B',
        fontSize: 20,
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 'bold'
    }
    const handleClick = () => {
        console.log("Hello world");
    }
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
                    <div style={{ position: 'absolute', left: '45%', top: '48%', transform:'translate(-50%, -50%)' }}>
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
                        <Typography sx={ textStyle }>Org. Address: {
                        // @ts-ignore
                        userDisplay.address
                        }</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={ textStyle }>Org. Email:{
                           // @ts-ignore
                            userDisplay.email 
                        }</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={ textStyle }>Phone Number: {
                            // @ts-ignore
                            userDisplay.phoneNumber
                        } </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={ textStyle }>Storage Capacity: {
                            // @ts-ignore
                            userDisplay.maxCapacity
                        }</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
