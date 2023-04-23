import * as React from 'react';
import {Box, Typography} from "@mui/material";
import useHideSlidingWindowOnLoad from "../../hooks/useHideSlidingWindowOnLoad"
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    BarSeries,
    SplineSeries,
    Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from "@devexpress/dx-react-chart";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux"
import { useLazyGetReportsQuery } from "../../redux/apis/localApi/firebaseApi"
import { getAuthSlice } from "../../redux/store"
import { useState, useEffect } from 'react'

export default function Stats() {
    const state = useSelector(getAuthSlice)
    const [loading, setLoading] = useState(false)
    const [getReports] = useLazyGetReportsQuery();
    const [recievedData, setRecievedData] = useState([]);
    const [givenData, setGivenData] = useState([]);
    const [wasteData, setWasteData] = useState([]);
    const [data, setData] = useState([]);

    const getData = async(token: string) => {
        const result = await getReports(token).unwrap();

        let chartData = result.map((x: {
            timestamp: any; lb_recieved: any; lb_given: any; 
            }, index: any) => {
            return {
                val_1: x.lb_recieved,
                val_2: x.lb_given,
                val_3: x.lb_recieved - x.lb_given,
                argument: x.timestamp
            }
        });
        chartData.sort((a: { argument: any; }, b: { argument: any; }) => a.argument - b.argument);
        chartData = chartData.slice(0,5);
        setData(chartData);
    }

    useEffect(() => {
        // @ts-ignore
        let token: string = state.user.token;
        getData(token);
    }, [])

    useHideSlidingWindowOnLoad()


    return (
        <Box>
            <Typography sx={{
                paddingLeft: '80px',
                paddingTop: '30px',
                color: '#EC701B',
                fontSize: 40,
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 'normal'
            }}>
                Statistics
            </Typography>
            <Grid container spacing={2} sx={{ paddingLeft: '80px', paddingTop: '30px' }}>
                <Grid item xs={3.7}>
                    <Box sx={{ border: '2px solid #EC701B', borderRadius: 2 }}>
                        <Chart
                            data={data}
                            height={400}
                        >
                            <ArgumentAxis/>
                            <ValueAxis/>
                            <SplineSeries valueField="val_1" argumentField="argument" color="#FF9600"/>
                            <Title text="Food Received (thousands lbs)" />
                            <Animation />
                        </Chart>
                    </Box>
                </Grid>
                <Grid item xs={3.7}>
                    <Box sx={{ border: '2px solid #EC701B', borderRadius: 2 }}>
                        <Chart
                            data={data}
                            height={400}
                        >
                            <ArgumentAxis/>
                            <ValueAxis/>
                            <SplineSeries valueField="val_2" argumentField="argument" color="#FF9600"/>
                            <Title text="Food Donated (thousands lbs)" />
                            <Animation />
                        </Chart>
                    </Box>
                </Grid>
                <Grid item xs={3.7}>
                    <Box sx={{ border: '2px solid #EC701B', borderRadius: 2 }}>
                        <Chart
                            data={data}
                            height={400}
                        >
                            <ArgumentAxis/>
                            <ValueAxis/>
                            <BarSeries valueField="val_3" argumentField="argument" color="#FF9600"/>
                            <Title text="Food Not Given Out (thousands lbs)" />
                            <Animation />
                        </Chart>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                </Grid>
            </Grid>
        </Box>
    );
}