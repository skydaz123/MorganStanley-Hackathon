import { Box, ButtonProps, Paper, Typography } from "@mui/material"
import CustomButton from "../../../../components/CustomButton"
import TextTransition from "react-text-transition"

type Props = {
    name: string
    picture: HTMLImageElement["src"]
    onSelect: ButtonProps["onClick"]
}
export default function Card({ name, picture, onSelect }: Props) {
    return (
        <Paper variant="outlined" sx={{
            p: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "16px",
            borderColor: "#EC701B",
        }}>
            <Typography variant="h4" textAlign="center" color="#EC701B">
                <TextTransition inline>{name}</TextTransition>
            </Typography>
            <Box display="flex" justifyContent="center" padding="16px">
                <img src={picture} width="250"/>
            </Box>
            <CustomButton
                variant="outlined"
                onClick={onSelect}
                sx={{
                    alignSelf: "stretch",
                    maxWidth: "300px",
                    marginLeft: "50%",
                    transform: "translateX(-50%)",
                }}
            >Select</CustomButton>
        </Paper>
    )
}
