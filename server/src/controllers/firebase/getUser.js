import { getAuth } from "firebase-admin/auth"
import { db } from "../../firebase.js"

export default async function getUser(req, res) {
    let email = ""
    await getAuth()
        .verifyIdToken(req.query.token)
        .then((decodedToken) => {
            email = decodedToken.email
        })
        .catch((error) => {
            return res.status(404).send("Token was not valid sign in again")
        })
    let data = (await db.collection("partners").doc(email).get()).data()
    res.send(data)
}
