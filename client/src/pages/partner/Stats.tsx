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

export default function Stats() {
    useHideSlidingWindowOnLoad()
    const data = [
        {argument: 'Monday', value: 30},
        {argument: 'Tuesday', value: 20},
        {argument: 'Wednesday', value: 10},
        {argument: 'Thursday', value: 50},
        {argument: 'Friday', value: 60},
    ];

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
                            data={data}
                            height={400}
                        >
                            <ArgumentAxis/>
                            <ValueAxis/>
                            <BarSeries valueField="value" argumentField="argument" color="#FF9600"/>
                            <Title text="Food Received (in lbs)" />
                            <Animation />
                        </Chart>
                    </Box>
                </Grid>
                <Grid item xs={5.5}>
                    <Box sx={{ border: '2px solid #EC701B', borderRadius: 2 }}>
                        <Chart
                            data={data}
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