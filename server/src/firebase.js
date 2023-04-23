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
