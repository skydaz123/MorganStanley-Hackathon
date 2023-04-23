import { db } from "../../firebase.js"

export default async function addUser(req, res) {
    let doesExist = await db.collection("partners").doc(req.body.email).get()
    console.log(doesExist.data())
    //If user already exists return error, however auth should catch beforehand
    if (doesExist.data() !== undefined) {
        return res.status(400).json()
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
    const addedUser = await db.collection("partners")
        .doc(email)
        .set(data)

    const markerData = {
        isBank: role === "1",
        lat,
        lng,
        name,
        email,
        address,
    }
    const addedMarker = await db.collection("markers")
        .doc(email)
        .set(markerData)

    console.log(addedUser, addedMarker)

    res.send(data)
}