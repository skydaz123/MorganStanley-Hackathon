import AddIcon from '@mui/icons-material/Add';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import MenuIcon from '@mui/icons-material/Menu';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  IconButton,
  Typography,
  Modal,
  List,
  ListItem,
  ListItemText,
  SvgIcon
} from '@mui/material'; // Import Modal here
import Stack from '@mui/material/Stack';
import L, { Icon } from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMap, useMapEvent, } from 'react-leaflet';
import '@geoman-io/leaflet-geoman-free';  
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';  
import * as turf from '@turf/turf';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import "leaflet-draw"
import axios from 'axios';


//replace buttons by leaflet.pm


//Icon for making zone shape
import BrushIcon from '@mui/icons-material/Brush';
//drawer for hamburger on side
import MapDrawer from './MapDrawer';
//hide 
import "../css/Map.css"

//route draw api
import 'leaflet.polyline.snakeanim';
//routing api
require('leaflet-routing-machine');

const myIcon = new Icon({
    iconUrl: markerIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});



function calculateStorageQuantity(lastDeliveryDate) {
  const currentDate = new Date();
  const lastDelivery = new Date(lastDeliveryDate);
  const daysSinceLastDelivery = Math.floor((currentDate - lastDelivery) / (1000 * 60 * 60 * 24));

  const initialStorageQuantity = 150;
  const dailyConsumptionRate = 10;

  const currentStorageQuantity = initialStorageQuantity - (daysSinceLastDelivery * dailyConsumptionRate);

  // If the storage quantity falls below 0, set it to 0
  return currentStorageQuantity > 0 ? currentStorageQuantity : 0;
}

const mockDailyData = {
  storageQuantity: 150, // Quantity
  lastRequestedDates: ['2023-04-18', '2023-04-15', '2023-04-14'], // Dates for when food was last requested
};

const southWest = L.latLng(-90, -180);
const northEast = L.latLng(90, 180);
const bounds = L.latLngBounds(southWest, northEast);
var maps = null;
var routing = null;
var line = null;
// const locations = [
//   {lat: 33.7671923, lng: -84.40537119999999},
//   {lat: 33.79994, lng: -84.42485099999999},
//   {lat: 33.7749219, lng: -84.2929674},
//   {lat: 33.627911, lng: -84.4715296},
//   {lat: 33.78034239999999, lng: -84.410242},
//   {lat: 33.7485041, lng: -84.3365784},
// ];

function generateGraphData(location) {
  const data = location.dailyData.lastRequestedDates.map((date) => {
    const storageQuantity = calculateStorageQuantity(date);
    return { date, storageQuantity };
  });

  return data;
}


