import { db } from "../../firebase.js"

export default async function markers(req, res) {
    console.log("here")
    const markersRef = db.collection("markers")
    const markers = await markersRef.get()
    let result = []
    markers.forEach(doc => {
        result.push(doc.data())
    })
    res.status(200).json(result)
}
