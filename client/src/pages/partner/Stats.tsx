import * as React from 'react'
import { useEffect, useMemo } from 'react'
import { Box, Typography } from "@mui/material"
import useHideSlidingWindowOnLoad from "../../hooks/useHideSlidingWindowOnLoad"
import { ArgumentAxis, Chart, SplineSeries, Title, ValueAxis, } from '@devexpress/dx-react-chart-material-ui'
import { Animation } from "@devexpress/dx-react-chart"
import Grid from "@mui/material/Grid"
import { useGetReportsQuery } from "../../redux/apis/localApi/firebaseApi"
import BigLoader from "../../loaders/BigLoader"

export default function Stats() {
    useHideSlidingWindowOnLoad()

    const { data, isFetching, isError, error } = useGetReportsQuery(undefined)

    useEffect(() => {
        if (!isError)
            return
        console.error(error)
    }, [isError, error])

    const { receivedData, givenData } = useMemo(() => {
        if (isFetching || isError || !data)
            return { receivedData: [], givenData: [] }

        const foodRecievedData = data.map(({ lb_recieved, timestamp }) => ({
            value: lb_recieved,
            argument: timestamp,
        }))
        foodRecievedData.sort((a, b) => a.argument - b.argument)
        console.log(foodRecievedData)

        const foodGivenData = data.map(({ lb_given, timestamp }) => ({
            value: lb_given,
            argument: timestamp,
        }))
        foodGivenData.sort((a, b) => a.argument - b.argument)
        console.log(foodGivenData)

        return {
            receivedData: foodRecievedData,
            givenData: foodGivenData
        }
    }, [data, isFetching, isError])

    if (isFetching)
        return <BigLoader/>

    if (!data)
        return <>No data found.</>

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
                            data={receivedData}
                            height={400}
                        >
                            <ArgumentAxis/>
                            <ValueAxis/>
                            <SplineSeries valueField="value" argumentField="argument" color="#FF9600"/>
                            <Title text="Food Received (in lbs)"/>
                            <Animation/>
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
                            <Title text="Food Donated (in lbs)"/>
                            <Animation/>
                        </Chart>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                </Grid>
            </Grid>
        </Box>
    )
}