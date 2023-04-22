import { Stack, TextField, TextFieldProps, Typography } from "@mui/material"
import { Control, FieldValues, Path, useController } from "react-hook-form"
import { ReactNode, useMemo } from "react"

type Props<T extends FieldValues> = {
    control: Control<T>
    id: Path<T>
    label?: ReactNode
    required?: boolean
    select?: boolean
    rows?: number
    separateLabel?: boolean
    placeholder?: string
    multiline?: boolean
    type?: TextFieldProps["type"]
    children?: ReactNode
}
export default function FormField<T extends FieldValues>({
                                                             control,
                                                             id,
                                                             label,
                                                             required = false,
                                                             select = false,
                                                             rows = 1,
                                                             separateLabel = false,
                                                             placeholder,
                                                             multiline = false,
                                                             type = "text",
                                                             children
                                                         }: Props<T>) {
    const { field: { ref, value, ...props }, fieldState: { error } } = useController({
        control,
        name: id,
    })

    const numRows = useMemo(() => {
        const $ = Number(rows)
        if (isNaN($))
            return 1
        return Math.max($, 1)
    }, [rows])

    return (
        <Stack spacing="8px">
            {
                !!separateLabel &&
                <Typography>{label} {required && "*"}</Typography>
            }
            <TextField
                select={Boolean(select)}
                required={Boolean(required)}
                multiline={Boolean(multiline)}
                rows={numRows}
                value={value ?? ""}
                type={type}
                {...props}
                {...(!separateLabel ? { label } : {})}
                placeholder={placeholder}
                inputRef={ref}
                error={Boolean(error)}
                helperText={error?.message}
                sx={{
                    input: {
                        '::placeholder': { color: 'white' },
                        color: 'white !important',
                        background: '#FF9600cc',
                        transition: "all ease-in-out 0.25s",
                        fontFamily: 'Montserrat',
                        "&:focus": {
                            background: '#F46E21'
                        },
                        borderRadius: 1,
                    }
                }}
            >{children}</TextField>
        </Stack>
    )
}