export default function Map() {

  const [check, setCheck] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [block, setBlock] = useState(false);
  const handleOpenModal = (location) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/firebase/markers')
      .then((res) => {
        setLocations(res.data);
        console.log("res data", res.data);
    })
  }, [])

    function MapC() {
      const map = useMap();
      maps = map;
      maps.flyTo([33.753746,-84.386330], 12)
      map.removeControl(map.zoomControl);
      map.attributionControl.setPrefix('');
      var markers = [];
      

      // const locations = [
      //   {
      //     name: '466 Northside Dr NW, Atlanta, GA 30318',
      //     lat: 33.7671923,
      //     lng: -84.40537119999999,
      //     lastDeliveryDate: '2023-04-15',
      //     dailyData: {
      //       storageQuantity: calculateStorageQuantity('2023-04-15'),
      //       lastRequestedDates: ['2023-04-18', '2023-04-15', '2023-04-14'],
      //     },
      //   },
      //   {
      //     name: '1122A Old Chattahoochee Ave NW # A, Atlanta, GA 30318',
      //     lat: 33.79994,
      //     lng: -84.42485099999999,
      //     lastDeliveryDate: '2023-04-12',
      //     dailyData: {
      //       storageQuantity: calculateStorageQuantity('2023-04-12'),
      //       lastRequestedDates: ['2023-04-18', '2023-04-15', '2023-04-14'],
      //     },
      //   },
      //   {
      //     name: '246 Sycamore St, Decatur, GA 30030',
      //     lat: 33.7749219,
      //     lng: -84.2929674,
      //     lastDeliveryDate: '2023-04-10',
      //     dailyData: {
      //       storageQuantity: calculateStorageQuantity('2023-04-10'),
      //       lastRequestedDates: ['2023-04-18', '2023-04-15', '2023-04-14'],
      //     },
      //   },
      //   {
      //     name: '2514 W Point Ave, Atlanta, GA 30337',
      //     lat: 33.627911,
      //     lng: -84.4715296,
      //     lastDeliveryDate: '2023-04-18',
      //     dailyData: {
      //       storageQuantity: calculateStorageQuantity('2023-04-18'),
      //       lastRequestedDates: ['2023-04-18', '2023-04-15', '2023-04-14'],
      //     },
      //   },
      //   {
      //     name: '921 Howell Mill Rd NW, Atlanta, GA 30318',
      //     lat: 33.78034239999999,
      //     lng: -84.410242,
      //     lastDeliveryDate: '2023-04-17',
      //     dailyData: {
      //       storageQuantity: calculateStorageQuantity('2023-04-17'),
      //       lastRequestedDates: ['2023-04-18', '2023-04-15', '2023-04-14'],
      //     },
      //   },
      //   {
      //     name: '1560 Memorial Dr SE, Atlanta, GA 30317',
      //     lat: 33.7485041,
      //     lng: -84.3365784,
      //     lastDeliveryDate: '2023-04-20',
      //     dailyData: {
      //       storageQuantity: calculateStorageQuantity('2023-04-20'),
      //       lastRequestedDates: ['2023-04-18', '2023-04-15', '2023-04-14'],
      //     },
      //   },
      // ];

       //has all of the distances from point a to all other points. Each row is a unique location, and its column is the endpoint.
   const [distanceMatrix, setDistanceMatrix] = useState([]);


 
   const calculateDistances = async () => {
       const matrix = [];
       const controls = {};
    
       const removeControl = (origin, destination) => {
           const key = `${origin.lat},${origin.lng}_${destination.lat},${destination.lng}`;
           const control = controls[key];
           if (control) {
             control.remove();
             delete controls[key];
           }
         };
    
         const greenIcon = L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        });
        
         
       for (const origin of locations) {
         const row = [];
         for (const destination of locations) {
           if (origin === destination) {
             row.push(0);
             continue;
           }
    
           const key = `${origin.lat},${origin.lng}_${destination.lat},${destination.lng}`;
           const control = L.Routing.control({
            waypoints: [
              L.latLng(origin.lat, origin.lng),
              L.latLng(destination.lat, destination.lng),
            ],
            lineOptions: {
              styles: [{ color: 'transparent' }],
            },
            createMarker: (i, waypoint, n) => {
              
              return L.marker(waypoint.latLng, {
                icon: greenIcon
              });
            },
            addWaypoints: false,
            routeWhileDragging: false,
            showAlternatives: false,
            fitSelectedRoutes: false,
          });
            
             controls[key] = control;
            
             const promise = new Promise((resolve) => {
               control.on('routesfound', (e) => {
                 const distance = e.routes[0].summary.totalDistance;
                 resolve(distance);
               });
             });
            
             const distance = await promise;
           row.push(distance);
           removeControl(origin, destination);
         }
         matrix.push(row);
       }
       setDistanceMatrix(matrix);


     };
    
    
    
   useEffect(() => {
       calculateDistances();
      
   }, []);
   if(!block) {
      availableLocations = locations;
   }

        availableLocations.forEach((loc) => {
          console.log("Length is " + availableLocations.length)
          const marker = L.marker([loc.lat, loc.lng], { icon: myIcon }).addTo(map);
          //marker.bindPopup("Hello World!").openPopup();
          // Attach click event handler for marker to open modal
          marker.on('click', () => handleOpenModal(loc));
          markers.push(marker)
          //availableLocations[loc.name] = {lat: marker.getLatLng().lat, lng: marker.getLatLng().lng};
          //console.log("available is " + availableLocations[loc.name].lat);
        });

      map.pm.addControls({
        position: 'topright',
        drawPolygon: true,
        drawText : false,
        drawCircle: false,
        drawCircleMarker: false,
        drawMarker: false,
        drawPolyline: false,
        drawRectangle: false,
        editMode: false,
        dragMode: false,
        cutPolygon: false,
        removalMode: false,
        rotateMode: false,
        merge: false,
        delete : false
    });

      map.on('pm:create', (e) => {
        const layer = e.layer;
        var temp = markers;
        var itemToDelete = [];
        markers.forEach(mark => {
          if (!(mark instanceof L.Marker)) 
            return;
          const latlng = mark.getLatLng();
          const point = turf.point([latlng.lng, latlng.lat]);
          const isInside = turf.booleanPointInPolygon(point, layer.toGeoJSON());
          if (!isInside) {
            //remove from temp
            itemToDelete.push(mark);
            map.removeLayer(mark);
          }
        });
        map.removeLayer(layer);
        let index = 0;
        for(let i = 0; index < itemToDelete.length; i++)
        {
          console.log(temp[i].getLatLng().lat);
          console.log(itemToDelete[index].getLatLng().lat)
          if(temp[i].getLatLng().lat === itemToDelete[index].getLatLng().lat && temp[i].getLatLng().lng === itemToDelete[index].getLatLng().lng)
          {
            console.log("GOT IN:")
            temp.splice(i, 1);
            i = -1;
            index++;
          }
        }
        markers = temp;
        console.log("before addition" + availableLocations);
        let tempArr = [];
        for(let i = 0; i < markers.length; i++)
        {
          tempArr.push({lat: markers[i].getLatLng().lat, lng: markers[i].getLatLng().lng});
        }
        availableLocations = tempArr;
        console.log("Markers length is " + availableLocations.length)
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

    
    function handleDraw() {
      if(!check)
      {
        if(routing === null) { 
          console.log("length is " + availableLocations.length)
          console.log("Drawing routes");
          routing = L.Routing.control({
            createMarker: function() { return null; } ,
            waypoints: availableLocations,
            //showAlternatives: false,
    
            //Snap waypoints to nearest road and will not include walk up route
            //waypointMode: 'snap',
            useZoomParameter: false,
            show:false,
            routeWhileDragging: true,
            lineOptions: {
              styles: [{className: 'hide'}] // Adding animate class
            },
          }).addTo(maps);
            routing.on('routeselected', function(e) {
            //console.log(e.route.coordinates);
            line = L.polyline(e.route.coordinates, {snakingSpeed: 200});
            line.addTo(maps).snakeIn();
            line.setStyle({opacity: 1});
            
            // line.on('mouseover', function () {
            //   this.setText('  ►  ', {repeat: true, attributes: {fill: 'red'}});
            // });
            // line.on('mouseout', function () {
            //   this.setText(null);
            // });
          });
          routing ._container.style.display = "none" // <--- remove control
          console.log("length is " + markers.length);
          console.log(locations);
          console.log(availableLocations);
          if(!block) {;
            setBlock(!block);
            console.log("It is " + availableLocations);
          }
          routing.setWaypoints(availableLocations);
        }
        else {
          line.setStyle({opacity: 1});
        }
      }
      else {
        console.log("Removing Routes")
        line.setStyle({opacity: 0});
      }
      setCheck(!check);
    }

    function handleEdit() {
      console.log("Edit active");
      //let polylineDrawer = new L.Draw.Polyline(maps, {})
      //polylineDrawer.enable()
      let rectangle = new L.Draw.Rectange(maps, {})
      rectangle.enable();
    }

    return (
        <div>
            <Modal open={isModalOpen} onClose={handleCloseModal}>
              {selectedLocation ? (
                <div style={{ padding: '20px', backgroundColor: 'white', color: 'orange' }}>
                  <List>
                    <h2>{selectedLocation.name}</h2>
                    <ListItem>
                      <ListItemText primary={`Storage Quantity: ${selectedLocation.dailyData.storageQuantity}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Food Shipment Requests (Last Requested Dates):" />
                      <List>
                        {selectedLocation.dailyData.lastRequestedDates.map((date, index) => (
                          <ListItem key={index}>
                            <ListItemText primary={date} />
                          </ListItem>
                        ))}
                      </List>
                    </ListItem>
                  </List>
                  <LineChart
                    width={600}
                    height={300}
                    data={generateGraphData(selectedLocation)}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="storageQuantity"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                  <button onClick={handleCloseModal} style={{ backgroundColor: 'orange', color: 'white' }}>Close</button>
                </div>
              ) : (
                <div></div> // Fallback empty element
              )}
            </Modal>

            <div style={{ display: 'flex', justifyContent: 'start' }}>
              <Typography style={{
                position: 'absolute',
                zIndex: '1000',
                fontSize: '40px',
                color: 'orange',
                marginTop: '1.25%',
                textShadow: '1px 1px 0px black, -1px 1px 0px black, 1px -1px 0px black, -1px -1px 0px black'  // Add text-shadow here
            }}>
              <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
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
                    <IconButton onClick={() => handleEdit()}
                                sx={{ backgroundColor: 'white', borderRadius: 3 }}>
                        <BrushIcon/>
                    </IconButton>
                    <IconButton onClick={() => handleDraw()}
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
