import * as React from 'react'
import { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box, Typography } from "@mui/material"
import useHideSlidingWindowOnLoad from "../../hooks/useHideSlidingWindowOnLoad"
import { useSelector } from "react-redux"
import { useLazyGetReportsQuery } from "../../redux/apis/localApi/firebaseApi"
import { getAuthSlice } from "../../redux/store"

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
];

const rows = [
    { id: 1, name: 'Snow', foodReceived: 200, foodDonated: 100, waste: 300, date: '02/1/23' },
    { id: 2, name: 'Barrow', wastePerPound: 2, roundTrip: '10 miles' },
];

export default function History() {
    useHideSlidingWindowOnLoad()

    const [rows, setRows] = useState([]);
    const [getReports] = useLazyGetReportsQuery();
    const state = useSelector(getAuthSlice);

    const getRows = async(token: string) => {
        const result = await getReports(token).unwrap();
        let new_rows = result.map((x: {
            timestamp: any; lb_recieved: any; lb_given: any; 
            }, index: any) => {
            return {
                id: index,
                foodReceived: x.lb_recieved,
                foodDonated: x.lb_given,
                waste: (x.lb_recieved - x.lb_given),
                date: x.timestamp
            }
        });
        new_rows.sort((a: { timestamp: any; }, b: { timestamp: any; }) => a.timestamp - b.timestamp);
        setRows(new_rows);
    }

    useEffect(() => {
        // @ts-ignore
        let token: string = state.user.token;
        getRows(token);
    }, [])

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