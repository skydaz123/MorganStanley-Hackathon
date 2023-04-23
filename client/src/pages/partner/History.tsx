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
        editable: false,
    },
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
];

const rows = [
    { id: 1, name: 'Snow', foodReceived: 200, foodDonated: 100, waste: 300, date: '02/1/23' },
    { id: 2, name: 'Barrow', wastePerPound: 2, roundTrip: '10 miles' },
];

export default function History() {
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