import Grid from "@mui/material/Grid"
import { Box } from "@mui/material"
import { ArgumentAxis, BarSeries, Chart, SplineSeries, Title, ValueAxis } from "@devexpress/dx-react-chart-material-ui"
import { Animation } from "@devexpress/dx-react-chart"
import * as React from "react"

type Props = {
    data: any[]
}
export default function Charts({ data }: Props) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} xl={6}>
                <Box sx={{ border: '2px solid #EC701B', borderRadius: 2 }}>
                    <Chart
                        data={data}
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
            <Grid item xs={12} xl={6}>
                <Box sx={{ border: '2px solid #EC701B', borderRadius: 2 }}>
                    <Chart
                        data={data}
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
            <Grid item xs={12} xl={6}>
                <Box sx={{ border: '2px solid #EC701B', borderRadius: 2 }}>
                    <Chart
                        data={data}
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
    )
}
