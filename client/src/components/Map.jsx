import AddIcon from '@mui/icons-material/Add';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import MenuIcon from '@mui/icons-material/Menu';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import L, { Icon } from 'leaflet';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/leaflet.css';
import '@geoman-io/leaflet-geoman-free';  
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';  
import * as turf from '@turf/turf';
import React, { useEffect, useRef } from 'react';

import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import MapDrawer from './MapDrawer';


const myIcon = new Icon({
    iconUrl: markerIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const southWest = L.latLng(-90, -180);
const northEast = L.latLng(90, 180);
const bounds = L.latLngBounds(southWest, northEast);

function handleClick() {
    console.log("pressed")
}

let maps = null;
export default function Map() {
    function MapC() {
      const map = useMap();
      maps = map;
      maps.flyTo([33.753746,-84.386330], 12)
      map.removeControl(map.zoomControl);
      map.attributionControl.setPrefix('');
      var markers = [];

      const locations = [
        {lat: 33.7671923, lng: -84.40537119999999},
        {lat: 33.79994, lng: -84.42485099999999},
        {lat: 33.7749219, lng: -84.2929674},
        {lat: 33.627911, lng: -84.4715296},
        {lat: 33.78034239999999, lng: -84.410242},
        {lat: 33.7485041, lng: -84.3365784},
      ];
    
      useEffect(() => {
        console.log("useeffect");
        locations.forEach((loc) => {
          const marker = L.marker([loc.lat, loc.lng], { icon: myIcon }).addTo(map);
          marker.bindPopup("Hello World!").openPopup();
        });
      });

      map.on('pm:create', (e) => {
        const layer = e.layer;
        markers.forEach(mark => {
          if (!(mark instanceof L.Marker)) 
            return;
          const latlng = mark.getLatLng();
          const point = turf.point([latlng.lng, latlng.lat]);
          const isInside = turf.booleanPointInPolygon(point, layer.toGeoJSON());
          if (!isInside) {
            map.removeLayer(mark);
          }
        });
        map.removeLayer(layer);
      });
      return null;
    }
    
    
    function handleZoomIn() {
      console.log("Zoom in pressed");
      maps.zoomIn();
    }

    function handleZoomOut() {
      console.log("Zoom out pressed")
      maps.zoomOut();
    }
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'start' }}>
                <Typography style={{ position: 'absolute', zIndex: '1000', fontSize: '40px', color: 'Red', marginTop: '1.25%'  }}>
                    <Link to='/'
                          style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                        Name
                    </Link>
                </Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <div style={{ position: 'absolute', zIndex: '1000', marginTop: '2.5%' }}>
                    <SearchBar/>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <div style = {{position: 'absolute', zIndex: '1000' }}> 
                <MapDrawer/>
              </div>
            </div>
            <MapContainer
                style={{ height: '100vh', width: '100wh', position: 'relative' }}
                center={[0, 0]}
                zoom={3}
                maxBounds={bounds}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                />
                <MapC/>
                
            </MapContainer>
            <div style={{ position: 'absolute', bottom: '20px', right: '20px', zIndex: '1000' }}>
                <Stack spacing={2}>
                    <IconButton onClick={() => console.log('GPS clicked')}
                                sx={{ backgroundColor: 'white', borderRadius: 3 }}>
                        <GpsFixedIcon/>
                    </IconButton>
                    <IconButton onClick={() => handleZoomIn()}
                                sx={{ backgroundColor: 'white', borderRadius: 3 }}>
                        <AddIcon/>
                    </IconButton>
                    <IconButton onClick={() => handleZoomOut()}
                                sx={{ backgroundColor: 'white', borderRadius: 3 }}>
                        <RemoveIcon/>
                    </IconButton>
                </Stack>
            </div>
        </div>
    );
}

