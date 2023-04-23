import * as React from 'react'
import { useEffect, useMemo } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box, Typography } from "@mui/material"
import useHideSlidingWindowOnLoad from "../../hooks/useHideSlidingWindowOnLoad"
import { useGetReportsQuery } from "../../redux/apis/localApi/firebaseApi"

const columns: GridColDef[] = [
    //{ field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'foodReceived',
        headerName: 'Food Received (lbs)',
        type: 'number',
        width: 150,
        editable: false,
    },
    {
        field: 'foodDonated',
        headerName: 'Food Donated (lbs)',
        type: 'number',
        width: 150,
        editable: false,
    },
    {
        field: 'waste',
        headerName: 'Waste (lbs)',
        type: 'number',
        width: 150,
        editable: false,
    },
    {
        field: 'date',
        headerName: 'Date',
        width: 150,
        editable: false,
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

        const out = data.map(({ lb_recieved, lb_given, timestamp: date }, id) => {
            return {
                id,
                foodReceived: lb_recieved,
                foodDonated: lb_given,
                waste: lb_recieved - lb_given,
                date,
            }
        })
        out.sort((a, b) => a.date - b.date)
        return out
    }, [data, isError, isFetching])

    return (
        <Box sx={{ paddingLeft: '32px' }}>
            <Typography sx={{
                color: '#F46E21',
                fontSize: '30px',
                fontFamily: 'Montserrat',
            }}>
                Tabular View
            </Typography>
            <Box sx={{ height: 550, width: '100%', border: '2px solid #F46E21' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    loading={isFetching}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    sx={{
                        '&.MuiDataGrid-withBorderColor': {
                            borderColor: 'orange',
                        },
                    }}
                />
            </Box>
        </Box>
    )
}