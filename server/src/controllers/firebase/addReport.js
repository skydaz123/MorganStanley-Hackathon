import { db } from "../../firebase.js"

export default async function addReport(req, res) {
    const today = new Date()
    //let dateString = today.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    let dateString = today.toISOString().slice(0, 10)
    let key = `${dateString}_${req.body.email}`
    const {
        lb_recieved,
        lb_given,
        email
    } = req.body

    const data = {
        lb_recieved,
        lb_given,
        email,
        timestamp: dateString,
    }
    let check = await db.collection
    await db.collection("reports").doc(key).set(data)
    res.send(req.body)
}
