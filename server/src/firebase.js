import * as dotenv from "dotenv"
import { cert, initializeApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"
import serviceAccount from "../account-key.json" assert { type: "json" }

// load .env
dotenv.config()

// init app
export const app = initializeApp({
    credential: cert(serviceAccount)
})

export const db = getFirestore(app)
export const auth = getAuth(app)

// UNCOMMENT TO NUKE AUTH FOR TESTING
// auth.listUsers(100)
//     .then(res => res.users.map(u => u.uid))
//     .then(ids => auth.deleteUsers(ids))
//     .then(res => {
//         let failed = false
//         res.errors.forEach(({ error }) => {
//             console.log(error.toJSON())
//             failed = true
//         })
//
//         if (failed)
//             throw new Error()
//     })
//     .then(() => console.log("Success!"))
//     .catch(() => console.error("Bulk user deletion failed."))