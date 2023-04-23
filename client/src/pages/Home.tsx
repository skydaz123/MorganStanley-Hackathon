import { Button, Typography } from "@mui/material"
import React from "react"
import logo from "../images/acfb-logo.png"

export default function Home() {
    const handleClick = () => {
        console.log('Button clicked')
    }

    return (
        <>
            <div className="quarter-circle"></div>
            <div className="square-left1"></div>
            <div className="square-left2"></div>
            <div className="square-right1"></div>
            <div className="square-right2"></div>
            <div style={{ position: 'absolute', left: '38%', top: '16%' }}>
                <img src={logo} alt="Placeholder" style={{ width: '32%', height: 'auto' }}/>
            </div>
            <Typography sx={{
                fontFamily: 'Montserrat, sans-serif',
                color: '#EC701B',
                fontSize: '32px',
                position: 'absolute',
                left: '41%',
                top: '60%',

            }}>
                PlaceHolder
            </Typography>
            <Typography sx={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '32px',
                position: 'absolute',
                left: '20%',
                top: '70%',
                display: 'flex',
                flexDirection: 'row'
            }}>
                "Engage. Educate. Empower. End Hunger.
                <Typography sx={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '32px',
                    color: '#EC701B',
                    marginLeft: '8px',
                    fontStyle: 'oblique',
                    fontWeight: 600
                }}>
                    Together <span
                    style={{ color: 'black', marginLeft: '-3px', fontWeight: 'normal', fontStyle: 'normal' }}>"</span>
                </Typography>
            </Typography>
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
                left: '38%',
                top: '80%'
            }}>
                Sign up
            </Button>
        </>
    )
}