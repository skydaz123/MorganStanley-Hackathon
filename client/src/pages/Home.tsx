import { Box, Button, Stack, TextField, TextFieldProps, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { getDemoSlice } from "../redux/store"
import { useState } from "react"
import { changeName } from "../redux/slices/demoSlice"
import pika from "../images/surprised-pikachu.png"
import RandomHeader from "../components/RandomHeader"
import Map from "../components/Map"


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
            <Map/>
        </Stack>
    )
}
