import { Avatar, Box, Typography } from "@mui/material"

type Props = {
    logo: HTMLImageElement["src"]
    title: string
}
export default function Header({ title, logo }: Props) {
    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
        }}>
            <Avatar
                src={logo}
                alt="Placeholder"
                sx={{
                    width: "100px",
                    height: "100px",
                    p: "16px",
                    boxSizing: "border-box",
                    backgroundColor: "white",
                    border: "2px solid #EC701B",
                }}
            />
            <Typography variant="h3" sx={{
                color: '#EC701B',
                fontFamily: 'Montserrat, sans-serif',
            }}>
                {title}
            </Typography>
        </Box>
    )
}