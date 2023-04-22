const admin = require('firebase-admin')
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const app = express()
const cors = require('cors')
const port = 8000;

const serviceAccount = require('./account-key.json');
dotenv.config()
// Various other path / Functionality
const user = require('./firebase/users/app')
const map = require('./firebase/map/app')

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

app.use(cors({
    origin: '*'
}));

const data = {
    name: 'Los Angeles',
    state: 'CA',
    country: 'USA'
  };
  

app.get('/test', async (req, res) => {
    res.send("It. works!");
});

app.get('/markers', async (req, res) => {
    const markersRef = db.collection('markers');
    const markers = await markersRef.get();
    markers.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
      });
    res.status(200).json();
});

app.post('/test', async (req, res) => {
    let x = await db.listCollections();
    console.log(x);
    //const cityRef = db.collection('cities').doc('BJ');
    // const x = await cityRef.set({
    // capital: true
    // }, { merge: true });
    res.status(200).json();
});

app.use('/firebase', user)
app.use('/firebase', map)

app.listen(process.env.PORT || 8080, () => {
    console.log(`Example app listening on port ${process.env.PORT || 8080}`)
})
   

   
