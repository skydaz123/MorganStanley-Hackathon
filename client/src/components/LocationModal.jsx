// LocationModal.js

import React from 'react';
import { Modal, List, ListItem, ListItemText } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function LocationModal({ isModalOpen, handleCloseModal, selectedLocation, generateGraphData }) {
  return (
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
  );
}

export default LocationModal;
