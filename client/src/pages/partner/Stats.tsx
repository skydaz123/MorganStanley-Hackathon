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

    const getData = async(token: string) => {
        console.log("BeepBooop");
        const result = await getReports(token).unwrap();

        let foodRecievedData = result.map((x: {
            timestamp: any; lb_recieved: any; lb_given: any; 
            }, index: any) => {
            return {
                value: x.lb_recieved,
                argument: x.timestamp
            }
        });
        foodRecievedData.sort((a: { argument: any; }, b: { argument: any; }) => a.argument - b.argument);
        console.log(foodRecievedData)

        let foodGivenData = result.map((x: {
            timestamp: any; lb_recieved: any; lb_given: any; 
            }, index: any) => {
            return {
                value: x.lb_given,
                argument: x.timestamp
            }
        });
        foodGivenData.sort((a: { argument: any; }, b: { argument: any; }) => a.argument - b.argument);
        console.log(foodGivenData);

        setRecievedData(foodRecievedData);
        setGivenData(foodGivenData);
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
                <Grid item xs={6}>
                    <Box sx={{ border: '2px solid #EC701B', borderRadius: 2 }}>
                        <Chart
                            data={recievedData}
                            height={400}
                        >
                            <ArgumentAxis/>
                            <ValueAxis/>
                            <SplineSeries valueField="value" argumentField="argument" color="#FF9600"/>
                            <Title text="Food Received (in lbs)" />
                            <Animation />
                        </Chart>
                    </Box>
                </Grid>
                <Grid item xs={5.5}>
                    <Box sx={{ border: '2px solid #EC701B', borderRadius: 2 }}>
                        <Chart
                            data={givenData}
                            height={400}
                        >
                            <ArgumentAxis/>
                            <ValueAxis/>
                            <SplineSeries valueField="value" argumentField="argument" color="#FF9600"/>
                            <Title text="Food Donated (in lbs)" />
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