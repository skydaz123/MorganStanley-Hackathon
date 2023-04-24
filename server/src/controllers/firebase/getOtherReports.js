import { db } from "../../firebase.js"

export default async function getOtherReports(req, res) {
    const email = req.query.email;

    if(!email){
        return res.sendStatus(400);
    }

    const result_arr = await db.collection("reports")
        .where("email", "==", email)
        .get()

    const data = []
    result_arr.forEach(doc => {
        data.push(doc.data())
    })
    res.send(data)
}