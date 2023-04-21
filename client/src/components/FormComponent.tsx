import FormField from "./FormField";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";

export default function FormComponent() {
    const { control } = useForm({
        defaultValues: {
            userName: "",
            password: "",
        },
        mode: "all"
    })

    // MULTILINE IS FOR ADDING NOTES AND ROWS
    // USE CTRL ALT L FOR REFORMAT
    return (
        <>
            <FormField id="userName" control={control} label="Enter username..." placeholder="Username"/>
            <FormField id="password" control={control} label="Enter password..." placeholder="Password"/>
            <Button>submit</Button>
        </>
    )
}