import { db } from "../../firebase.js"

export default async function getReports(req, res) {
    const { email } = res.locals.user

    const result_arr = await db.collection("reports")
        .where("email", "==", email)
        .get()

    const data = []
    result_arr.forEach(doc => {
        data.push(doc.data())
    })
    res.send(data)
}
