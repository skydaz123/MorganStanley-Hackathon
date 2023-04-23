import { getAuth } from "firebase-admin/auth"
import { db } from "../../firebase.js"

export default async function getReports(req, res) {
    //Make the token verification a middleware later
    let email = ""
    await getAuth()
        .verifyIdToken(req.query.token)
        .then((decodedToken) => {
            email = decodedToken.email
        })
        .catch((error) => {
            return res.status(404).send("Token was not valid sign in again")
        })

    let result_arr = await db.collection("reports").where("email", "==", email).get()
    let data = []
    result_arr.forEach(doc => {
        data.push(doc.data())
    })
    res.send(data)
}
