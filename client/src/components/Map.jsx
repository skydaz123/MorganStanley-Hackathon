import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Menu, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';

import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvent,
} from 'react-leaflet';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';
import SearchBar from './SearchBar';


const myIcon = new Icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function handleClick() {
  console.log("pressed")
}

export default function Map() {
  function MapC() {
    const map = useMap();
    map.removeControl(map.zoomControl);
    //comment below to remove Attribution text
    map.attributionControl.setPrefix('');
    const routingControl = useRef(null);

    useMapEvent('click', (e) => {
      console.log(e.latlng);
      const marker = L.marker(e.latlng,{ icon: myIcon }).addTo(map);
      marker.bindPopup("Hello World!").openPopup();
    });

    return null;
  }

  return (
    <div> 
      <div style={{ display: 'flex', justifyContent: 'start'}}>
        <Typography style={{ position: 'absolute', zIndex: '1000' }}> 
          <Link to='/' 
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
           Name 
          </Link>
        </Typography>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center'}}> 
        <div style={{ position: 'absolute', zIndex: '1000' }}>
          <SearchBar />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'end'}}> 
        <IconButton style={{ position: 'absolute', zIndex: '1000'}}
        onClick={handleClick}> 
          <MenuIcon sx = {{color: 'orange', fontSize: 50}}/>
        </IconButton>
      </div>
      <MapContainer
        style={{ height: '100vh', width: '100wh', position: 'relative'}}
        center={[0, 0]}
        zoom={3}

      >
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        <MapC/>
      </MapContainer>
      <div style={{ position: 'absolute', bottom: '20px', right: '20px', zIndex: '1000' }}>
        <Stack spacing={2}>
        <IconButton onClick={() => console.log('GPS clicked')} sx={{backgroundColor: 'white', borderRadius: 3}}>
          <GpsFixedIcon />
        </IconButton>
        <IconButton onClick={() => console.log('Add clicked')} sx={{backgroundColor: 'white', borderRadius: 3}}>
          <AddIcon />
        </IconButton>
        <IconButton onClick={() => console.log('Remove clicked')} sx={{backgroundColor: 'white', borderRadius: 3}}>
          <RemoveIcon />
        </IconButton>
        </Stack>
      </div>
    </div>
  );
}

