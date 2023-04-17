import { Box, Button, Stack, TextField, TextFieldProps, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { getDemoSlice } from "../redux/store"
import { useState } from "react"
import { changeName } from "../redux/slices/demoSlice"
import pika from "../images/surprised-pikachu.png"
import RandomHeader from "../components/RandomHeader"

export default function Home() {
    const dispatch = useDispatch()
    const { name } = useSelector(getDemoSlice)

    const [inputName, setInputName] = useState(name)

    const handleChange: TextFieldProps["onChange"] = (event) => {
        setInputName(event.target.value)
    }

    const sendName = () => {
        dispatch(changeName(inputName.trim()))
    }

    return (
        <Stack spacing="16px" margin="16px">
            <Typography variant="h6">Hello, this is the home page.</Typography>
            <Typography>It was lazily loaded.</Typography>
            <Typography>This is some data on the redux store: "name={name}"</Typography>
            <Typography>You can control that data down here:</Typography>
            <Stack spacing="8px" direction="row">
                <TextField
                    label="Name"
                    value={inputName}
                    onChange={handleChange}
                />
                <Button onClick={sendName}>Submit</Button>
            </Stack>
            <Stack spacing="8px" direction="row">
                <Typography>Here is an imported image:</Typography>
                <Box>
                    <img
                        src={pika}
                        alt="Surprised Pikachu"
                        width="200px"
                    />
                </Box>
            </Stack>
            <RandomHeader name="some component"/>
        </Stack>
    )
}
