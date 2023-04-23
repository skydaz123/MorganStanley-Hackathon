import * as React from 'react';
import {Box, Button, Typography} from "@mui/material";
import useHideSlidingWindowOnLoad from "../../hooks/useHideSlidingWindowOnLoad"
import logo from "../../images/acfb-logo.png";
import backdrop from "../../images/random_hackathon_image.jpg";
import Grid from '@mui/material/Grid';

export default function Profile() {
    useHideSlidingWindowOnLoad()

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
                    top: '58%'
                }}>
                    <Grid item xs={6}>
                        <Typography sx={ textStyle }>Org. Address: </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={ textStyle }>Org. Join Date:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={ textStyle }>Business Hour:</Typography>
                    </Grid>
                </Grid>
                <Button variant="outlined" onClick={handleClick} sx={{
                    border: '3px solid #EC701B !important',
                    '&:hover': {
                        border: '3px solid #EC701B !important',
                        backgroundColor: '#F46E21cc',
                        color: 'white !important'
                    },
                    width: '300px',
                    height: '50px',
                    color: '#EC701B',
                    fontSize: 20,
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '600',
                    position: 'absolute',
                    left: '25%',
                    top: '83%'
                }}>
                    Request
                </Button>
            </Box>
        </Box>
    )
}
