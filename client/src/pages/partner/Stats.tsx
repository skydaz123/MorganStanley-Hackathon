import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Typography } from "@mui/material";
import useHideSlidingWindowOnLoad from "../../hooks/useHideSlidingWindowOnLoad"

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        editable: true,
    },
    {
        field: 'wastePerPound',
        headerName: 'Waste Per Pound',
        type: 'number',
        width: 150,
        editable: true,
    },
    {
        field: 'roundTrip',
        headerName: 'RoundTrip',
        width: 110,
        editable: true,
    }

    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params: GridValueGetterParams) =>
    //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
];

const rows = [
    { id: 1, name: 'Snow', wastePerPound: 15, roundTrip: '15 miles' },
    { id: 2, name: 'Barrow', wastePerPound: 2, roundTrip: '10 miles' },
];

export default function Stats() {
    useHideSlidingWindowOnLoad()

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
    );
}