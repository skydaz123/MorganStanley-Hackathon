import { db } from "../../firebase.js"

export default async function getUser(req, res) {
    const { email } = res.locals.user

    const doc = await db.collection("partners")
        .doc(email)
        .get()
    const data = doc.data()
    res.send(data)
}
