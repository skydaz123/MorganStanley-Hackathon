import { Button, styled } from "@mui/material"

const CustomButton = styled(Button)({
    textTransform: "initial",
    fontSize: "1.5em",
    border: "2px solid #EC701B",
    color: "#EC701B",
    fontFamily: "Montserrat, sans-serif",
    '&:hover': {
        backgroundColor: '#EC701Bcc',
        border: "2px solid #EC701B",
        color: "white",
    },
    '&:active': {
        backgroundColor: '#EC701B',
        border: "2px solid #EC701B",
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
})

export default CustomButton
