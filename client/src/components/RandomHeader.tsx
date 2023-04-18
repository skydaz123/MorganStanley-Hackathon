import { Typography } from "@mui/material"

type Props = {
    name: string
}
export default function RandomHeader({ name }: Props) {
    return (
        <Typography fontStyle="italic">{name}</Typography>
    )
}
