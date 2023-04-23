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

//Writing user addition here for now to see if it works, will move to other path later
app.post('/firebase/addUser', async(req, res) => {
  let doesExist = await db.collection('partners').doc(req.body.email).get();
  console.log(doesExist.data());
  //If user already exists return error, however auth should catch beforehand
  if(doesExist.data() !== undefined){
    return res.status(400).json();
  }

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
  })
  .catch((error) => {
    return res.status(404).send("Token was not valid sign in again");
  });
  let data = (await db.collection('partners').doc(email).get()).data();
  res.send(data);
  
})

app.post('/firebase/addReport', async(req, res) => {
  const today = new Date();
  //let dateString = today.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  let dateString = today.toISOString().slice(0,10);
  let key = `${dateString}_${req.body.email}`;
  const {
    lb_recieved,
    lb_given,
    email
  } = req.body;

  const data = {
    lb_recieved,
    lb_given,
    email,
    timestamp: dateString,
  };
  let check = await db.collection
  await db.collection('reports').doc(key).set(data);
  res.send(req.body);
})

app.get('/firebase/getReports', async (req, res) => {

  //Make the token verification a middleware later
  let email = "";
  await getAuth()
  .verifyIdToken(req.query.token)
  .then((decodedToken) => {
    email = decodedToken.email;
  })
  .catch((error) => {
    return res.status(404).send("Token was not valid sign in again");
  });

  let result_arr = await db.collection('reports').where('email', '==', email).get();
  let data = [];
  result_arr.forEach(doc => {
    data.push(doc.data());
  });
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
   

   
