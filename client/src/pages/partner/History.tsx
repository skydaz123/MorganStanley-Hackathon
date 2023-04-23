import * as React from 'react'
import { useEffect, useMemo } from 'react'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import { Box, Typography } from "@mui/material"
import useHideSlidingWindowOnLoad from "../../hooks/useHideSlidingWindowOnLoad"
import { useGetReportsQuery } from "../../redux/apis/localApi/firebaseApi"

const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        type: "number",
        width: 100,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "date",
        headerName: "Date",
        type: "date",
        width: 150,
    },
    {
        field: 'foodReceived',
        headerName: 'Food Received (lbs)',
        type: 'number',
        width: 150,
    },
    {
        field: 'foodDonated',
        headerName: 'Food Donated (lbs)',
        type: 'number',
        width: 150,
    },
    {
        field: 'waste',
        headerName: 'Waste (lbs)',
        type: 'number',
        width: 150,
    }
]

export default function History() {
    useHideSlidingWindowOnLoad()

    const { data, isFetching, isError, error } = useGetReportsQuery(undefined)

    useEffect(() => {
        if (!isError)
            return
        console.error(error)
    }, [isError, error])

    const rows = useMemo(() => {
        if (isFetching || isError || !data)
            return []

        const out = data.map(({ lb_recieved, lb_given, timestamp }, index) => {
            const date = new Date(timestamp)
            return {
                id: index + 1,
                foodReceived: lb_recieved,
                foodDonated: lb_given,
                waste: lb_recieved - lb_given,
                date,
                dateMS: date.getTime()
            }
        })
        out.sort((a, b) => a.dateMS - b.dateMS)
        return out
    }, [data, isError, isFetching])

    return (
        <Box sx={{ p: "32px" }}>
            <Typography variant="h4" gutterBottom sx={{
                color: '#EC701B',
                fontFamily: 'Montserrat, sans-serif',
            }}>
                Report History
            </Typography>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10, 20, 100]}
                disableRowSelectionOnClick
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                density="comfortable"
                loading={isFetching}
                sx={{
                    border: '2px solid #F46E21'
                }}
            />
        </Box>
    )
}