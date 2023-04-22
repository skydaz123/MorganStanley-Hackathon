import AddIcon from '@mui/icons-material/Add';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import MenuIcon from '@mui/icons-material/Menu';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  IconButton,
  Typography,
  Modal,
  Stack,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'; // Import Modal here
import L, { Icon } from 'leaflet';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvent, } from 'react-leaflet';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';


const myIcon = new Icon({
    iconUrl: markerIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const mockDailyData = {
  storageRemaining: 75, // %
  distances: [
    { partner: 'Location A', distance: 5 }, // km
    { partner: 'Location B', distance: 7 }, // km
    { partner: 'Location C', distance: 3 }, // km
  ],
  foodShipmentRequests: [1, 0, 1, 1, 0], // last 5 days (1 if request that day, 0 otherwise)
};

const southWest = L.latLng(-90, -180);
const northEast = L.latLng(90, 180);
const bounds = L.latLngBounds(southWest, northEast);

function handleClick() {
    console.log("pressed")
}

export default function Map() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleOpenModal = (location) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

    function MapC() {
      const map = useMap();
      map.removeControl(map.zoomControl);
      map.attributionControl.setPrefix('');
    
      const locations = [
        {
          name: '466 Northside Dr NW, Atlanta, GA 30318',
          lat: 33.7671923,
          lng: -84.40537119999999,
          dailyData: mockDailyData,
        },
        {
          name: '1122A Old Chattahoochee Ave NW # A, Atlanta, GA 30318',
          lat: 33.79994,
          lng: -84.42485099999999,
          dailyData: mockDailyData,
        },
        {
          name: '246 Sycamore St, Decatur, GA 30030',
          lat: 33.7749219,
          lng: -84.2929674,
          dailyData: mockDailyData,
        },
        {
          name: '2514 W Point Ave, Atlanta, GA 30337',
          lat: 33.627911,
          lng: -84.4715296,
          dailyData: mockDailyData,
        },
        {
          name: '921 Howell Mill Rd NW, Atlanta, GA 30318',
          lat: 33.78034239999999,
          lng: -84.410242,
          dailyData: mockDailyData,
        },
        {
          name: '1560 Memorial Dr SE, Atlanta, GA 30317',
          lat: 33.7485041,
          lng: -84.3365784,
          dailyData: mockDailyData,
        },
      ];
    
      useEffect(() => {
        locations.forEach((loc) => {
          const marker = L.marker([loc.lat, loc.lng], { icon: myIcon }).addTo(map);
          marker.bindPopup(loc.name).on('click', () => handleOpenModal(loc));
        });
      }, [locations, map]);
    
      return null;
    }

    return (
        <div>
        <Modal open={isModalOpen} onClose={handleCloseModal}>
        {selectedLocation ? (
          <div style={{ padding: '20px', backgroundColor: 'white' }}>
            <List>
            <h2>{selectedLocation?.name}</h2>
              <ListItem>
                <ListItemText primary={`Storage Remaining: ${selectedLocation?.dailyData.storageRemaining}%`} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Distances to Other Partners:" />
                <List>
                  {selectedLocation?.dailyData.distances.map((distance, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={`${distance.partner}: ${distance.distance} km`} />
                    </ListItem>
                  ))}
                </List>
              </ListItem>
              <ListItem>
                <ListItemText primary="Food Shipment Requests (Last 5 Days):" />
                <List>
                  {selectedLocation?.dailyData.foodShipmentRequests.map((request, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={request ? 'Requested' : 'Not Requested'} />
                    </ListItem>
                  ))}
                </List>
              </ListItem>
            </List>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        ) : (
          <div></div> // Fallback empty element
        )}
      </Modal>
            <div style={{ display: 'flex', justifyContent: 'start' }}>
                <Typography style={{ position: 'absolute', zIndex: '1000' }}>
                    <Link to='/'
                          style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                        Name
                    </Link>
                </Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', zIndex: '1000' }}>
                    <SearchBar/>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
                <IconButton style={{ position: 'absolute', zIndex: '1000' }}
                            onClick={handleClick}>
                    <MenuIcon sx={{ color: 'orange', fontSize: 50 }}/>
                </IconButton>
            </div>
            <MapContainer
                style={{ height: '100vh', width: '100wh', position: 'relative' }}
                center={[0, 0]}
                zoom={3}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                />
                <MapC />
              </MapContainer>
            <div style={{ position: 'absolute', bottom: '20px', right: '20px', zIndex: '1000' }}>
                <Stack spacing={2}>
                    <IconButton onClick={() => console.log('GPS clicked')}
                                sx={{ backgroundColor: 'white', borderRadius: 3 }}>
                        <GpsFixedIcon/>
                    </IconButton>
                    <IconButton onClick={() => console.log('Add clicked')}
                                sx={{ backgroundColor: 'white', borderRadius: 3 }}>
                        <AddIcon/>
                    </IconButton>
                    <IconButton onClick={() => console.log('Remove clicked')}
                                sx={{ backgroundColor: 'white', borderRadius: 3 }}>
                        <RemoveIcon/>
                    </IconButton>
                </Stack>
            </div>
        </div>
    );
}
