import * as React from 'react'
import { useEffect, useMemo } from 'react'
import { Alert, Box, Typography } from "@mui/material"
import useHideSlidingWindowOnLoad from "../../../hooks/useHideSlidingWindowOnLoad"
import { ArgumentAxis, BarSeries, Chart, SplineSeries, Title, ValueAxis, } from '@devexpress/dx-react-chart-material-ui'
import { Animation } from "@devexpress/dx-react-chart"
import Grid from "@mui/material/Grid"
import { useGetReportsQuery } from "../../../redux/apis/localApi/firebaseApi"
import LoadingSkeleton from "./LoadingSkeleton"

export default function Stats() {
    useHideSlidingWindowOnLoad()

    const { data, isFetching, isError, error } = useGetReportsQuery(undefined)

    useEffect(() => {
        if (!isError)
            return
        console.error(error)
    }, [isError, error])

    const chartData = useMemo(() => {
        if (isFetching || isError || !data)
            return []

        const $ = data.map(({ lb_recieved, lb_given, timestamp: argument }) => ({
            val_1: lb_recieved,
            val_2: lb_given,
            val_3: lb_recieved - lb_given,
            argument,
        }))
        $.sort((a: { argument: any; }, b: { argument: any; }) => a.argument - b.argument)

        return $.slice(0, 5)
    }, [data, isError, isFetching])

    return (
        <Box sx={{ p: "32px" }}>
            <Typography variant="h4" gutterBottom sx={{
                color: '#EC701B',
                fontFamily: 'Montserrat, sans-serif',
            }}>
                Statistics
            </Typography>
            {
                isFetching ? <LoadingSkeleton/> :
                    isError || !data ? <Alert severity="error">Nothing to show</Alert> :
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} xl={3.7}>
                                <Box sx={{ border: '2px solid #EC701B', borderRadius: 2 }}>
                                    <Chart
                                        data={chartData}
                                        height={400}
                                    >
                                        <ArgumentAxis/>
                                        <ValueAxis/>
                                        <SplineSeries valueField="val_1" argumentField="argument" color="#FF9600"/>
                                        <Title text="Food Received (lbs)"/>
                                        <Animation/>
                                    </Chart>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6} xl={3.7}>
                                <Box sx={{ border: '2px solid #EC701B', borderRadius: 2 }}>
                                    <Chart
                                        data={chartData}
                                        height={400}
                                    >
                                        <ArgumentAxis/>
                                        <ValueAxis/>
                                        <SplineSeries valueField="val_2" argumentField="argument" color="#FF9600"/>
                                        <Title text="Food Donated (lbs)"/>
                                        <Animation/>
                                    </Chart>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6} xl={3.7}>
                                <Box sx={{ border: '2px solid #EC701B', borderRadius: 2 }}>
                                    <Chart
                                        data={chartData}
                                        height={400}
                                    >
                                        <ArgumentAxis/>
                                        <ValueAxis/>
                                        <BarSeries valueField="val_3" argumentField="argument" color="#FF9600"/>
                                        <Title text="Food Not Given Out (lbs)"/>
                                        <Animation/>
                                    </Chart>
                                </Box>
                            </Grid>
                        </Grid>
            }
        </Box>
    )
}