import { Autocomplete, Stack, TextField, Typography } from "@mui/material"
import { ReactNode, useMemo } from "react"
import { Control, FieldValues, Path, useController } from "react-hook-form"

type Props<T extends FieldValues> = {
    control: Control<T>
    id: Path<T>
    label?: ReactNode
    separateLabel?: boolean
    required?: boolean
    options: {
        key: string | number
        value: string
    }[]
}
export default function FormIndexedSelectField<T extends FieldValues>({
                                                                          control,
                                                                          id,
                                                                          label,
                                                                          required = false,
                                                                          separateLabel = false,
                                                                          options
                                                                      }: Props<T>) {
    const { field: { onChange, ...field }, fieldState: { error } } = useController({
        control,
        name: id,
    })

    const { $optionMap, $optionKeys } = useMemo(() => {
        const map: Record<string, string> = {}
        for (const { key, value } of options)
            map[key] = value
        return {
            $optionMap: map,
            $optionKeys: options.map(({ key }) => key)
        }
    }, [options])

    return (
        <Stack spacing="8px">
            {
                !!separateLabel &&
                <Typography variant="body1" fontWeight="normal">{label} {required && "*"}</Typography>
            }
            <Autocomplete
                options={$optionKeys}
                autoHighlight
                getOptionLabel={opt => $optionMap[opt] ?? ""}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        {...(!separateLabel ? { label } : {})}
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password',
                        }}
                        error={!!error}
                        helperText={error?.message}
                    />
                )}
                onChange={(_, value) => onChange(value)}
                {...field}
            />
        </Stack>
    )
}