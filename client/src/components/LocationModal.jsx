// LocationModal.js

import React from 'react';
import { Modal, List, ListItem, ListItemText } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAuthSlice } from "../redux/store"
import { useGetOtherReportsQuery } from '../redux/apis/localApi/firebaseApi';
import Stats from '../pages/partner/Stats';
import { Box, CircularProgress, Typography } from "@mui/material"
import { ArgumentAxis, BarSeries, Chart, SplineSeries, Title, ValueAxis, } from '@devexpress/dx-react-chart-material-ui'
import { Animation } from "@devexpress/dx-react-chart"
import Grid from "@mui/material/Grid"

function LocationModal({ isModalOpen, handleCloseModal, selectedLocation, generateGraphData }) {
  
  const { data, isFetching, isError, error} = useGetOtherReportsQuery(selectedLocation?.email, {
    skip: !selectedLocation?.email
  });

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
  $.sort((a, b) => a.argument - b.argument)

  return $.slice(0, 5)
}, [data, isError, isFetching])

  if(isFetching){
    return <div>Loading...</div>
  }
  if (!data){
    return <>No data.</>
  }
  
  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      {selectedLocation ? (
        <div style={{ padding: '5px', backgroundColor: 'white', color: 'orange' }}>
          <List>
            <h2>{selectedLocation.name}</h2>
          </List>
          <List>
            <h2>{selectedLocation.address}</h2>
          </List>
          <Box>
            <Typography sx={{
                paddingLeft: '80px',
                paddingTop: '10px',
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
                            data={chartData}
                            height={400}
                        >
                            <ArgumentAxis/>
                            <ValueAxis/>
                            <SplineSeries valueField="val_1" argumentField="argument" color="#FF9600"/>
                            <Title text="Food Received (thousands lbs)"/>
                            <Animation/>
                        </Chart>
                    </Box>
                </Grid>
                <Grid item xs={3.7}>
                    <Box sx={{ border: '2px solid #EC701B', borderRadius: 2 }}>
                        <Chart
                            data={chartData}
                            height={400}
                        >
                            <ArgumentAxis/>
                            <ValueAxis/>
                            <SplineSeries valueField="val_2" argumentField="argument" color="#FF9600"/>
                            <Title text="Food Donated (thousands lbs)"/>
                            <Animation/>
                        </Chart>
                    </Box>
                </Grid>
                <Grid item xs={3.7}>
                    <Box sx={{ border: '2px solid #EC701B', borderRadius: 2 }}>
                        <Chart
                            data={chartData}
                            height={400}
                        >
                            <ArgumentAxis/>
                            <ValueAxis/>
                            <BarSeries valueField="val_3" argumentField="argument" color="#FF9600"/>
                            <Title text="Food Not Given Out (thousands lbs)"/>
                            <Animation/>
                        </Chart>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                </Grid>
            </Grid>
        </Box>
          <button onClick={handleCloseModal} style={{ backgroundColor: 'orange', color: 'white' }}>Close</button>
        </div>
      ) : (
        <div></div> // Fallback empty element
      )}
    </Modal>
  );
}

export default LocationModal;
