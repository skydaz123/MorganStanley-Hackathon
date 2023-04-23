import { getAnalytics } from "firebase/analytics"
import { initializeApp } from "firebase/app"
import { FIREBASE_CONFIG } from "./environment"
import { getAuth } from "firebase/auth"

export const app = initializeApp(FIREBASE_CONFIG)
export const auth = getAuth(app)
export const analytics = getAnalytics(app)
