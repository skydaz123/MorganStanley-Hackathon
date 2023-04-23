// DO NOT MODIFY THIS FILE. MODIFY .env instead

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL!
export const GEOCODE_KEY = process.env.REACT_APP_GEOCODE_KEY!
export const FIREBASE_CONFIG = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG!) as {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
    measurementID: string
}
