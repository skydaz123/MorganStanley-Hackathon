import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
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

const myIcon = new Icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Map() {
  function MapC() {
    const map = useMap();
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
      <MapContainer
        style={{ height: '95vh', width: '100wh' }}
        center={[0, 0]}
        zoom={3}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        <MapC />
      </MapContainer>
    </div>
  );
}

