const admin = require('firebase-admin')
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');


const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const { exec } = require('child_process');
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

app.use(cors());
app.use(express.json());
const data = {
    name: 'Los Angeles',
    state: 'CA',
    country: 'USA'
  };
  

app.get('/test', async (req, res) => {
    res.send("It. works!");
});

app.get('/firebase/markers', async (req, res) => {
  console.log("here");
    const markersRef = db.collection('markers');
    const markers = await markersRef.get();
    let result = [];
    markers.forEach(doc => {
        result.push(doc.data());
      });
    res.status(200).json(result);
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

app.get('/firebase', (req, res) => {
  res.send({
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTH,
    projectId: process.env.FIREBASE_PROJECT,
    storageBucket: process.env.FIREBASE_STORAGE,
    messagingSenderId: process.env.FIREBASE_MESSAGE,
    appId: process.env.FIREBASE_APP,
    measurementID: process.env.FIREBASE_MEASURE
  })
});
//Writing user addition here for now to see if it works, will move to other path later
app.post('/firebase/addUser', async(req, res) => {
  let doesExist = await db.collection('partners').doc(req.body.email).get();
  console.log(doesExist.data());
  //If user already exists return error, however auth should catch beforehand
  if(doesExist.data() !== undefined){
    return res.status(400).json();
  }
  // const data = {
  //   address: req.body.address,
  //   lat: req.body.lat,
  //   long: req.body.long,
  //   zipcode: req.body.zipcode,
  //   email: req.body.email,
  //   name: req.body.name
  // };

  const {
    lat,
    lng,
    zipcode,
    email,
    name,
    address,
    role,
    maxCapacity,
    phoneNumber,
  } = req.body
  const data = {
    lat,
    lng,
    zipcode,
    email,
    name,
    address,
    role, // "0", "1", "2"
    maxCapacity,
    phoneNumber,
  }

  console.log("here");
  const addedUser = await db.collection('partners')
      .doc(email)
      .set(data);

  const markerData = {
    isBank: role === "1",
    lat,
    lng,
    name,
    email,
    address,
  }
  const addedMarker = await db.collection('markers')
      .doc(email)
      .set(markerData);

  console.log(addedUser, addedMarker);

  res.send(data);
});

app.get('/firebase/getUser', async(req, res) => {
  let email = "";
  await getAuth()
  .verifyIdToken(req.query.token)
  .then((decodedToken) => {
    email = decodedToken.email;
    // ...
  })
  .catch((error) => {
    return res.status(404).send("Token was not valid sign in again");
  });
  let data = (await db.collection('partners').doc(email).get()).data();
  res.send(data);
  
})

app.get('/exec',async(req, res) =>{
  console.log("something");
  exec('python3 ./hello.py', (error, stdout, stderr) => {
    // if (error) {
    //   console.error(exec error: ${error});
    //   return;
    // }
    console.log( stdout);
    console.log(error);
    // console.log(stderr);
  });
});
app.use('/firebase', user)
app.use('/firebase', map)

app.post('/addUser', async(req, res) => {
    
})

app.listen(process.env.PORT || 8080, () => {
    console.log(`Example app listening on port ${process.env.PORT || 8080}`)
})
   

   
